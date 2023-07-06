import { TemplateBlock } from "./block";

export default class Template {
    blocks : TemplateBlock[];

    constructor(blocks : TemplateBlock[] = []) {
        this.blocks = blocks;
    }

    static parse(data : any) : Template {
        if(!(data.blocks instanceof Array)) throw TypeError("blocks tag isn't array.");
        const blocks = data.blocks.map((block : any, i : number) => {
            try {
                return TemplateBlock.parse(block)
            }
            catch (e) {
                throw TypeError(`Couldn't parse block at ${i} because ${e}`)
            }
        });
        return new Template(blocks);
    }
}
