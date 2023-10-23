import { Icon, ValueType } from "./actiondump";
import { CodeblockName } from "./codeblock";
export default class Action {
    name: string;
    codeblockName: CodeblockName;
    tags: Tag[];
    aliases: string[];
    icon: Icon;
}
export declare class Argument {
    type?: ValueType;
    plural?: boolean;
    optional?: boolean;
    description?: string[];
    notes?: string[][];
    text?: Text;
}
export declare class Tag {
    name: string;
    options: Option[];
    defaultOption: string;
    slot: number;
}
export declare class Option {
    name: string;
    icon: Icon;
    aliases: string[];
}
