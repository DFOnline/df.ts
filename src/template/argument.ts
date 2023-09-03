export class Arguments {
    items: Argument[];

    constructor(items: Argument[] = []) {
        this.items = items;
    }

    static parse(data: any) {
        if(typeof data != 'object') throw TypeError(`data should be an object, not a ${typeof data}`);
        if(!(data.items instanceof Array)) throw TypeError("data.items should be an Array");
        return new Arguments(data.items.map((i : any) => Argument.parse(i)));
    }
}

export default class Argument {
    item: ArgumentItem<Item>;
    slot: number;

    constructor(item: ArgumentItem<any>, slot: number) {
        if(!(item instanceof ArgumentItem)) throw TypeError("Item isn't an instance of an item.");
        if(slot < 0 || slot > 26) throw RangeError(`Slot index ${slot} is out of valid.`);
        this.item = item;
        this.slot = slot;
    }

    static parse(data: any): Argument {
        return new Argument(ArgumentItem.parse(data.item), data.slot);
    }
}
export abstract class ArgumentItem<T extends Record<string, any>> {
    static readonly id: string;
    abstract readonly id: string;
    abstract data: T;

    constructor(data: T) {
        if(typeof data != 'object') throw TypeError(`Item data must be an object, not ${typeof data}`);
    }


    static parse(raw: unknown | Record<string, unknown>): Item['prototype'] {
        if (typeof raw != 'object' || !raw) throw TypeError(`Expected type of object, not ${typeof raw}`);
        if (!("id" in raw) || !("data" in raw) || typeof raw.id != "string" || typeof raw.data != "object" || !raw.id || !raw.data) throw TypeError("Invalid object");
        const i = raw.id;
        const d = raw.data;
        if(!(i in ItemsByID)) throw new TypeError(`Invalid id: ${i}`);
        return new ItemsByID[i as Item['prototype']['id']](d as any);
    }
}

interface GenericNamedItemData {
    name: string;
}
export class Text extends ArgumentItem<GenericNamedItemData> {
    static override readonly id = "txt";
    readonly id = Text.id;

    constructor(public data: { name: string }) {
        if(typeof data.name != 'string') throw new TypeError(`data.name must be a string, not ${typeof data.name}`);
        super(data);
    }

    static from(data: any): Text {
        return new Text(data);
    }
}
export class Number extends ArgumentItem<GenericNamedItemData> {
    static override readonly id = "num";
    readonly id = Number.id;

    constructor(public data: { name: string }) {
        if(typeof data.name != 'string') throw new TypeError(`data.name must be a string, not ${typeof data.name}`);
        super(data);
    }

    static from(data: any): Number {
        return new Number(data);
    }
}
export class Component extends ArgumentItem<GenericNamedItemData> {
    static override readonly id = "comp";
    readonly id = Component.id;

    constructor(public data: { name: string }) {
        if(typeof data.name != 'string') throw new TypeError(`data.name must be a string, not ${typeof data.name}`);
        super(data);
    }

    static from(data: any): Component {
        return new Component(data);
    }
}

interface VariableItemData extends GenericNamedItemData {
    scope: VariableScope
}
export const VariableScopes = ['unsaved', 'saved', 'local', 'line'] as const
export type VariableScope = typeof VariableScopes[number]
export class Variable extends ArgumentItem<VariableItemData> {
    static override readonly id = "var"
    readonly id = Variable.id;

    constructor(public override data: VariableItemData) {
        if(typeof data.name != 'string') throw new TypeError(`data.name must be a string, not ${typeof data.name}`);
        if(!VariableScopes.includes(data.scope)) throw new TypeError(`Scope must be any of unsaved, saved and local. Not ${data.scope}`);
        super(data);
    }

    static from(data: object) : Variable {
        return new Variable(data as any);
    }
}

interface LocationItemData {
    /**
     * @deprecated Not used by DiamondFire
     * @description When a location explicitly has no pitch and yaw.  
     *              In-game it should hide pitch and yaw values
     */
   isBlock?: boolean,
    /**
     * @description Location
     */
   loc: {x: number,y: number,z: number,pitch?: number,yaw?: number}
}

export class Location extends ArgumentItem<LocationItemData> {
    static override readonly id = "loc";
    readonly id = Location.id;

    constructor(public data: LocationItemData) {
        data.isBlock = data.isBlock ?? false;
        if(typeof data.isBlock != 'boolean') throw TypeError(`data.isBlock should be a boolean, not ${typeof data.isBlock}`);
        if(typeof data.loc.x != 'number') throw TypeError(`data.loc.x should be a number, not ${typeof data.loc.x}`);
        if(typeof data.loc.y != 'number') throw TypeError(`data.loc.y should be a number, not ${typeof data.loc.y}`);
        if(typeof data.loc.z != 'number') throw TypeError(`data.loc.z should be a number, not ${typeof data.loc.z}`);
        if(typeof data.loc.pitch != 'number' && typeof data.loc.pitch != 'undefined') throw TypeError(`data.loc.pitch should be a number or undefined, not a ${typeof data.loc.pitch}`);
        if(typeof data.loc.yaw != 'number' && typeof data.loc.yaw != 'undefined') throw TypeError(`data.loc.yaw should be a number or undefined, not a ${typeof data.loc.yaw}`);
        super(data);
    }

    static from(data: object): Location {
        if (!("loc" in data) || typeof data.loc != "object" || !data.loc) throw new TypeError("Invalid location argument type");
        if (!("x" in data.loc) || !("y" in data.loc) || !("z" in data.loc) || !("pitch" in data.loc) || !("yaw" in data.loc)) throw new TypeError("Invalid location argument type");
        if(typeof data.loc.x != 'number') throw TypeError(`data.loc.x should be a number, not ${typeof data.loc.x}`);
        if(typeof data.loc.y != 'number') throw TypeError(`data.loc.y should be a number, not ${typeof data.loc.y}`);
        if(typeof data.loc.z != 'number') throw TypeError(`data.loc.z should be a number, not ${typeof data.loc.z}`);
        if(typeof data.loc.pitch != 'number' && typeof data.loc.pitch != 'undefined') throw TypeError(`data.loc.pitch should be a number or undefined, not a ${typeof data.loc.pitch}`);
        if(typeof data.loc.yaw != 'number' && typeof data.loc.yaw != 'undefined') throw TypeError(`data.loc.yaw should be a number or undefined, not a ${typeof data.loc.yaw}`);
        //@ts-ignore // i have no clue what's going on
        return new Location(data);
    }
}

interface VectorItemData { x: number, y: number, z: number }

export class Vector extends ArgumentItem<VectorItemData> {
    static override readonly id = "vec";
    readonly id = Vector.id;

    constructor(public data: VectorItemData) {
        if(typeof data.x != 'number') throw TypeError(`data.x should be a number, not ${typeof data.x}`);
        if(typeof data.y != 'number') throw TypeError(`data.y should be a number, not ${typeof data.y}`);
        if(typeof data.z != 'number') throw TypeError(`data.z should be a number, not ${typeof data.z}`);
        super(data);
    }

    static from(data: object): Vector {
        if (!("x" in data) || !("y" in data) || !("z" in data)) throw new TypeError("Invalid vector argument type");
        if(typeof data.x != 'number') throw TypeError(`data.x should be a number, not ${typeof data.x}`);
        if(typeof data.y != 'number') throw TypeError(`data.y should be a number, not ${typeof data.y}`);
        if(typeof data.z != 'number') throw TypeError(`data.z should be a number, not ${typeof data.z}`);
        //@ts-ignore // i have no clue what's going on
        return new Vector(data);
    }
}

interface PotionItemData {
    /** 
     * Potion
     * @description English name used in the item display
     */
    pot: string, 
    /**
     * Duration
     * @description Duration in ticks
     */
    dur: number,
    /**
     * Amplifier
     * @description The potion level/strength
     */
    amp: number
}

export class Potion extends ArgumentItem<PotionItemData> {
    static override readonly id = "pot";
    readonly id = Potion.id;

    constructor(public data: PotionItemData ) {
        if(typeof data.pot != 'string') throw TypeError(`data.pot should be a string not ${typeof data.pot}`);
        if(typeof data.dur != 'number') throw TypeError(`data.dur should be a number not ${typeof data.dur}`);
        if(typeof data.amp != 'number') throw TypeError(`data.amp should be a number not ${typeof data.amp}`);
        super(data);
    }

    static from(data: object): Potion {
        if (!("pot" in data) || !("dur" in data) || !("amp" in data)) throw new TypeError("Invalid potion argument type");
        if(typeof data.pot != 'string') throw TypeError(`data.pot should be a string not ${typeof data.pot}`);
        if(typeof data.dur != 'number') throw TypeError(`data.dur should be a number not ${typeof data.dur}`);
        if(typeof data.amp != 'number') throw TypeError(`data.amp should be a number not ${typeof data.amp}`);
        //@ts-ignore // i have no clue what's going on
        return new Potion(data);
    }
}

interface SoundItemData {
    /**
     * @description English name used in the item display
     */
    sound: string,
    /**
     * @description From 0 to 2, with minecraft only using 0.5 to 2
     */
    pitch: number,
    vol: number,
}

export class Sound extends ArgumentItem<SoundItemData> {
    static override readonly id = "snd";
    readonly id = Sound.id;

    constructor(public data: SoundItemData) {
        if(typeof data.sound != 'string') throw TypeError(`data.sound should be a string not ${typeof data.sound}`);
        if(typeof data.pitch != 'number') throw TypeError(`data.pitch should be a number not ${typeof data.pitch}`);
        if(typeof data.vol != 'number') throw TypeError(`data.vol should be a number not ${typeof data.vol}`);
        super(data);
    }

    static from(data: object): Sound {
        if (!("sound" in data) || !("pitch" in data) || !("vol" in data)) throw new TypeError("Invalid potion argument type");
        if(typeof data.sound != 'string') throw TypeError(`data.sound should be a string not ${typeof data.sound}`);
        if(typeof data.pitch != 'number') throw TypeError(`data.pitch should be a number not ${typeof data.pitch}`);
        if(typeof data.vol != 'number') throw TypeError(`data.vol should be a number not ${typeof data.vol}`);
        //@ts-ignore // i have no clue what's going on
        return new Sound(data);
    }
}

// TODO: Particles, keep in mind https://gist.github.com/tk2217/1dbbb24aa69e54bdb2574aedb7e71e53

interface GameValueItemData {
    type: string,
    target?: string
}

export class GameValue extends ArgumentItem<GameValueItemData> {
    static override readonly id = "g_val";
    readonly id = GameValue.id;

    constructor(public data: GameValueItemData) {
        if(typeof data.type != 'string') throw TypeError(`data.type should be a string not ${typeof data.type}`)
        if(typeof data.target != 'string') throw TypeError(`data.target should be a string not ${typeof data.target}`)
        super(data)
    }

    static from(data: object): GameValue {
        if (!("type" in data) || !("target" in data)) throw TypeError("Invalid gamevalue argument type");
        if(typeof data.type != 'string') throw TypeError(`data.type should be a string not ${typeof data.type}`)
        if(typeof data.target != 'string') throw TypeError(`data.target should be a string not ${typeof data.target}`)
        //@ts-ignore // i have no clue what's going on
        return new GameValue(data);
    }
}

const ParameterType = ['txt','comp','num','loc','vec','snd','part','pot','item','any','var','list','dict'] as const;
type ParamaterTypeType = typeof ParameterType[number];
interface ParameterItemData {
    name: string,
    type: ParamaterTypeType,
    default_value: ArgumentItem<any>,
    plural: boolean,
    optional: boolean,
    note?: string,
    description?: string,
}

export class Parameter extends ArgumentItem<ParameterItemData> {
    /** Short for `pattern_element`. Parameters, each bullet in a actions Chest Parameters is a pattern internally. Apparently. */
    static override readonly id = "pn_el";
    readonly id = Parameter.id;

    constructor(public data: ParameterItemData) {
        if(typeof data.name != 'string') throw TypeError(`data.name should be a string not ${typeof data.name}`)
        if(!ParameterType.includes(data.type)) throw TypeError(`data.type is ${data.type} instead of any valid ${ParameterType.join(', ')}.`)
        if(typeof data.plural != 'boolean') throw TypeError(`data.plural should be a boolean not ${typeof data.plural}`)
        if(typeof data.optional != 'boolean') throw TypeError(`data.optional should be a boolean not ${typeof data.optional}`)
        if(data.note && typeof data.note != 'string') throw TypeError(`data.note should be unset or a string not ${typeof data.note}`)
        if(data.description && typeof data.description != 'string') throw TypeError(`data.description should be unset or a string not ${typeof data.description}`)
        if(data.default_value) {
            if(!data.optional) throw TypeError(`There shouldn't be a default value on non-optional parameters`)
            if(data.plural) throw TypeError(`There can't be default values on plural parameters`)
            if(data.type == 'var' || data.type == 'list' || data.type == 'dict') throw TypeError(`Parameters with type ${data.type} cannot have default values`)
        }
        super(data);
        if(this.data.default_value != null) this.data.default_value = ArgumentItem.parse(this.data.default_value);
    }

    static from(data: object): Parameter {
        return new Parameter(data as any); // haven't I done these checks already?
    }
}

interface BlockTagItemData {option: string, tag: string, action: string, block: string}

export class BlockTag extends ArgumentItem<BlockTagItemData> {
    static override readonly id = "bl_tag";
    readonly id = BlockTag.id;

    constructor(public data: BlockTagItemData) {
        if(typeof data.option != 'string') throw TypeError(`data.option should be a string not ${typeof data.option}`)
        if(typeof data.tag != 'string') throw TypeError(`data.tag should be a string not ${typeof data.tag}`)
        if(typeof data.action != 'string') throw TypeError(`data.action should be a string not ${typeof data.action}`)
        if(typeof data.block != 'string') throw TypeError(`data.block should be a string not ${typeof data.block}`)

        super(data)
    }

    static from(data: object): BlockTag {
        if (!("option" in data) || !("tag" in data) || !("action" in data) || !("block" in data)) throw new TypeError("Invalid blocktag argument type");
        if(typeof data.option != 'string') throw TypeError(`data.option should be a string not ${typeof data.option}`)
        if(typeof data.tag != 'string') throw TypeError(`data.tag should be a string not ${typeof data.tag}`)
        if(typeof data.action != 'string') throw TypeError(`data.action should be a string not ${typeof data.action}`)
        if(typeof data.block != 'string') throw TypeError(`data.block should be a string not ${typeof data.block}`)
        //@ts-ignore // i have no clue what's going on
        return new BlockTag(data);
    }
}

interface MinecraftItemData {
    /**
     * https://www.npmjs.com/package/nbt-ts
     * @description SNBT data.
     *              This is the same format as the `/i nbt` or `/data` commands.
     * @note This is *NOT JSON*
     */
    item: string
}

export class MinecraftItem extends ArgumentItem<MinecraftItemData> {
    static override readonly id = "item";
    readonly id = MinecraftItem.id;

    constructor(public data: MinecraftItemData) {
        if(typeof data.item != 'string') throw TypeError(`data.item should be a string not ${typeof data.item}`)
        super(data);
    }

    static from(data: object): MinecraftItem {
        if (!("item" in data)) throw new TypeError("Invalid minecraftitem argument type");
        if(typeof data.item != 'string') throw TypeError(`data.item should be a string not ${typeof data.item}`)
        //@ts-ignore // i have no clue what's going on
        return new MinecraftItem(data);
    }
}

const HintIDs = ['function'] as const
type HintID = typeof HintIDs[number]
interface HintData {"id":HintID}
export class Hint extends ArgumentItem<HintData> {
    static override readonly id = "hint";
    readonly id = Hint.id;

    constructor(public data: HintData) {
        if(!HintIDs.includes(data.id)) throw TypeError(`Hint id cannot be ${data.id} it needs to be any of ${HintIDs}`)
        super(data);
    }

    static from(data: object): Hint {
        return new Hint(data as any);
    }
}


export const Items = [Text, Component, Number, Variable, Location, Vector, Potion, Sound, GameValue, BlockTag, MinecraftItem, Parameter, Hint] as const;
export type Item = typeof Items[number];
export type ItemByID = {[K in Item["prototype"]["id"]]: Extract<Item, { id: K }>;};
export const ItemsByID = Object.fromEntries(Items.map(i => [i.id,i] as const)) as ItemByID;