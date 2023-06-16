export class Arguments {
    items: Argument[];

    constructor(items : Argument[] = []) {
        this.items = items;
    }
}
// TODO: Do arguments
export default abstract class Argument {}