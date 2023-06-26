export class Arguments {
    items: Argument[];

    constructor(items : Argument[] = []) {
        this.items = items;
    }
}
// TODO: Do arguments
export default class Argument {
    item: ArgumentItem
    slot: number

    constructor(item: ArgumentItem, slot: number) {
        if(!(item instanceof ArgumentItem)) throw TypeError("Item isn't an instance of an item.")
        if(slot < 0 || slot > 26) throw RangeError(`Slot index ${slot} is out of valid.`)
        this.item = item
        this.slot = slot
    }
}

export abstract class ArgumentItem {
    readonly id: string;
    data: any;

    constructor(id: string, data: any) {
        this.id = id;
        if(typeof id != 'string') throw TypeError(`Item id must be a string, not ${typeof id}`)
        if(typeof data != 'object') throw TypeError(`Item data must be an object, not ${typeof data}`);
    }
}

/**
 * Covers texts and numbers, and supersedes variables.
 */
export class Named extends ArgumentItem {
    constructor(id: 'txt' | 'num' | 'var', data: {name: string}) {
        if(id != 'txt' && id != 'num' && id != 'var') throw new TypeError(`Named items only have ids of txt, num or var. Not ${id}`);
        if(typeof data.name != 'string') throw new TypeError(`Named items data.name must be a string, not a ${typeof data.name}`);
        super(id,data);
    }
}

export type VariableScope = 'unsaved' | 'saved' | 'local'
export class Variable extends Named {
    constructor(data: {name: string, scope: VariableScope}) {
        if(data.scope != 'local' && data.scope != 'saved' && data.scope != 'unsaved') throw new TypeError(`Scope must be any of unsaved, saved and local. Not ${data.scope}`);
        super('var',data);
    }
}

export class Location extends ArgumentItem {
    constructor(data: {
        /**
         * @deprecated Not used by DiamondFire
         * @description When a location explicitly has no pitch and yaw.  
         *              In-game it should hide pitch and yaw values
         */
        isBlock?: boolean,
        /**
         * Location
         */
        loc: {x: number,y: number,z: number,pitch?: number,yaw?: number}}) {
        data.isBlock = data.isBlock ?? false;
        if(typeof data.isBlock != 'boolean') throw TypeError(`data.isBlock should be a boolean, not a ${typeof data.isBlock}`);
        if(typeof data.loc.x != 'number') throw TypeError(`data.loc.x should be a number, not a ${typeof data.loc.x}`);
        if(typeof data.loc.y != 'number') throw TypeError(`data.loc.y should be a number, not a ${typeof data.loc.y}`);
        if(typeof data.loc.z != 'number') throw TypeError(`data.loc.z should be a number, not a ${typeof data.loc.z}`);
        if(typeof data.loc.pitch != 'number' && typeof data.loc.pitch != 'undefined') throw TypeError(`data.loc.pitch should be a number or undefined, not a ${typeof data.loc.pitch}`);
        if(typeof data.loc.yaw != 'number' && typeof data.loc.yaw != 'undefined') throw TypeError(`data.loc.yaw should be a number or undefined, not a ${typeof data.loc.yaw}`);
        super('loc',data);
    }
}

export class Vector extends ArgumentItem {
    constructor(data: {x: number, y: number, z: number}) {
        if(typeof data.x != 'number') throw TypeError(`data.x should be a number, not a ${typeof data.x}`);
        if(typeof data.y != 'number') throw TypeError(`data.y should be a number, not a ${typeof data.y}`);
        if(typeof data.z != 'number') throw TypeError(`data.z should be a number, not a ${typeof data.z}`);
        super('vec',data);
    }
}

export class Potion extends ArgumentItem {
    constructor(data: {
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
        amp: number}) {
            if(typeof data.pot != 'string') throw TypeError(`data.pot should be a string not a ${typeof data.pot}`);
            if(typeof data.dur != 'number') throw TypeError(`data.dur should be a number not a ${typeof data.dur}`);
            if(typeof data.amp != 'number') throw TypeError(`data.amp should be a number not a ${typeof data.amp}`);
            super('pot',data);
        }
}

export class Sound extends ArgumentItem {
    constructor(data: {
        /**
         * @description English name used in the item display
         */
        sound: string,
        /**
         * @description From 0 to 2, with minecraft only using 0.5 to 2
         */
        pitch: number,
        vol: number,
    }) {
        if(typeof data.sound != 'string') throw TypeError(`data.sound should be a string not a ${typeof data.sound}`);
        if(typeof data.pitch != 'number') throw TypeError(`data.pitch should be a number not a ${typeof data.pitch}`);
        if(typeof data.vol != 'number') throw TypeError(`data.vol should be a number not a ${typeof data.vol}`);
        super('snd',data);
    }
}

// TODO: Particles, keep in mind https://gist.github.com/tk2217/1dbbb24aa69e54bdb2574aedb7e71e53

export class GameValue extends ArgumentItem {
    constructor(data: {
        type: string,
        target?: string,
    }) {
        if(typeof data.type != 'string') throw TypeError(`data.type should be a string not a ${typeof data.type}`)
        if(typeof data.target != 'string') throw TypeError(`data.target should be a string not a ${typeof data.target}`)
        super('g_val',data)
    }
}

export class BlockTag extends ArgumentItem {
    constructor(data: {option: string, tag: string, action: string, block: string}) {
        if(typeof data.option != 'string') throw TypeError(`data.option should be a string not a ${typeof data.option}`)
        if(typeof data.tag != 'string') throw TypeError(`data.tag should be a string not a ${typeof data.tag}`)
        if(typeof data.action != 'string') throw TypeError(`data.action should be a string not a ${typeof data.action}`)
        if(typeof data.block != 'string') throw TypeError(`data.block should be a string not a ${typeof data.block}`)

        super('bl_tag',data)
    }
}

export class MinecraftItem extends ArgumentItem {
    constructor(data: {
    /**
     * https://www.npmjs.com/package/nbt-ts
     * @description SNBT data.
     *              This is the same format as the `/i nbt` or `/data` commands.
     *              This is *NOT JSON*
     */
    item: string}) {
        if(typeof data.item != 'string') throw TypeError(`data.item should be a string not a ${typeof data.item}`)
        super('item',data);
    }
}