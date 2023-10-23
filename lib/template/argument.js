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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsByID = exports.Items = exports.Hint = exports.MinecraftItem = exports.BlockTag = exports.Parameter = exports.GameValue = exports.GameValueTargets = exports.Sound = exports.Potion = exports.Vector = exports.Location = exports.Variable = exports.VariableScopes = exports.Component = exports.Number = exports.Text = exports.ArgumentItem = exports.Arguments = void 0;
var Arguments = /** @class */ (function () {
    function Arguments(items) {
        if (items === void 0) { items = []; }
        this.items = items;
    }
    Arguments.parse = function (data) {
        if (typeof data != 'object')
            throw TypeError("data should be an object, not a ".concat(typeof data));
        if (!(data.items instanceof Array))
            throw TypeError("data.items should be an Array");
        return new Arguments(data.items.map(function (i) { return Argument.parse(i); }));
    };
    return Arguments;
}());
exports.Arguments = Arguments;
var Argument = /** @class */ (function () {
    function Argument(item, slot) {
        if (!(item instanceof ArgumentItem))
            throw TypeError("Item isn't an instance of an item.");
        if (slot < 0 || slot > 26)
            throw RangeError("Slot index ".concat(slot, " is out of valid."));
        this.item = item;
        this.slot = slot;
    }
    Argument.parse = function (data) {
        return new Argument(ArgumentItem.parse(data.item), data.slot);
    };
    return Argument;
}());
exports.default = Argument;
var ArgumentItem = /** @class */ (function () {
    function ArgumentItem(data) {
        if (typeof data != 'object')
            throw TypeError("Item data must be an object, not ".concat(typeof data));
    }
    ArgumentItem.parse = function (raw) {
        if (typeof raw != 'object' || !raw)
            throw TypeError("Expected type of object, not ".concat(typeof raw));
        if (!("id" in raw) || !("data" in raw) || typeof raw.id != "string" || typeof raw.data != "object" || !raw.id || !raw.data)
            throw TypeError("Invalid object");
        var i = raw.id;
        var d = raw.data;
        if (!(i in exports.ItemsByID))
            throw new TypeError("Invalid id: ".concat(i));
        return new exports.ItemsByID[i](d);
    };
    return ArgumentItem;
}());
exports.ArgumentItem = ArgumentItem;
var Text = /** @class */ (function (_super) {
    __extends(Text, _super);
    function Text(data) {
        var _this = this;
        if (typeof data.name != 'string')
            throw new TypeError("data.name must be a string, not ".concat(typeof data.name));
        _this = _super.call(this, data) || this;
        _this.data = data;
        _this.id = Text.id;
        return _this;
    }
    Text.from = function (data) {
        return new Text(data);
    };
    Text.id = "txt";
    return Text;
}(ArgumentItem));
exports.Text = Text;
var Number = /** @class */ (function (_super) {
    __extends(Number, _super);
    function Number(data) {
        var _this = this;
        if (typeof data.name != 'string')
            throw new TypeError("data.name must be a string, not ".concat(typeof data.name));
        _this = _super.call(this, data) || this;
        _this.data = data;
        _this.id = Number.id;
        return _this;
    }
    Number.from = function (data) {
        return new Number(data);
    };
    Number.id = "num";
    return Number;
}(ArgumentItem));
exports.Number = Number;
var Component = /** @class */ (function (_super) {
    __extends(Component, _super);
    function Component(data) {
        var _this = this;
        if (typeof data.name != 'string')
            throw new TypeError("data.name must be a string, not ".concat(typeof data.name));
        _this = _super.call(this, data) || this;
        _this.data = data;
        _this.id = Component.id;
        return _this;
    }
    Component.from = function (data) {
        return new Component(data);
    };
    Component.id = "comp";
    return Component;
}(ArgumentItem));
exports.Component = Component;
exports.VariableScopes = ['unsaved', 'saved', 'local', 'line'];
var Variable = /** @class */ (function (_super) {
    __extends(Variable, _super);
    function Variable(data) {
        var _this = this;
        if (typeof data.name != 'string')
            throw new TypeError("data.name must be a string, not ".concat(typeof data.name));
        if (!exports.VariableScopes.includes(data.scope))
            throw new TypeError("Scope must be any of unsaved, saved and local. Not ".concat(data.scope));
        _this = _super.call(this, data) || this;
        _this.data = data;
        _this.id = Variable.id;
        return _this;
    }
    Variable.from = function (data) {
        return new Variable(data);
    };
    Variable.id = "var";
    return Variable;
}(ArgumentItem));
exports.Variable = Variable;
var Location = /** @class */ (function (_super) {
    __extends(Location, _super);
    function Location(data) {
        var _this = this;
        var _a;
        data.isBlock = (_a = data.isBlock) !== null && _a !== void 0 ? _a : false;
        if (typeof data.isBlock != 'boolean')
            throw TypeError("data.isBlock should be a boolean, not ".concat(typeof data.isBlock));
        if (typeof data.loc.x != 'number')
            throw TypeError("data.loc.x should be a number, not ".concat(typeof data.loc.x));
        if (typeof data.loc.y != 'number')
            throw TypeError("data.loc.y should be a number, not ".concat(typeof data.loc.y));
        if (typeof data.loc.z != 'number')
            throw TypeError("data.loc.z should be a number, not ".concat(typeof data.loc.z));
        if (typeof data.loc.pitch != 'number' && typeof data.loc.pitch != 'undefined')
            throw TypeError("data.loc.pitch should be a number or undefined, not a ".concat(typeof data.loc.pitch));
        if (typeof data.loc.yaw != 'number' && typeof data.loc.yaw != 'undefined')
            throw TypeError("data.loc.yaw should be a number or undefined, not a ".concat(typeof data.loc.yaw));
        _this = _super.call(this, data) || this;
        _this.data = data;
        _this.id = Location.id;
        return _this;
    }
    Location.from = function (data) {
        if (!("loc" in data) || typeof data.loc != "object" || !data.loc)
            throw new TypeError("Invalid location argument type");
        if (!("x" in data.loc) || !("y" in data.loc) || !("z" in data.loc) || !("pitch" in data.loc) || !("yaw" in data.loc))
            throw new TypeError("Invalid location argument type");
        if (typeof data.loc.x != 'number')
            throw TypeError("data.loc.x should be a number, not ".concat(typeof data.loc.x));
        if (typeof data.loc.y != 'number')
            throw TypeError("data.loc.y should be a number, not ".concat(typeof data.loc.y));
        if (typeof data.loc.z != 'number')
            throw TypeError("data.loc.z should be a number, not ".concat(typeof data.loc.z));
        if (typeof data.loc.pitch != 'number' && typeof data.loc.pitch != 'undefined')
            throw TypeError("data.loc.pitch should be a number or undefined, not a ".concat(typeof data.loc.pitch));
        if (typeof data.loc.yaw != 'number' && typeof data.loc.yaw != 'undefined')
            throw TypeError("data.loc.yaw should be a number or undefined, not a ".concat(typeof data.loc.yaw));
        //@ts-ignore // i have no clue what's going on
        return new Location(data);
    };
    Location.id = "loc";
    return Location;
}(ArgumentItem));
exports.Location = Location;
var Vector = /** @class */ (function (_super) {
    __extends(Vector, _super);
    function Vector(data) {
        var _this = this;
        if (typeof data.x != 'number')
            throw TypeError("data.x should be a number, not ".concat(typeof data.x));
        if (typeof data.y != 'number')
            throw TypeError("data.y should be a number, not ".concat(typeof data.y));
        if (typeof data.z != 'number')
            throw TypeError("data.z should be a number, not ".concat(typeof data.z));
        _this = _super.call(this, data) || this;
        _this.data = data;
        _this.id = Vector.id;
        return _this;
    }
    Vector.from = function (data) {
        if (!("x" in data) || !("y" in data) || !("z" in data))
            throw new TypeError("Invalid vector argument type");
        if (typeof data.x != 'number')
            throw TypeError("data.x should be a number, not ".concat(typeof data.x));
        if (typeof data.y != 'number')
            throw TypeError("data.y should be a number, not ".concat(typeof data.y));
        if (typeof data.z != 'number')
            throw TypeError("data.z should be a number, not ".concat(typeof data.z));
        //@ts-ignore // i have no clue what's going on
        return new Vector(data);
    };
    Vector.id = "vec";
    return Vector;
}(ArgumentItem));
exports.Vector = Vector;
var Potion = /** @class */ (function (_super) {
    __extends(Potion, _super);
    function Potion(data) {
        var _this = this;
        if (typeof data.pot != 'string')
            throw TypeError("data.pot should be a string not ".concat(typeof data.pot));
        if (typeof data.dur != 'number')
            throw TypeError("data.dur should be a number not ".concat(typeof data.dur));
        if (typeof data.amp != 'number')
            throw TypeError("data.amp should be a number not ".concat(typeof data.amp));
        _this = _super.call(this, data) || this;
        _this.data = data;
        _this.id = Potion.id;
        return _this;
    }
    Potion.from = function (data) {
        if (!("pot" in data) || !("dur" in data) || !("amp" in data))
            throw new TypeError("Invalid potion argument type");
        if (typeof data.pot != 'string')
            throw TypeError("data.pot should be a string not ".concat(typeof data.pot));
        if (typeof data.dur != 'number')
            throw TypeError("data.dur should be a number not ".concat(typeof data.dur));
        if (typeof data.amp != 'number')
            throw TypeError("data.amp should be a number not ".concat(typeof data.amp));
        //@ts-ignore // i have no clue what's going on
        return new Potion(data);
    };
    Potion.id = "pot";
    return Potion;
}(ArgumentItem));
exports.Potion = Potion;
var Sound = /** @class */ (function (_super) {
    __extends(Sound, _super);
    function Sound(data) {
        var _this = this;
        if (typeof data.sound != 'string')
            throw TypeError("data.sound should be a string not ".concat(typeof data.sound));
        if (typeof data.pitch != 'number')
            throw TypeError("data.pitch should be a number not ".concat(typeof data.pitch));
        if (typeof data.vol != 'number')
            throw TypeError("data.vol should be a number not ".concat(typeof data.vol));
        _this = _super.call(this, data) || this;
        _this.data = data;
        _this.id = Sound.id;
        return _this;
    }
    Sound.from = function (data) {
        if (!("sound" in data) || !("pitch" in data) || !("vol" in data))
            throw new TypeError("Invalid potion argument type");
        if (typeof data.sound != 'string')
            throw TypeError("data.sound should be a string not ".concat(typeof data.sound));
        if (typeof data.pitch != 'number')
            throw TypeError("data.pitch should be a number not ".concat(typeof data.pitch));
        if (typeof data.vol != 'number')
            throw TypeError("data.vol should be a number not ".concat(typeof data.vol));
        //@ts-ignore // i have no clue what's going on
        return new Sound(data);
    };
    Sound.id = "snd";
    return Sound;
}(ArgumentItem));
exports.Sound = Sound;
// TODO: Particles, keep in mind https://gist.github.com/tk2217/1dbbb24aa69e54bdb2574aedb7e71e53
exports.GameValueTargets = ['Selection', 'Default', 'Killer', 'Damager', 'Victim', 'Shooter', 'Projectile', 'LastEntity'];
var GameValue = /** @class */ (function (_super) {
    __extends(GameValue, _super);
    function GameValue(data) {
        var _this = this;
        if (typeof data.type != 'string')
            throw TypeError("data.type should be a string not ".concat(typeof data.type));
        if (!exports.GameValueTargets.includes(data.target))
            throw TypeError("data.target is ".concat(data.target, ", it should be any of: ").concat(exports.GameValueTargets.join(', '), "."));
        _this = _super.call(this, data) || this;
        _this.data = data;
        _this.id = GameValue.id;
        return _this;
    }
    GameValue.from = function (data) {
        if (!("type" in data) || !("target" in data))
            throw TypeError("Invalid gamevalue argument type");
        if (typeof data.type != 'string')
            throw TypeError("data.type should be a string not ".concat(typeof data.type));
        if (typeof data.target != 'string')
            throw TypeError("data.target should be a string not ".concat(typeof data.target));
        //@ts-ignore // i have no clue what's going on
        return new GameValue(data);
    };
    GameValue.id = "g_val";
    return GameValue;
}(ArgumentItem));
exports.GameValue = GameValue;
var ParameterType = ['txt', 'comp', 'num', 'loc', 'vec', 'snd', 'part', 'pot', 'item', 'any', 'var', 'list', 'dict'];
var Parameter = /** @class */ (function (_super) {
    __extends(Parameter, _super);
    function Parameter(data) {
        var _this = this;
        if (typeof data.name != 'string')
            throw TypeError("data.name should be a string not ".concat(typeof data.name));
        if (!ParameterType.includes(data.type))
            throw TypeError("data.type is ".concat(data.type, " instead of any valid ").concat(ParameterType.join(', '), "."));
        if (typeof data.plural != 'boolean')
            throw TypeError("data.plural should be a boolean not ".concat(typeof data.plural));
        if (typeof data.optional != 'boolean')
            throw TypeError("data.optional should be a boolean not ".concat(typeof data.optional));
        if (data.note && typeof data.note != 'string')
            throw TypeError("data.note should be unset or a string not ".concat(typeof data.note));
        if (data.description && typeof data.description != 'string')
            throw TypeError("data.description should be unset or a string not ".concat(typeof data.description));
        if (data.default_value) {
            if (!data.optional)
                throw TypeError("There shouldn't be a default value on non-optional parameters");
            if (data.plural)
                throw TypeError("There can't be default values on plural parameters");
            if (data.type == 'var' || data.type == 'list' || data.type == 'dict')
                throw TypeError("Parameters with type ".concat(data.type, " cannot have default values"));
        }
        _this = _super.call(this, data) || this;
        _this.data = data;
        _this.id = Parameter.id;
        if (_this.data.default_value != null)
            _this.data.default_value = ArgumentItem.parse(_this.data.default_value);
        return _this;
    }
    Parameter.from = function (data) {
        return new Parameter(data); // haven't I done these checks already?
    };
    /** Short for `pattern_element`. Parameters, each bullet in a actions Chest Parameters is a pattern internally. Apparently. */
    Parameter.id = "pn_el";
    return Parameter;
}(ArgumentItem));
exports.Parameter = Parameter;
var BlockTag = /** @class */ (function (_super) {
    __extends(BlockTag, _super);
    function BlockTag(data) {
        var _this = this;
        if (typeof data.option != 'string')
            throw TypeError("data.option should be a string not ".concat(typeof data.option));
        if (typeof data.tag != 'string')
            throw TypeError("data.tag should be a string not ".concat(typeof data.tag));
        if (typeof data.action != 'string')
            throw TypeError("data.action should be a string not ".concat(typeof data.action));
        if (typeof data.block != 'string')
            throw TypeError("data.block should be a string not ".concat(typeof data.block));
        _this = _super.call(this, data) || this;
        _this.data = data;
        _this.id = BlockTag.id;
        return _this;
    }
    BlockTag.from = function (data) {
        if (!("option" in data) || !("tag" in data) || !("action" in data) || !("block" in data))
            throw new TypeError("Invalid blocktag argument type");
        if (typeof data.option != 'string')
            throw TypeError("data.option should be a string not ".concat(typeof data.option));
        if (typeof data.tag != 'string')
            throw TypeError("data.tag should be a string not ".concat(typeof data.tag));
        if (typeof data.action != 'string')
            throw TypeError("data.action should be a string not ".concat(typeof data.action));
        if (typeof data.block != 'string')
            throw TypeError("data.block should be a string not ".concat(typeof data.block));
        //@ts-ignore // i have no clue what's going on
        return new BlockTag(data);
    };
    BlockTag.id = "bl_tag";
    return BlockTag;
}(ArgumentItem));
exports.BlockTag = BlockTag;
var MinecraftItem = /** @class */ (function (_super) {
    __extends(MinecraftItem, _super);
    function MinecraftItem(data) {
        var _this = this;
        if (typeof data.item != 'string')
            throw TypeError("data.item should be a string not ".concat(typeof data.item));
        _this = _super.call(this, data) || this;
        _this.data = data;
        _this.id = MinecraftItem.id;
        return _this;
    }
    MinecraftItem.from = function (data) {
        if (!("item" in data))
            throw new TypeError("Invalid minecraftitem argument type");
        if (typeof data.item != 'string')
            throw TypeError("data.item should be a string not ".concat(typeof data.item));
        //@ts-ignore // i have no clue what's going on
        return new MinecraftItem(data);
    };
    MinecraftItem.id = "item";
    return MinecraftItem;
}(ArgumentItem));
exports.MinecraftItem = MinecraftItem;
var HintIDs = ['function'];
var Hint = /** @class */ (function (_super) {
    __extends(Hint, _super);
    function Hint(data) {
        var _this = this;
        if (!HintIDs.includes(data.id))
            throw TypeError("Hint id cannot be ".concat(data.id, " it needs to be any of ").concat(HintIDs));
        _this = _super.call(this, data) || this;
        _this.data = data;
        _this.id = Hint.id;
        return _this;
    }
    Hint.from = function (data) {
        return new Hint(data);
    };
    Hint.id = "hint";
    return Hint;
}(ArgumentItem));
exports.Hint = Hint;
exports.Items = [Text, Component, Number, Variable, Location, Vector, Potion, Sound, GameValue, BlockTag, MinecraftItem, Parameter, Hint];
exports.ItemsByID = Object.fromEntries(exports.Items.map(function (i) { return [i.id, i]; }));
