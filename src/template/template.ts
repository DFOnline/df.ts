import { CodeBlock } from "./block";

export default class Template {
    blocks : CodeBlock[];

    constructor(blocks : CodeBlock[] = []) {
        this.blocks = blocks;
    }

    static parse(data : any) : Template {
        if(!(data.blocks instanceof Array)) throw TypeError("blocks tag isn't array.");
        const blocks = data.blocks.map((block : any) => CodeBlock.parse(block));
        return new Template(blocks);
    }
}