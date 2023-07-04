import 'reflect-metadata';

import ActionDump from './actiondump/actiondump';
import CodeBlock from './actiondump/codeblock';

import Template from "./template/template";
import { Block, Bracket, ArgumentBlock, ActionBlock, TemplateBlock, DataBlock, Else, SelectionBlock, SubActionBlock } from "./template/block";
import { SecondLineBlock, ThirdLineBlock, ForthLineBlock } from "./template/lines";

export { Template };
export { Block, Bracket, ArgumentBlock, ActionBlock, TemplateBlock, DataBlock, Else, SelectionBlock, SubActionBlock };
export { SecondLineBlock, ThirdLineBlock, ForthLineBlock };

export { ActionDump, CodeBlock }