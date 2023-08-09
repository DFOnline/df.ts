import { Icon, ValueType } from "./actiondump";
import { CodeblockName } from "./codeblock";

export default class Action {
    name: string = '';
    codeblockName: CodeblockName = CodeblockName.PlayerEvent;
    tags: Tag[] = [];
    aliases: string[] = [];
    icon: ActionIcon = new ActionIcon;
}

export class ActionIcon extends Icon {
    arguments:               Argument[] = [];
    tags:                    number = 0;
    cancellable:             boolean = false;
    cancelledAutomatically:  boolean = false;
    returnType:              ValueType = ValueType.AnyType;
    returnDescription:       string[] = [];
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
    icon:    Icon = new Icon;
    aliases: string[] = [];
}