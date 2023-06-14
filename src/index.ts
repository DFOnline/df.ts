export class Template {
    blocks : CodeBlock[];
}

export abstract class CodeBlock {
    readonly id : "block" | "bracket";
}

export class Bracket extends CodeBlock {
    readonly id : "bracket" = "bracket";
    direct : "open" | "close" = "open";
    type : "norm" | "repeat" = "norm";

    static check(data : any) : string | undefined {
        if (data.id != 'bracket') return 'id';
        if (data.direct != 'open' && data.direct != 'close') return 'direct';
        if (data.type != "norm" && data.type != "repeat") return 'type';
        return;
    }

    static parse(data : any) : Bracket {
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

export abstract class Block extends CodeBlock {
    readonly id : "block" = "block";
    readonly block : string;

    constructor(block : string) {
        super();
        this.block = block;
    }

    static check(data : any) : string | undefined {
        if(data.id != 'block') return 'id';
        if(data.block == null) return 'block';
        return;
    }
}

export class Else extends Block {
    readonly block : "else" = "else";

    constructor() {
        super('else')
    }
}

/**
 * A block with arguments, so it probably has a chest and can contain arguments
 */
export abstract class ArgumentBlock extends Block {
    args: Arguments;
}

class Arguments {
    items: Argument[];
}
// TODO: Do arguments
abstract class Argument {}

interface SecondLineBlock {
    get secondLine(): string;
    set secondLine(string: string);
}
interface ThirdLineBlock {
    get thirdLine(): string;
    set thirdLine(string: string);
}
interface ForthLineBlock {
    get forthLine(): string;
    set forthLine(string: string);
}

export class DataBlock extends ArgumentBlock implements SecondLineBlock {
    data: string;

    constructor(block : string, data : string) {
        super(block)
        this.data = data;
    }

    static check(data : any) : string | undefined {
        const check = super.check(data);
        if(check != null) return check;
        if(data.data == null) return 'data';
        return;
    }
    
    static parse(data: any) {
        const check = this.check(data);
        if(check != null) throw new TypeError(`${check} has bad value`);
        return new DataBlock(data.block, data.data);
        
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
    inverted: string;

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
    target: string;

    get thirdLine(): string {
        return this.target;
    }
    set thirdLine(string: string) {
        this.target = string;
    }
}

export class SubActionBlock extends ActionBlock implements ThirdLineBlock {
    subAction: string;

    get thirdLine(): string {
        return this.subAction;
    }
    set thirdLine(string: string) {
        this.subAction = string;
    }
}