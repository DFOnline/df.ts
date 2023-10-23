import 'reflect-metadata';
import { SecondLineBlock, ThirdLineBlock, ForthLineBlock } from "./lines";
import { Arguments } from "./argument";
export declare abstract class TemplateBlock {
    readonly id: "block" | "bracket";
    constructor(id: "block" | "bracket");
    static parse(data: any): TemplateBlock;
}
export type BracketDirect = "open" | "close";
export type BracketType = "norm" | "repeat";
export declare class Bracket extends TemplateBlock {
    readonly id: "bracket";
    direct: BracketDirect;
    type: BracketType;
    constructor(direct?: BracketDirect, type?: BracketType);
    static parse(data: unknown): Bracket;
}
export type BlockBlock = ArgumentBlockBlock | "else";
export declare abstract class Block extends TemplateBlock {
    readonly id: "block";
    readonly block: BlockBlock;
    constructor(block: BlockBlock);
}
export declare class Else extends Block {
    readonly block: "else";
    constructor();
}
export type ArgumentBlockBlock = DataBlockBlock | ActionBlockBlock | SubActionBlockBlock;
/**
 * A block with arguments
 * Most have chests.
 */
export declare abstract class ArgumentBlock extends Block {
    args?: Arguments;
    constructor(block: ArgumentBlockBlock, args?: Arguments);
}
export type DataBlockBlock = "func" | "call_func" | "process" | "start_process";
export declare class DataBlock extends ArgumentBlock implements SecondLineBlock {
    data: string;
    constructor(block: DataBlockBlock, data: string, args?: Arguments);
    static parse(data: unknown): DataBlock;
    get secondLine(): string;
    set secondLine(string: string);
}
export type ActionBlockBlock = SelectionBlockBlock | SubActionBlockBlock;
export declare class ActionBlock extends ArgumentBlock implements SecondLineBlock, ForthLineBlock {
    action: string;
    inverted: string;
    constructor(block: ActionBlockBlock, action: string, inverted?: string, args?: Arguments);
    static parse(data: unknown): ActionBlock;
    get secondLine(): string;
    set secondLine(string: string);
    get forthLine(): string;
    set forthLine(string: string);
    get not(): boolean;
    set not(boolean: boolean);
}
export type SelectionBlockBlock = "event" | "player_action" | "entity_event" | "entity_action" | "set_var" | "game_action" | "control" | "select_obj";
export declare class SelectionBlock extends ActionBlock implements ThirdLineBlock {
    target: string;
    constructor(block: SelectionBlockBlock, action: string, target?: string, inverted?: string, args?: Arguments);
    static parse(data: unknown): SelectionBlock;
    get thirdLine(): string;
    set thirdLine(string: string);
}
export type SubActionBlockBlock = "if_entity" | "if_game" | "if_player" | "if_var" | "repeat";
export declare class SubActionBlock extends ActionBlock implements ThirdLineBlock {
    subAction: string;
    constructor(block: SubActionBlockBlock, action: string, subAction?: string, inverted?: string, args?: Arguments);
    static parse(data: unknown): SubActionBlock;
    get thirdLine(): string;
    set thirdLine(string: string);
}
export declare const idToName: Map<BlockBlock, String>;
export declare const nameToId: Map<String, BlockBlock>;
