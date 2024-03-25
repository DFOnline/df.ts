"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.nameToId = exports.idToName = exports.SubActionBlock = exports.SelectionBlock = exports.ActionBlock = exports.DataBlock = exports.ArgumentBlock = exports.Else = exports.Block = exports.Bracket = exports.TemplateBlock = void 0;
require("reflect-metadata");
var argument_1 = require("./argument");
var class_transformer_1 = require("class-transformer");
var TemplateBlock = /** @class */ (function () {
    function TemplateBlock(id) {
        this.id = id;
    }
    TemplateBlock.parse = function (data) {
        if (data.id == 'bracket')
            return Bracket.parse(data);
        if (data.id == 'block') {
            if ('data' in data)
                return DataBlock.parse(data);
            if ('subAction' in data)
                return SubActionBlock.parse(data);
            if ('target' in data)
                return SelectionBlock.parse(data);
            if ('action' in data)
                return ActionBlock.parse(data);
            if (data.block == 'else')
                return new Else();
        }
        throw TypeError("Not a valid block type");
    };
    return TemplateBlock;
}());
exports.TemplateBlock = TemplateBlock;
var Bracket = /** @class */ (function (_super) {
    __extends(Bracket, _super);
    function Bracket(direct, type) {
        if (direct === void 0) { direct = "open"; }
        if (type === void 0) { type = "norm"; }
        var _this = _super.call(this, "bracket") || this;
        _this.id = "bracket";
        _this.direct = "open";
        _this.type = "norm";
        _this.direct = direct;
        _this.type = type;
        return _this;
    }
    Bracket.parse = function (data) {
        var res = (0, class_transformer_1.plainToInstance)(Bracket, data);
        return res;
    };
    return Bracket;
}(TemplateBlock));
exports.Bracket = Bracket;
var Block = /** @class */ (function (_super) {
    __extends(Block, _super);
    function Block(block) {
        var _this = _super.call(this, "block") || this;
        _this.id = "block";
        _this.block = block;
        return _this;
    }
    return Block;
}(TemplateBlock));
exports.Block = Block;
var Else = /** @class */ (function (_super) {
    __extends(Else, _super);
    function Else() {
        var _this = _super.call(this, 'else') || this;
        _this.block = "else";
        return _this;
    }
    return Else;
}(Block));
exports.Else = Else;
/**
 * A block with arguments
 * Most have chests.
 */
var ArgumentBlock = /** @class */ (function (_super) {
    __extends(ArgumentBlock, _super);
    function ArgumentBlock(block, args) {
        if (args === void 0) { args = new argument_1.Arguments(); }
        var _this = _super.call(this, block) || this;
        _this.args = args;
        return _this;
    }
    __decorate([
        (0, class_transformer_1.Type)(function () { return argument_1.Arguments; }),
        __metadata("design:type", argument_1.Arguments)
    ], ArgumentBlock.prototype, "args", void 0);
    return ArgumentBlock;
}(Block));
exports.ArgumentBlock = ArgumentBlock;
var DataBlock = /** @class */ (function (_super) {
    __extends(DataBlock, _super);
    function DataBlock(block, data, args) {
        var _this = _super.call(this, block, args) || this;
        _this.data = data;
        return _this;
    }
    DataBlock.parse = function (data) {
        return (0, class_transformer_1.plainToInstance)(DataBlock, data);
    };
    Object.defineProperty(DataBlock.prototype, "secondLine", {
        get: function () {
            return this.data;
        },
        set: function (string) {
            this.data = string;
        },
        enumerable: false,
        configurable: true
    });
    return DataBlock;
}(ArgumentBlock));
exports.DataBlock = DataBlock;
var ActionBlock = /** @class */ (function (_super) {
    __extends(ActionBlock, _super);
    function ActionBlock(block, action, attribute, args) {
        if (attribute === void 0) { attribute = ''; }
        var _this = _super.call(this, block, args) || this;
        /**
         * @deprecated No longer filled by DF.
         */
        _this.inverted = '';
        _this.attribute = '';
        _this.action = action;
        _this.attribute = attribute;
        return _this;
    }
    ActionBlock.parse = function (data) {
        return (0, class_transformer_1.plainToInstance)(ActionBlock, data);
    };
    Object.defineProperty(ActionBlock.prototype, "secondLine", {
        get: function () {
            return this.action;
        },
        set: function (string) {
            this.action = string;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ActionBlock.prototype, "attr", {
        get: function () {
            return this.attribute;
        },
        set: function (string) {
            this.attribute = string;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ActionBlock.prototype, "forthLine", {
        get: function () {
            var _a;
            return (_a = this.attribute) !== null && _a !== void 0 ? _a : this.inverted;
        },
        set: function (string) {
            this.attribute = string;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ActionBlock.prototype, "not", {
        get: function () {
            return this.attribute === 'NOT' || this.inverted === 'NOT';
        },
        set: function (boolean) {
            this.attribute = boolean ? 'NOT' : '';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ActionBlock.prototype, "cancelled", {
        get: function () {
            return this.attr === 'LS-CANCEL';
        },
        set: function (boolean) {
            this.attr = boolean ? 'LS-CANCEL' : '';
        },
        enumerable: false,
        configurable: true
    });
    return ActionBlock;
}(ArgumentBlock));
exports.ActionBlock = ActionBlock;
var SelectionBlock = /** @class */ (function (_super) {
    __extends(SelectionBlock, _super);
    function SelectionBlock(block, action, target, attribute, args) {
        var _this = _super.call(this, block, action, attribute, args) || this;
        _this.target = "";
        _this.target = target !== null && target !== void 0 ? target : "";
        return _this;
    }
    SelectionBlock.parse = function (data) {
        return (0, class_transformer_1.plainToInstance)(SelectionBlock, data);
    };
    Object.defineProperty(SelectionBlock.prototype, "thirdLine", {
        get: function () {
            return this.target;
        },
        set: function (string) {
            this.target = string;
        },
        enumerable: false,
        configurable: true
    });
    return SelectionBlock;
}(ActionBlock));
exports.SelectionBlock = SelectionBlock;
var SubActionBlock = /** @class */ (function (_super) {
    __extends(SubActionBlock, _super);
    function SubActionBlock(block, action, subAction, attribute, args) {
        var _this = _super.call(this, block, action, attribute, args) || this;
        _this.subAction = subAction !== null && subAction !== void 0 ? subAction : "";
        return _this;
    }
    SubActionBlock.parse = function (data) {
        return (0, class_transformer_1.plainToInstance)(SubActionBlock, data);
    };
    Object.defineProperty(SubActionBlock.prototype, "thirdLine", {
        get: function () {
            return this.subAction;
        },
        set: function (string) {
            this.subAction = string;
        },
        enumerable: false,
        configurable: true
    });
    return SubActionBlock;
}(ActionBlock));
exports.SubActionBlock = SubActionBlock;
// JSON.parse($0.innerText).codeblocks.map(a => [a.identifier, a.name])
var defaultBlockNames = [["player_action", "PLAYER ACTION"], ["if_player", "IF PLAYER"], ["start_process", "START PROCESS"], ["call_func", "CALL FUNCTION"], ["control", "CONTROL"], ["set_var", "SET VARIABLE"], ["entity_event", "ENTITY EVENT"], ["event", "PLAYER EVENT"], ["func", "FUNCTION"], ["if_entity", "IF ENTITY"], ["entity_action", "ENTITY ACTION"], ["if_var", "IF VARIABLE"], ["select_obj", "SELECT OBJECT"], ["game_action", "GAME ACTION"], ["else", "ELSE"], ["process", "PROCESS"], ["repeat", "REPEAT"], ["if_game", "IF GAME"]];
exports.idToName = new Map(defaultBlockNames);
exports.nameToId = new Map(defaultBlockNames.map(function (x) { return x.reverse(); }));
