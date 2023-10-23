export declare class Arguments {
    items: Argument[];
    constructor(items?: Argument[]);
    static parse(data: any): Arguments;
}
export default class Argument {
    item: ArgumentItem<Item>;
    slot: number;
    constructor(item: ArgumentItem<any>, slot: number);
    static parse(data: any): Argument;
}
export declare abstract class ArgumentItem<T extends Record<string, any>> {
    static readonly id: string;
    abstract readonly id: string;
    abstract data: T;
    constructor(data: T);
    static parse(raw: unknown | Record<string, unknown>): Item['prototype'];
}
interface GenericNamedItemData {
    name: string;
}
export declare class Text extends ArgumentItem<GenericNamedItemData> {
    data: {
        name: string;
    };
    static readonly id = "txt";
    readonly id = "txt";
    constructor(data: {
        name: string;
    });
    static from(data: any): Text;
}
export declare class Number extends ArgumentItem<GenericNamedItemData> {
    data: {
        name: string;
    };
    static readonly id = "num";
    readonly id = "num";
    constructor(data: {
        name: string;
    });
    static from(data: any): Number;
}
export declare class Component extends ArgumentItem<GenericNamedItemData> {
    data: {
        name: string;
    };
    static readonly id = "comp";
    readonly id = "comp";
    constructor(data: {
        name: string;
    });
    static from(data: any): Component;
}
interface VariableItemData extends GenericNamedItemData {
    scope: VariableScope;
}
export declare const VariableScopes: readonly ["unsaved", "saved", "local", "line"];
export type VariableScope = typeof VariableScopes[number];
export declare class Variable extends ArgumentItem<VariableItemData> {
    data: VariableItemData;
    static readonly id = "var";
    readonly id = "var";
    constructor(data: VariableItemData);
    static from(data: object): Variable;
}
interface LocationItemData {
    /**
     * @deprecated Not used by DiamondFire
     * @description When a location explicitly has no pitch and yaw.
     *              In-game it should hide pitch and yaw values
     */
    isBlock?: boolean;
    /**
     * @description Location
     */
    loc: {
        x: number;
        y: number;
        z: number;
        pitch?: number;
        yaw?: number;
    };
}
export declare class Location extends ArgumentItem<LocationItemData> {
    data: LocationItemData;
    static readonly id = "loc";
    readonly id = "loc";
    constructor(data: LocationItemData);
    static from(data: object): Location;
}
interface VectorItemData {
    x: number;
    y: number;
    z: number;
}
export declare class Vector extends ArgumentItem<VectorItemData> {
    data: VectorItemData;
    static readonly id = "vec";
    readonly id = "vec";
    constructor(data: VectorItemData);
    static from(data: object): Vector;
}
interface PotionItemData {
    /**
     * Potion
     * @description English name used in the item display
     */
    pot: string;
    /**
     * Duration
     * @description Duration in ticks
     */
    dur: number;
    /**
     * Amplifier
     * @description The potion level/strength
     */
    amp: number;
}
export declare class Potion extends ArgumentItem<PotionItemData> {
    data: PotionItemData;
    static readonly id = "pot";
    readonly id = "pot";
    constructor(data: PotionItemData);
    static from(data: object): Potion;
}
interface SoundItemData {
    /**
     * @description English name used in the item display
     */
    sound: string;
    /**
     * @description From 0 to 2, with minecraft only using 0.5 to 2
     */
    pitch: number;
    vol: number;
}
export declare class Sound extends ArgumentItem<SoundItemData> {
    data: SoundItemData;
    static readonly id = "snd";
    readonly id = "snd";
    constructor(data: SoundItemData);
    static from(data: object): Sound;
}
export declare const GameValueTargets: readonly ["Selection", "Default", "Killer", "Damager", "Victim", "Shooter", "Projectile", "LastEntity"];
type GameValueTarget = typeof GameValueTargets[number];
interface GameValueItemData {
    type: string;
    target: GameValueTarget;
}
export declare class GameValue extends ArgumentItem<GameValueItemData> {
    data: GameValueItemData;
    static readonly id = "g_val";
    readonly id = "g_val";
    constructor(data: GameValueItemData);
    static from(data: object): GameValue;
}
declare const ParameterType: readonly ["txt", "comp", "num", "loc", "vec", "snd", "part", "pot", "item", "any", "var", "list", "dict"];
type ParamaterTypeType = typeof ParameterType[number];
interface ParameterItemData {
    name: string;
    type: ParamaterTypeType;
    default_value: ArgumentItem<any>;
    plural: boolean;
    optional: boolean;
    note?: string;
    description?: string;
}
export declare class Parameter extends ArgumentItem<ParameterItemData> {
    data: ParameterItemData;
    /** Short for `pattern_element`. Parameters, each bullet in a actions Chest Parameters is a pattern internally. Apparently. */
    static readonly id = "pn_el";
    readonly id = "pn_el";
    constructor(data: ParameterItemData);
    static from(data: object): Parameter;
}
interface BlockTagItemData {
    option: string;
    tag: string;
    action: string;
    block: string;
}
export declare class BlockTag extends ArgumentItem<BlockTagItemData> {
    data: BlockTagItemData;
    static readonly id = "bl_tag";
    readonly id = "bl_tag";
    constructor(data: BlockTagItemData);
    static from(data: object): BlockTag;
}
interface MinecraftItemData {
    /**
     * https://www.npmjs.com/package/nbt-ts
     * @description SNBT data.
     *              This is the same format as the `/i nbt` or `/data` commands.
     * @note This is *NOT JSON*
     */
    item: string;
}
export declare class MinecraftItem extends ArgumentItem<MinecraftItemData> {
    data: MinecraftItemData;
    static readonly id = "item";
    readonly id = "item";
    constructor(data: MinecraftItemData);
    static from(data: object): MinecraftItem;
}
declare const HintIDs: readonly ["function"];
type HintID = typeof HintIDs[number];
interface HintData {
    "id": HintID;
}
export declare class Hint extends ArgumentItem<HintData> {
    data: HintData;
    static readonly id = "hint";
    readonly id = "hint";
    constructor(data: HintData);
    static from(data: object): Hint;
}
export declare const Items: readonly [typeof Text, typeof Component, typeof Number, typeof Variable, typeof Location, typeof Vector, typeof Potion, typeof Sound, typeof GameValue, typeof BlockTag, typeof MinecraftItem, typeof Parameter, typeof Hint];
export type Item = typeof Items[number];
export type ItemByID = {
    [K in Item["prototype"]["id"]]: Extract<Item, {
        id: K;
    }>;
};
export declare const ItemsByID: ItemByID;
export {};
