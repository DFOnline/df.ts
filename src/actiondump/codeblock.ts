import { Icon } from "./actiondump"

export default class CodeBlock {
    name : CodeblockName = CodeblockName.PlayerEvent;
    identifier = "";
    item = new Icon;
}

export enum CodeblockName {
    CallFunction = "CALL FUNCTION",
    Control = "CONTROL",
    Else = "ELSE",
    EntityAction = "ENTITY ACTION",
    EntityEvent = "ENTITY EVENT",
    Function = "FUNCTION",
    GameAction = "GAME ACTION",
    IfEntity = "IF ENTITY",
    IfGame = "IF GAME",
    IfPlayer = "IF PLAYER",
    IfVariable = "IF VARIABLE",
    PlayerAction = "PLAYER ACTION",
    PlayerEvent = "PLAYER EVENT",
    Process = "PROCESS",
    Repeat = "REPEAT",
    SelectObject = "SELECT OBJECT",
    SetVariable = "SET VARIABLE",
    StartProcess = "START PROCESS",
}