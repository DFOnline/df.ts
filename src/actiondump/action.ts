import { Type } from "class-transformer";
import { Icon, ValueType } from "./actiondump";
import { CodeblockName, CodeblockNames } from "./codeblock";

export default class Action {
    name: string = '';
    codeblockName: CodeblockName = CodeblockNames.PlayerEvent;
    tags: Tag[] = [];
    aliases: string[] = [];
    @Type(() => Icon)
    icon: Icon = Icon({});
}

export class Argument {
    type?:        ValueType;
    plural?:      boolean;
    optional?:    boolean;
    description?: string[];
    notes?:       string[][];
    text?:        Text;
}

export class Tag {
    name:          string = '';
    options:       Option[] = [];
    defaultOption: string = '';
    slot:          number = 0;
}

export class Option {
    name:    string = "";
    icon:    Icon = Icon({});
    aliases: string[] = [];
}