import { TemplateBlock } from "./block";
export default class Template {
    blocks: TemplateBlock[];
    constructor(blocks?: TemplateBlock[]);
    static parse(data: any): Template;
}
