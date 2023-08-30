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
    abstract data: T;

    constructor(public readonly id: string, data: T) {
        if(typeof id != 'string') throw TypeError(`Item id must be a string, not ${typeof id}`)
        if(typeof data != 'object') throw TypeError(`Item data must be an object, not ${typeof data}`);
    }

    static parse(raw: unknown | Record<string, unknown>): ArgumentItem<Record<string, any>> {
        if (typeof raw != 'object' || !raw) throw TypeError(`Expected type of object, not ${typeof raw}`);
        if (!("id" in raw) || !("data" in raw) || typeof raw.id != "string" || typeof raw.data != "object" || !raw.id || !raw.data) throw TypeError("Invalid object");
        const i = raw.id;
        const d = raw.data;
        // ts doesn't like this as a switch/case, since g_val, item and bl_tag break the formality
        if(i == 'txt') return Named.from("txt", d);
        if(i == 'num') return Named.from("num", d);
        if(i == 'var') return Variable.from("var", d);
        if(i == 'loc') return Location.from(d);
        if(i == 'vec') return Vector.from(d);
        if(i == 'pot') return Potion.from(d);
        if(i == 'snd') return Sound.from(d);
        // if(i == 'part') return Particle.from(d);
        if(i == 'g_val') return GameValue.from(d);
        if(i == 'item') return MinecraftItem.from(d);
        if(i == 'bl_tag') return BlockTag.from(d);
        throw new TypeError(`Invalid id: ${i}`);
    }
}

type NamedArgItemID = "txt" | "num" | "var";

/**
 * Covers texts and numbers, and supersedes variables.
 */
export class Named extends ArgumentItem<{ name: string }> {
    constructor(id: NamedArgItemID, public data: { name: string }) {
        if(id != 'txt' && id != 'num' && id != 'var') throw new TypeError(`Named items only have ids of txt, num or var. Not ${id}`);
        if(typeof data.name != 'string') throw new TypeError(`Named items data.name must be a string, not ${typeof data.name}`);
        super(id, data);
    }

    static from(id: NamedArgItemID, data: object): Named {
        if (!("name" in data) || !data.name) throw new TypeError("Invalid named argument type");
        if (typeof data.name != "string") throw new TypeError("Invalid named argument type");
        //@ts-ignore // i have no clue what's going on
        return new Named(id, data);
    }
}

export type VariableScope = 'unsaved' | 'saved' | 'local'
export class Variable extends Named {
    constructor(public override data: {name: string, scope: VariableScope}) {
        if(data.scope != 'local' && data.scope != 'saved' && data.scope != 'unsaved') throw new TypeError(`Scope must be any of unsaved, saved and local. Not ${data.scope}`);
        super('var', data);
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
    constructor(public data: LocationItemData) {
        data.isBlock = data.isBlock ?? false;
        if(typeof data.isBlock != 'boolean') throw TypeError(`data.isBlock should be a boolean, not ${typeof data.isBlock}`);
        if(typeof data.loc.x != 'number') throw TypeError(`data.loc.x should be a number, not ${typeof data.loc.x}`);
        if(typeof data.loc.y != 'number') throw TypeError(`data.loc.y should be a number, not ${typeof data.loc.y}`);
        if(typeof data.loc.z != 'number') throw TypeError(`data.loc.z should be a number, not ${typeof data.loc.z}`);
        if(typeof data.loc.pitch != 'number' && typeof data.loc.pitch != 'undefined') throw TypeError(`data.loc.pitch should be a number or undefined, not a ${typeof data.loc.pitch}`);
        if(typeof data.loc.yaw != 'number' && typeof data.loc.yaw != 'undefined') throw TypeError(`data.loc.yaw should be a number or undefined, not a ${typeof data.loc.yaw}`);
        super('loc', data);
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
    constructor(public data: VectorItemData) {
        if(typeof data.x != 'number') throw TypeError(`data.x should be a number, not ${typeof data.x}`);
        if(typeof data.y != 'number') throw TypeError(`data.y should be a number, not ${typeof data.y}`);
        if(typeof data.z != 'number') throw TypeError(`data.z should be a number, not ${typeof data.z}`);
        super('vec', data);
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
    constructor(public data: PotionItemData ) {
        if(typeof data.pot != 'string') throw TypeError(`data.pot should be a string not ${typeof data.pot}`);
        if(typeof data.dur != 'number') throw TypeError(`data.dur should be a number not ${typeof data.dur}`);
        if(typeof data.amp != 'number') throw TypeError(`data.amp should be a number not ${typeof data.amp}`);
        super('pot', data);
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
    constructor(public data: SoundItemData) {
        if(typeof data.sound != 'string') throw TypeError(`data.sound should be a string not ${typeof data.sound}`);
        if(typeof data.pitch != 'number') throw TypeError(`data.pitch should be a number not ${typeof data.pitch}`);
        if(typeof data.vol != 'number') throw TypeError(`data.vol should be a number not ${typeof data.vol}`);
        super('snd',data);
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
    constructor(public data: GameValueItemData) {
        if(typeof data.type != 'string') throw TypeError(`data.type should be a string not ${typeof data.type}`)
        if(typeof data.target != 'string') throw TypeError(`data.target should be a string not ${typeof data.target}`)
        super('g_val', data)
    }

    static from(data: object): GameValue {
        if (!("type" in data) || !("target" in data)) throw TypeError("Invalid gamevalue argument type");
        if(typeof data.type != 'string') throw TypeError(`data.type should be a string not ${typeof data.type}`)
        if(typeof data.target != 'string') throw TypeError(`data.target should be a string not ${typeof data.target}`)
        //@ts-ignore // i have no clue what's going on
        return new GameValue(data);
    }
}

interface BlockTagItemData {option: string, tag: string, action: string, block: string}

export class BlockTag extends ArgumentItem<BlockTagItemData> {
    constructor(public data: BlockTagItemData) {
        if(typeof data.option != 'string') throw TypeError(`data.option should be a string not ${typeof data.option}`)
        if(typeof data.tag != 'string') throw TypeError(`data.tag should be a string not ${typeof data.tag}`)
        if(typeof data.action != 'string') throw TypeError(`data.action should be a string not ${typeof data.action}`)
        if(typeof data.block != 'string') throw TypeError(`data.block should be a string not ${typeof data.block}`)

        super('bl_tag',data)
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
    constructor(public data: MinecraftItemData) {
        if(typeof data.item != 'string') throw TypeError(`data.item should be a string not ${typeof data.item}`)
        super('item',data);
    }

    static from(data: object): MinecraftItem {
        if (!("item" in data)) throw new TypeError("Invalid minecraftitem argument type");
        if(typeof data.item != 'string') throw TypeError(`data.item should be a string not ${typeof data.item}`)
        //@ts-ignore // i have no clue what's going on
        return new MinecraftItem(data);
    }
}


export const Items = [Named, Variable, Location, Vector, Potion, Sound, GameValue, BlockTag, MinecraftItem] as const;
export type Item = typeof Items[number];