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
        if(data.id == 'bracket') return Bracket.parse(data);
        if(data.id == 'block') {
            if('data' in data) return DataBlock.parse(data);
            if('subAction' in data) return SubActionBlock.parse(data);
            if('target' in data) return SelectionBlock.parse(data);
            if('action' in data) return ActionBlock.parse(data);
            if(data.block == 'else') return new Else();
        }
        throw TypeError("Not a valid block type")
    }
}

export type BracketDirect = "open" | "close";
export type BracketType = "norm" | "repeat";
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

export type BlockBlock = ArgumentBlockBlock | "else";
export abstract class Block extends TemplateBlock {
    override readonly id : "block" = "block";
    readonly block : BlockBlock;

    constructor(block : BlockBlock) {
        super("block");
        this.block = block;
    }
}

export class Else extends Block {
    override readonly block : "else" = "else";

    constructor() {
        super('else');
    }
}

export type ArgumentBlockBlock = DataBlockBlock | ActionBlockBlock | SubActionBlockBlock; 
/**
 * A block with arguments
 * Most have chests.
 */
export abstract class ArgumentBlock extends Block {
    @Type(() => Arguments)
    args?: Arguments;

    constructor(block: ArgumentBlockBlock, args = new Arguments()) {
        super(block);
        this.args = args;
    }
}


export type DataBlockBlock = "func" | "call_func" | "process" | "start_process";
export class DataBlock extends ArgumentBlock implements SecondLineBlock {
    data: string;

    constructor(block : DataBlockBlock, data : string, args?: Arguments) {
        super(block, args)
        this.data = data;
    }

    static override parse(data: unknown) {
        return plainToInstance(DataBlock, data)
    }

    get secondLine(): string {
        return this.data;
    }
    set secondLine(string: string) {
        this.data = string;
    }
}

export type Attribute = "" | "NOT" | "LS-CANCEL"
export type ActionBlockBlock = SelectionBlockBlock | SubActionBlockBlock;
export class ActionBlock extends ArgumentBlock implements SecondLineBlock, ForthLineBlock {
    action: string;
    /**
     * @deprecated No longer filled by DF.
     */
    inverted: string = '';
    attribute: Attribute | string = '';

    constructor(block : ActionBlockBlock, action : string, attribute : string = '', args?: Arguments) {
        super(block, args);
        this.action = action;
        this.attribute = attribute;
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

    get attr(): Attribute {
        return this.attribute as Attribute;
    }
    set attr(string: Attribute) {
        this.attribute = string;
    }

    get forthLine(): string {
        return this.attribute ?? this.inverted;
    }
    set forthLine(string: string) {
        this.attribute = string;
    }

    get not(): boolean {
        return this.attribute === 'NOT' || this.inverted === 'NOT';
    }
    set not(boolean: boolean) {
        this.attribute = boolean ? 'NOT' : '';
    }

    get cancelled(): boolean {
        return this.attr === 'LS-CANCEL'
    }
    set cancelled(boolean: boolean) {
        this.attr = boolean ? 'LS-CANCEL' : '';
    }
}

export type SelectionBlockBlock = "event" | "player_action" | "entity_event" | "entity_action" | "set_var" | "game_action" | "control" | "select_obj";
export class SelectionBlock extends ActionBlock implements ThirdLineBlock {
    target: string = "";

    constructor(block : SelectionBlockBlock, action : string, target?: string, attribute?: string, args?: Arguments) {
        super(block,action,attribute,args);
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

export type SubActionBlockBlock = "if_entity" | "if_game" | "if_player" | "if_var" | "repeat";
export class SubActionBlock extends ActionBlock implements ThirdLineBlock {
    subAction: string;

    constructor(block : SubActionBlockBlock, action : string, subAction?: string, attribute?: string, args?: Arguments) {
        super(block,action,attribute,args);
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

// JSON.parse($0.innerText).codeblocks.map(a => [a.identifier, a.name])
const defaultBlockNames : [BlockBlock, String][] = [["player_action","PLAYER ACTION"],["if_player","IF PLAYER"],["start_process","START PROCESS"],["call_func","CALL FUNCTION"],["control","CONTROL"],["set_var","SET VARIABLE"],["entity_event","ENTITY EVENT"],["event","PLAYER EVENT"],["func","FUNCTION"],["if_entity","IF ENTITY"],["entity_action","ENTITY ACTION"],["if_var","IF VARIABLE"],["select_obj","SELECT OBJECT"],["game_action","GAME ACTION"],["else","ELSE"],["process","PROCESS"],["repeat","REPEAT"],["if_game","IF GAME"]]

export const idToName = new Map(defaultBlockNames);
export const nameToId = new Map(defaultBlockNames.map(x => x.reverse()) as [String, BlockBlock][]);