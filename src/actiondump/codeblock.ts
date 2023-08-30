import "reflect-metadata"
import { Type } from "class-transformer";
import { Icon } from "./actiondump"
import { Values } from "..";

export default class CodeBlock {
    name : CodeblockName = CodeblockNames.PlayerEvent;
    identifier = "";
    @Type(() => Icon)
    item = new Icon;
}

export type CodeblockName = Values<typeof CodeblockNames>;
export const CodeblockNames = {
    CallFunction: "CALL FUNCTION",
    Control: "CONTROL",
    Else: "ELSE",
    EntityAction: "ENTITY ACTION",
    EntityEvent: "ENTITY EVENT",
    Function: "FUNCTION",
    GameAction: "GAME ACTION",
    IfEntity: "IF ENTITY",
    IfGame: "IF GAME",
    IfPlayer: "IF PLAYER",
    IfVariable: "IF VARIABLE",
    PlayerAction: "PLAYER ACTION",
    PlayerEvent: "PLAYER EVENT",
    Process: "PROCESS",
    Repeat: "REPEAT",
    SelectObject: "SELECT OBJECT",
    SetVariable: "SET VARIABLE",
    StartProcess: "START PROCESS",
} as const;