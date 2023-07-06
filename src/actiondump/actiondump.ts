import 'reflect-metadata';

import CodeBlock from "./codeblock";
import { Type } from 'class-transformer';

export default class ActionDump {
    @Type(() => CodeBlock)
    codeblocks = [new CodeBlock()];
}

export class Icon {

}
