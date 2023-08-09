import 'reflect-metadata';

import CodeBlock from "./codeblock";
import { Type } from 'class-transformer';

export default class ActionDump {
    @Type(() => CodeBlock)
    codeblocks = [new CodeBlock()];
}

export class Icon {
    material:                string = 'STONE';
    name:                    string = '';
    deprecatedNote:          string[] = [];
    description:             string[] = [];
    example:                 string[] = [];
    worksWith:               string[] = [];
    additionalInfo:          string[][] = [];
    requiredRank:            RequiredRank = RequiredRank.Empty;
    requireTokens:           boolean = false;
    requireRankAndTokens:    boolean = false;;
    advanced:                boolean = false;
    loadedItem:              LoadedItem = LoadedItem.Empty;
    head?:                   string;
    @Type(() => Color)
    color?:                  Color;

    isLegacy() : boolean {
        return this.material == 'STONE';
    }
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

export enum ValueType {
    AnyType = "ANY_TYPE",
    Block = "BLOCK",
    BlockTag = "BLOCK_TAG",
    Dict = "DICT",
    EntityType = "ENTITY_TYPE",
    Item = "ITEM",
    List = "LIST",
    Location = "LOCATION",
    None = "NONE",
    Number = "NUMBER",
    Particle = "PARTICLE",
    Potion = "POTION",
    Projectile = "PROJECTILE",
    Sound = "SOUND",
    SpawnEgg = "SPAWN_EGG",
    Text = "TEXT",
    Variable = "VARIABLE",
    Vector = "VECTOR",
    Vehicle = "VEHICLE",
}

export enum LoadedItem {
    Arrow = "ARROW",
    Empty = "",
    FireworkRocket = "FIREWORK_ROCKET",
}

export enum RequiredRank {
    Dev = "Dev",
    Emperor = "Emperor",
    Empty = "",
    Mythic = "Mythic",
    Noble = "Noble",
    Overlord = "Overlord",
}