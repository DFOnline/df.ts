import 'reflect-metadata';

import { SecondLineBlock, ThirdLineBlock, ForthLineBlock } from "./lines";
import { Arguments } from "./argument";
import { Type, plainToInstance } from 'class-transformer';

export abstract class TemplateBlock {
    readonly id : "block" | "bracket";

    constructor(id : "block" | "bracket") {
        this.id = id;
    }

    static parse(data: any) : TemplateBlock {
        if(data.id == 'bracket') return Bracket.parse(data)
        if(data.id == 'block') {
            if('data' in data) return DataBlock.parse(data);
            if('subAction' in data) return SubActionBlock.parse(data);
            if('target' in data) return SelectionBlock.parse(data);
            if('action' in data) return ActionBlock.parse(data);
            if(data.block == 'else') return new Else()
        }
        throw TypeError("Not a valid block type")
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

    static override parse(data : unknown) : Bracket {
        const res = plainToInstance(Bracket,data);
        return res;
    }
}

export abstract class Block extends TemplateBlock {
    override readonly id : "block" = "block";
    readonly block : string;

    constructor(block : string) {
        super("block");
        this.block = block;
    }
}

export class Else extends Block {
    override readonly block : "else" = "else";

    constructor() {
        super('else')
    }
}

/**
 * A block with arguments
 * Most have chests.
 */
export abstract class ArgumentBlock extends Block {
    @Type(() => Arguments)
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
    
    static override parse(data: unknown) {
        return plainToInstance(DataBlock, data)
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

    static override parse(data: unknown): ActionBlock {
        return plainToInstance(ActionBlock, data);
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

    static override parse(data: unknown) : SelectionBlock {
        return plainToInstance(SelectionBlock, data);
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

    static override parse(data: unknown) : SubActionBlock {
        return plainToInstance(SubActionBlock, data);
    }

    get thirdLine(): string {
        return this.subAction;
    }
    set thirdLine(string: string) {
        this.subAction = string;
    }
}