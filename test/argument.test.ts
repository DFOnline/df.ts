import Argument, { Item, Named } from '../src/template/argument'

class DummyItem extends Item {
    constructor() {
        super('test',{})
    }
}

describe("Argument", () => {
    describe("Constructor", () => {
        test("Valid", () => {
            new Argument(new DummyItem(), 0)
            new Argument(new DummyItem(), 1)
            new Argument(new DummyItem(), 5)
            new Argument(new DummyItem(), 20)
            new Argument(new DummyItem(), 26)
        })
        test("Out of range", () => {
            expect(() => new Argument(new DummyItem(), -1)).toThrowError()
            expect(() => new Argument(new DummyItem(), 27)).toThrowError()
        })
        test("Not items", () => {
            expect(() => new Argument({} as any, 0)).toThrowError()
        })
    })
})

class TestItem extends Item {
    constructor(id: string, data: any) {
        super(id, data)
    } 
}

describe("Item",() => {
    describe("Constructor", () => {
        describe("Valid", () => {
            new TestItem('test',{})
            new TestItem('test',{'key':'value'})
        })
        describe("Bad id", () => {
            expect(() => new TestItem(null as any,{})).toThrowError()
            expect(() => new TestItem(new String() as any,{})).toThrowError()
            expect(() => new TestItem({} as any,{})).toThrowError()
        })
        describe("Bad data", () => {
            //@ts-ignore
            expect(() => new TestItem('test')).toThrowError()
            // expect(() => new TestItem('test',null)).toThrowError()
            expect(() => new TestItem('test','{"key":"value"')).toThrowError()
        })
    })
})