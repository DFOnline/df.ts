"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequiredRanks = exports.LoadedItems = exports.ValueTypes = exports.Color = exports.Icon = void 0;
require("reflect-metadata");
var codeblock_1 = __importDefault(require("./codeblock"));
var class_transformer_1 = require("class-transformer");
var action_1 = __importStar(require("./action"));
var ActionDump = /** @class */ (function () {
    function ActionDump() {
        this.codeblocks = [new codeblock_1.default];
        this.actions = [new action_1.default];
    }
    ActionDump.parse = function (data) {
        return (0, class_transformer_1.plainToInstance)(ActionDump, data);
    };
    __decorate([
        (0, class_transformer_1.Type)(function () { return codeblock_1.default; }),
        __metadata("design:type", Object)
    ], ActionDump.prototype, "codeblocks", void 0);
    __decorate([
        (0, class_transformer_1.Type)(function () { return action_1.default; }),
        __metadata("design:type", Object)
    ], ActionDump.prototype, "actions", void 0);
    return ActionDump;
}());
exports.default = ActionDump;
var Icon = /** @class */ (function () {
    function Icon() {
        this.material = 'STONE';
        this.name = '';
        this.deprecatedNote = [];
        this.description = [];
        this.example = [];
        this.worksWith = [];
        this.additionalInfo = [];
        this.requiredRank = exports.RequiredRanks.Empty;
        this.requireTokens = false;
        this.requireRankAndTokens = false;
        this.advanced = false;
        this.loadedItem = exports.LoadedItems.Empty;
    }
    ;
    Icon.prototype.isLegacy = function () {
        return this.material == 'STONE';
    };
    __decorate([
        (0, class_transformer_1.Type)(function () { return Color; }),
        __metadata("design:type", Color)
    ], Icon.prototype, "color", void 0);
    __decorate([
        (0, class_transformer_1.Type)(function () { return action_1.Argument; }),
        __metadata("design:type", Array)
    ], Icon.prototype, "arguments", void 0);
    return Icon;
}());
exports.Icon = Icon;
var Color = /** @class */ (function () {
    function Color(red, green, blue) {
        this.red = 0;
        this.green = 0;
        this.blue = 0;
        this.red = red;
        this.green = green;
        this.blue = blue;
    }
    return Color;
}());
exports.Color = Color;
exports.ValueTypes = {
    AnyType: "ANY_TYPE",
    Block: "BLOCK",
    BlockTag: "BLOCK_TAG",
    Dict: "DICT",
    EntityType: "ENTITY_TYPE",
    Item: "ITEM",
    List: "LIST",
    Location: "LOCATION",
    None: "NONE",
    Number: "NUMBER",
    Particle: "PARTICLE",
    Potion: "POTION",
    Projectile: "PROJECTILE",
    Sound: "SOUND",
    SpawnEgg: "SPAWN_EGG",
    Text: "TEXT",
    Variable: "VARIABLE",
    Vector: "VECTOR",
    Vehicle: "VEHICLE",
};
exports.LoadedItems = {
    Arrow: "ARROW",
    Empty: "",
    FireworkRocket: "FIREWORK_ROCKET",
};
exports.RequiredRanks = {
    Empty: "",
    Noble: "Noble",
    Emperor: "Emperor",
    Mythic: "Mythic",
    Overlord: "Overlord",
    Dev: "Dev",
};
