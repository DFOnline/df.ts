"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeblockNames = void 0;
require("reflect-metadata");
var class_transformer_1 = require("class-transformer");
var actiondump_1 = require("./actiondump");
var CodeBlock = /** @class */ (function () {
    function CodeBlock() {
        this.name = exports.CodeblockNames.PlayerEvent;
        this.identifier = "";
        this.item = new actiondump_1.Icon;
    }
    __decorate([
        (0, class_transformer_1.Type)(function () { return actiondump_1.Icon; }),
        __metadata("design:type", Object)
    ], CodeBlock.prototype, "item", void 0);
    return CodeBlock;
}());
exports.default = CodeBlock;
exports.CodeblockNames = {
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
};
