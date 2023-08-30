import 'reflect-metadata';

import CodeBlock from "./codeblock";
import { Type, plainToInstance } from 'class-transformer';
import Action, { Argument } from './action';
import { Values } from '..';

export default class ActionDump {
    @Type(() => CodeBlock)
    codeblocks = [new CodeBlock];
    @Type(() => Action)
    actions = [new Action];

    static parse(data: any) {
        return plainToInstance(ActionDump, data)
    }
}

export class Icon {
    material:                string = 'STONE';
    name:                    string = '';
    deprecatedNote:          string[] = [];
    description:             string[] = [];
    example:                 string[] = [];
    worksWith:               string[] = [];
    additionalInfo:          string[][] = [];
    requiredRank:            RequiredRank = RequiredRanks.Empty;
    requireTokens:           boolean = false;
    requireRankAndTokens:    boolean = false;;
    advanced:                boolean = false;
    loadedItem:              LoadedItem = LoadedItems.Empty;
    head?:                   string;
    @Type(() => Color)
    color?:                  Color;

    isLegacy() : boolean {
        return this.material == 'STONE';
    }

    @Type(() => Argument)
    arguments?:               Argument[];
    tags?:                    number;
    cancellable?:             boolean;
    cancelledAutomatically?:  boolean;
    returnType?:              ValueType;
    returnDescription?:       string[];
}

export class Color {
    constructor(red : number,green : number,blue : number) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    red:   number = 0;
    green: number = 0;
    blue:  number = 0;
}

export type ValueType = Values<typeof ValueTypes>
export const ValueTypes = {
    AnyType: "ANY_TYPE",
    Block: "BLOCK",
    BlockTag: "BLOCK_TAG",
    Dict: "DICT",
    EntityType: "ENTITY_TYPE",
    Item: "ITEM",
    List: "LIST",
    Location: "LOCATION",
    None: "NONE",
    Number: "NUMBER",
    Particle: "PARTICLE",
    Potion: "POTION",
    Projectile: "PROJECTILE",
    Sound: "SOUND",
    SpawnEgg: "SPAWN_EGG",
    Text: "TEXT",
    Variable: "VARIABLE",
    Vector: "VECTOR",
    Vehicle: "VEHICLE",
} as const

export type LoadedItem = Values<typeof LoadedItems>
export const LoadedItems = {
    Arrow: "ARROW",
    Empty: "",
    FireworkRocket: "FIREWORK_ROCKET",
} as const

export type RequiredRank = Values<typeof RequiredRanks>
export const RequiredRanks =  {
    Empty: "",
    Noble: "Noble",
    Emperor: "Emperor",
    Mythic: "Mythic",
    Overlord: "Overlord",
    Dev: "Dev",
} as const