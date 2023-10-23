import 'reflect-metadata';
import CodeBlock from "./codeblock";
import Action, { Argument } from './action';
import { Values } from '..';
export default class ActionDump {
    codeblocks: CodeBlock[];
    actions: Action[];
    static parse(data: any): ActionDump;
}
export declare class Icon {
    material: string;
    name: string;
    deprecatedNote: string[];
    description: string[];
    example: string[];
    worksWith: string[];
    additionalInfo: string[][];
    requiredRank: RequiredRank;
    requireTokens: boolean;
    requireRankAndTokens: boolean;
    advanced: boolean;
    loadedItem: LoadedItem;
    head?: string;
    color?: Color;
    isLegacy(): boolean;
    arguments?: Argument[];
    tags?: number;
    cancellable?: boolean;
    cancelledAutomatically?: boolean;
    returnType?: ValueType;
    returnDescription?: string[];
}
export declare class Color {
    constructor(red: number, green: number, blue: number);
    red: number;
    green: number;
    blue: number;
}
export type ValueType = Values<typeof ValueTypes>;
export declare const ValueTypes: {
    readonly AnyType: "ANY_TYPE";
    readonly Block: "BLOCK";
    readonly BlockTag: "BLOCK_TAG";
    readonly Dict: "DICT";
    readonly EntityType: "ENTITY_TYPE";
    readonly Item: "ITEM";
    readonly List: "LIST";
    readonly Location: "LOCATION";
    readonly None: "NONE";
    readonly Number: "NUMBER";
    readonly Particle: "PARTICLE";
    readonly Potion: "POTION";
    readonly Projectile: "PROJECTILE";
    readonly Sound: "SOUND";
    readonly SpawnEgg: "SPAWN_EGG";
    readonly Text: "TEXT";
    readonly Variable: "VARIABLE";
    readonly Vector: "VECTOR";
    readonly Vehicle: "VEHICLE";
};
export type LoadedItem = Values<typeof LoadedItems>;
export declare const LoadedItems: {
    readonly Arrow: "ARROW";
    readonly Empty: "";
    readonly FireworkRocket: "FIREWORK_ROCKET";
};
export type RequiredRank = Values<typeof RequiredRanks>;
export declare const RequiredRanks: {
    readonly Empty: "";
    readonly Noble: "Noble";
    readonly Emperor: "Emperor";
    readonly Mythic: "Mythic";
    readonly Overlord: "Overlord";
    readonly Dev: "Dev";
};
