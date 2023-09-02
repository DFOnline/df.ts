import 'reflect-metadata';
export type Values<T> = T[keyof T];

// ActionDump
import ActionDump from './actiondump/actiondump';
import CodeBlock from './actiondump/codeblock';
export { ActionDump, CodeBlock }
export * from './actiondump/codeblock';

// Template
import Argument from './template/argument';
import Template from './template/template';
export { Argument, Template }
export * from './template/block'
export * from './template/lines'
export * from './template/argument'