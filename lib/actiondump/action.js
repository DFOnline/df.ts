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
exports.Option = exports.Tag = exports.Argument = void 0;
var class_transformer_1 = require("class-transformer");
var actiondump_1 = require("./actiondump");
var codeblock_1 = require("./codeblock");
var Action = /** @class */ (function () {
    function Action() {
        this.name = '';
        this.codeblockName = codeblock_1.CodeblockNames.PlayerEvent;
        this.tags = [];
        this.aliases = [];
        this.icon = new actiondump_1.Icon;
    }
    __decorate([
        (0, class_transformer_1.Type)(function () { return actiondump_1.Icon; }),
        __metadata("design:type", actiondump_1.Icon)
    ], Action.prototype, "icon", void 0);
    return Action;
}());
exports.default = Action;
var Argument = /** @class */ (function () {
    function Argument() {
    }
    return Argument;
}());
exports.Argument = Argument;
var Tag = /** @class */ (function () {
    function Tag() {
        this.name = '';
        this.options = [];
        this.defaultOption = '';
        this.slot = 0;
    }
    return Tag;
}());
exports.Tag = Tag;
var Option = /** @class */ (function () {
    function Option() {
        this.name = "";
        this.icon = new actiondump_1.Icon;
        this.aliases = [];
    }
    return Option;
}());
exports.Option = Option;
