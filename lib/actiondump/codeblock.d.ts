import "reflect-metadata";
import { Icon } from "./actiondump";
import { Values } from "..";
export default class CodeBlock {
    name: CodeblockName;
    identifier: string;
    item: Icon;
}
export type CodeblockName = Values<typeof CodeblockNames>;
export declare const CodeblockNames: {
    readonly CallFunction: "CALL FUNCTION";
    readonly Control: "CONTROL";
    readonly Else: "ELSE";
    readonly EntityAction: "ENTITY ACTION";
    readonly EntityEvent: "ENTITY EVENT";
    readonly Function: "FUNCTION";
    readonly GameAction: "GAME ACTION";
    readonly IfEntity: "IF ENTITY";
    readonly IfGame: "IF GAME";
    readonly IfPlayer: "IF PLAYER";
    readonly IfVariable: "IF VARIABLE";
    readonly PlayerAction: "PLAYER ACTION";
    readonly PlayerEvent: "PLAYER EVENT";
    readonly Process: "PROCESS";
    readonly Repeat: "REPEAT";
    readonly SelectObject: "SELECT OBJECT";
    readonly SetVariable: "SET VARIABLE";
    readonly StartProcess: "START PROCESS";
};
