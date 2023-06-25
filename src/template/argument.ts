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