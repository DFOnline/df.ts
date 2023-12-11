import { z } from 'zod';
import { Values } from '..';

const ZColor = z.object({
    red: z.number(),
    green: z.number(),
    blue: z.number()
})
export function Color(data: any) {
    return {
        constructor: Color,
        ...ZColor.parse(data),
        toNumber() {
            return (this.red << 16) + (this.green << 8) + (this.blue);
        },
        /**
         * Doesn't include #.
         */
        toString() {
            return this.toNumber().toString(16).padStart(6,'0');
        }
    }
}
type Color = ReturnType<typeof Color>;

const ZIcon = z.object({
    material: z.string(),
    name: z.string(),
    deprecatedNote: z.array(z.string()),
    description: z.array(z.string()),
    example: z.array(z.string()),
    worksWith: z.array(z.string()),
    additionalInfo: z.array(z.array(z.string())),
    requiredRank: z.string(),
    requireTokens: z.boolean(),
    requireRankAndTokens: z.boolean(),
    advanced: z.boolean(),
    loadedItem: z.optional(z.any()),
    head: z.optional(z.string()),
    color: z.optional(ZColor),
})
export function Icon(data: any) {
    return {
        constructor: Icon,
        ...ZIcon.parse(data),
        isLegacy() {
            return this.material == 'STONE' && this.description.length == 0;
        },
        getColor(): Color|undefined {
            return this.color ? Color(this.color) : undefined;
        }
    }
}
export type Icon = ReturnType<typeof Icon>;

const ZCodeblock = z.object({
    name: z.string(),
    identifier: z.string(),
    /**
     * Use getItem()
     */
    item: ZIcon,
})
export function Codeblock(data: any) {
    return {
        constructor: Codeblock,
        ...ZCodeblock.parse(data),
        getItem() {
            return Icon(this.item);
        }
    }
}
type Codeblock = ReturnType<typeof Codeblock>

const ZActionDump = z.object({
    codeblocks: z.array(ZCodeblock),
    actions: z.array(z.any()),
})
export function Actiondump(data: any) {
    return {
        constructor: Actiondump,
        ...ZActionDump.parse(data),
        getCodeblock(ref: string | number): Codeblock | undefined {
            if (typeof ref == 'number') {
                return Codeblock(this.codeblocks[ref]);
            }
            if (typeof ref == 'string') {
                const find = this.codeblocks.find(cb => cb.name == ref || cb.identifier == ref);
                if(find == undefined) return undefined;
                return Codeblock(find);
            }
            return undefined;
        },
    }
}
// export class Icon {
//     TODO: these
//     @Type(() => Argument)
//     arguments?:               Argument[];
//     tags?:                    number;
//     cancellable?:             boolean;
//     cancelledAutomatically?:  boolean;
//     returnType?:              ValueType;
//     returnDescription?:       string[];
// }

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

// export type LoadedItem = Values<typeof LoadedItems>
// export const LoadedItems = {
//     Arrow: "ARROW",
//     Empty: "",
//     FireworkRocket: "FIREWORK_ROCKET",
// } as const

export type RequiredRank = Values<typeof RequiredRanks>
export const RequiredRanks =  {
    Empty: "",
    Noble: "Noble",
    Emperor: "Emperor",
    Mythic: "Mythic",
    Overlord: "Overlord",
    Dev: "Dev",
} as const