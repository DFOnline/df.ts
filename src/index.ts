import Template from "./template/template";
import { Block, Bracket, ArgumentBlock, ActionBlock, TemplateBlock, DataBlock, Else, SelectionBlock, SubActionBlock } from "./template/block";
import { SecondLineBlock, ThirdLineBlock, ForthLineBlock } from "./template/lines";

export default Template;
export { Block, Bracket, ArgumentBlock, ActionBlock, TemplateBlock as CodeBlock, DataBlock, Else, SelectionBlock, SubActionBlock };
export { SecondLineBlock, ThirdLineBlock, ForthLineBlock };