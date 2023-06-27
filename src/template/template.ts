import { Bracket, CodeBlock, DataBlock, Else, SelectionBlock, SubActionBlock } from "./block";

export default class Template {
    blocks : CodeBlock[];

    constructor(blocks : CodeBlock[] = []) {
        this.blocks = blocks;
    }

    static parse(data : any) : Template {
        const blockTypes = [SelectionBlock, SubActionBlock, DataBlock, Bracket, Else];
        if(!(data.blocks instanceof Array)) throw TypeError("blocks tag isn't array.");
        const blocks = data.blocks.map((block : any, i : number) => {
            for (const type of blockTypes) {
                if(type.check(block) == null) {
                    return type.parse(block);
                }
            }
            throw TypeError(`Couldn't parse block at ${i}`);
        });
        return new Template(blocks);
    }
}