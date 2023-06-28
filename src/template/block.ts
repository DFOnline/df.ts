import { SecondLineBlock, ThirdLineBlock, ForthLineBlock } from "./lines";
import { Arguments } from "./argument";

export abstract class TemplateBlock {
    readonly id : "block" | "bracket";

    constructor(id : "block" | "bracket") {
        this.id = id;
    }

    static parse(data: any) : TemplateBlock {
        const blockTypes = [SelectionBlock, SubActionBlock, DataBlock, Bracket, Else];
        for (const type of blockTypes) {
            if(type.check(data) == null) {
                return type.parse(data);
            }
        }
        throw TypeError("Cannot parse block, no matching patterns")
    }
}

type BracketDirect = "open" | "close";
type BracketType = "norm" | "repeat";
export class Bracket extends TemplateBlock {
    override readonly id : "bracket" = "bracket";
    direct : BracketDirect = "open";
    type : BracketType = "norm";

    constructor(direct : BracketDirect = "open", type : BracketType = "norm") {
        super("bracket");
        this.direct = direct;
        this.type = type;
    }

    static check(data : any) : string | undefined {
        if (data.id != 'bracket') return 'id';
        if (data.direct != 'open' && data.direct != 'close') return 'direct';
        if (data.type != "norm" && data.type != "repeat") return 'type';
        return;
    }

    static override parse(data : any) : Bracket {
        const check = this.check(data);
        if(check != null) {
            throw new TypeError(`${check} has bad value`)
        }
        
        const bracket = new Bracket();
        bracket.direct = data.direct;
        bracket.type = data.type;
        return bracket;
    }
}

export abstract class Block extends TemplateBlock {
    override readonly id : "block" = "block";
    readonly block : string;

    constructor(block : string) {
        super("block");
        this.block = block;
    }

    static check(data : any) : string | undefined {
        if(data.id != 'block') return 'id';
        if(typeof data.block != 'string') return 'block';
        return;
    }
}

export class Else extends Block {
    override readonly block : "else" = "else";

    // TODO: write test for this
    static override parse(data : any) : Else {
        const check = this.check(data);
        if(check != null) throw new TypeError(`${check} has bad value`);
        return new Else()
    }

    constructor() {
        super('else')
    }
}

/**
 * A block with arguments
 * Most have chests.
 */
export abstract class ArgumentBlock extends Block {
    args?: Arguments;

    constructor(block: string, args = new Arguments()) {
        super(block);
        this.args = args;
    }
}


export class DataBlock extends ArgumentBlock implements SecondLineBlock {
    data: string;

    constructor(block : string, data : string, args?: Arguments) {
        super(block, args)
        this.data = data;
    }

    static override check(data : any) : string | undefined {
        const check = super.check(data);
        if(check != null) return check;
        if(typeof data.data != 'string') return 'data';
        return;
    }
    
    static override parse(data: any) {
        const check = this.check(data);
        if(check != null) throw new TypeError(`${check} has bad value`);
        // TODO: test args parsing
        const args = data.args != null ? Arguments.parse(data.args) : undefined
        return new DataBlock(data.block, data.data, args);
    }

    get secondLine(): string {
        return this.data
    }
    set secondLine(string: string) {
        this.data = string;
    }
}

export class ActionBlock extends ArgumentBlock implements SecondLineBlock, ForthLineBlock {
    action: string;
    inverted: string = '';

    constructor(block : string, action : string, inverted : string = '', args?: Arguments) {
        super(block, args);
        this.action = action;
        this.inverted = inverted;
    }

    static override check(data : any) : string | undefined {
        const check = super.check(data);
        if(check != null) return check;
        if(typeof data.inverted != 'string') return 'inverted';
        return;
    }

    get secondLine(): string {
        return this.action;
    }
    set secondLine(string: string) {
        this.action = string;
    }

    get forthLine(): string {
        return this.inverted;
    }
    set forthLine(string: string) {
        this.inverted = string;
    }

    get not(): boolean {
        return this.inverted === 'NOT';
    }
    set not(boolean: boolean) {
        this.inverted = boolean ? 'NOT' : '';
    }
}

export class SelectionBlock extends ActionBlock implements ThirdLineBlock {
    target: string = "";

    constructor(block : string, action : string, target?: string, inverted?: string, args?: Arguments) {
        super(block,action,inverted,args);
        this.target = target ?? "";
    }

    static override check(data: any): string | undefined {
        const check = super.check(data);
        if(check != null) return check;
        if(typeof data.target != 'string') return 'check';
        return;
    }

    static override parse(data: any) : SelectionBlock {
        const check = this.check(data);
        if(check != null) throw new TypeError(`${check} has bad value`);
        const args = data.args != null ? Arguments.parse(data.args) : undefined;
        return new SelectionBlock(data.block, data.action, data.target, data.inverted,args);
    }

    get thirdLine(): string {
        return this.target;
    }
    set thirdLine(string: string) {
        this.target = string;
    }
}

export class SubActionBlock extends ActionBlock implements ThirdLineBlock {
    subAction: string;

    constructor(block : string, action : string, subAction?: string, inverted?: string, args?: Arguments) {
        super(block,action,inverted,args);
        this.subAction = subAction ?? "";
    }

    static override check(data: any): string | undefined {
        const check = super.check(data);
        if(check != null) return check;
        if(typeof data.subAction != 'string') return 'check';
        return;
    }

    static override parse(data: any) : SubActionBlock {
        const check = this.check(data);
        if(check != null) throw new TypeError(`${check} has bad value`);
        const args = data.args != null ? Arguments.parse(data.args) : undefined;
        return new SubActionBlock(data.block, data.action, data.subAction, data.inverted, args);
    }

    get thirdLine(): string {
        return this.subAction;
    }
    set thirdLine(string: string) {
        this.subAction = string;
    }
}