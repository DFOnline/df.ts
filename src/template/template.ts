import { TemplateBlock } from "./block";

export default class Template {
    blocks : TemplateBlock[];

    constructor(blocks : TemplateBlock[] = []) {
        this.blocks = blocks;
    }

    static parse(data : any) : Template {
        if(!(data.blocks instanceof Array)) throw TypeError("blocks tag isn't array.");
        const blocks = data.blocks.map((block : any) => TemplateBlock.parse(block));
        return new Template(blocks);
    }
}