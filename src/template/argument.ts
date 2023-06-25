export class Arguments {
    items: Argument[];

    constructor(items : Argument[] = []) {
        this.items = items;
    }
}
// TODO: Do arguments
export default class Argument {
    item: Item
    slot: number

    constructor(item: Item, slot: number) {
        if(!(item instanceof Item)) throw TypeError("Item isn't an instance of an item.")
        if(slot < 0 || slot > 26) throw RangeError(`Slot index ${slot} is out of valid.`)
        this.item = item
        this.slot = slot
    }
}

export abstract class Item {
    id: string;
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
export class Named extends Item {
    constructor(id: 'txt' | 'num' | 'var', data: {name: string}) {
        if(id != 'txt' && id != 'num' && id != 'var') throw new TypeError(`Named items only have ids of txt, num or var. Not ${id}`);
        if(typeof data.name != 'string') throw new TypeError(`Named items data.name must be a string, not a ${typeof data.name}`);
        super(id,data);
    }
}

export type VariableScope = 'unsaved' | 'saved' | 'local'
export class Variable extends Named {
    constructor(data: {name: string, scope: VariableScope}) {
        if(data.scope != 'local' && data.scope != 'saved' && data.scope != 'unsaved') throw new TypeError(`Scope must be any of unsaved, saved and local. Not ${data.scope}`)
        super('var',data)
    }
}

export class Location extends Item {
    constructor(data: {
        /**
         * @deprecated Not used by DiamondFire
         */
        isBlock?: boolean,
        loc: {x: number,y: number,z: number,pitch?: number,yaw?: number}}) {
        data.isBlock = data.isBlock ?? false;
        if(typeof data.isBlock != 'boolean') throw TypeError(`data.isBlock should be a boolean, not a ${typeof data.isBlock}`)
        if(typeof data.loc.x != 'number') throw TypeError(`data.x should be a number, not a ${typeof data.loc.x}`)
        if(typeof data.loc.y != 'number') throw TypeError(`data.y should be a number, not a ${typeof data.loc.y}`)
        if(typeof data.loc.z != 'number') throw TypeError(`data.z should be a number, not a ${typeof data.loc.z}`)
        if(typeof data.loc.pitch != 'number' && typeof data.loc.pitch != 'undefined') throw TypeError(`data.pitch should be a number or undefiened, not a ${typeof data.loc.pitch}`)
        if(typeof data.loc.yaw != 'number' && typeof data.loc.yaw != 'undefined') throw TypeError(`data.yaw should be a number or undefiened, not a ${typeof data.loc.yaw}`)
        super('loc',data)
    }
}