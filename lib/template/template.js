"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var block_1 = require("./block");
var Template = /** @class */ (function () {
    function Template(blocks) {
        if (blocks === void 0) { blocks = []; }
        this.blocks = blocks;
    }
    Template.parse = function (data) {
        if (!(data.blocks instanceof Array))
            throw TypeError("blocks tag isn't array.");
        var blocks = data.blocks.map(function (block, i) {
            try {
                return block_1.TemplateBlock.parse(block);
            }
            catch (e) {
                throw TypeError("Couldn't parse block at ".concat(i, " because ").concat(e));
            }
        });
        return new Template(blocks);
    };
    return Template;
}());
exports.default = Template;
