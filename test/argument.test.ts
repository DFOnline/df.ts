import Argument, { Item, Location, Named, Variable, Vector } from '../src/template/argument'

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
    describe("Abstract", () => {
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

    describe("Named", () => {
        test("Valid", () => {
            new Named('num',{name:'3592'})
            new Named('txt',{name:'hello'})
        })
        test("Bad id", () => {
            expect(() => new Named('invalid' as any,{name:'invalid'})).toThrowError()
        })
        test("Bad value", () => {
            expect(() => new Named('num',3592 as any)).toThrowError()
            expect(() => new Named('txt','hello' as any)).toThrowError()
        })

        describe("Variable", () => {
            test("Valid", () => {
                new Variable({name:'var',scope:'unsaved'})
                new Variable({name:'var',scope:'saved'})
                new Variable({name:'var',scope:'local'})
            })
            test("Invalid", () => {
                expect(() => new Variable({name:'var'} as any)).toThrowError()
                expect(() => new Variable({scope:'local'} as any)).toThrowError()
                expect(() => new Variable({name:'var',scope:'invalid'} as any)).toThrowError()
            })
        })
    })

    describe("Location", () => {
        test("Valid", () => {
            new Location({loc:{x:10,y:20,z:30,pitch:10,yaw:90}})
            new Location({isBlock:false, loc:{x:10,y:20,z:30,pitch:10,yaw:90}})
            new Location({isBlock:true, loc:{x:10,y:20,z:30}})
        })
    })

    describe("Vector", () => {
        test("Valid", () => {
            new Vector({x:1,y:-5,z:0.1})
        })
        test("Invalid",() => {
            expect(() => new Vector({y:1,z:1} as any)).toThrowError()
            expect(() => new Vector({x:1,z:1} as any)).toThrowError()
            expect(() => new Vector({x:1,y:1} as any)).toThrowError()
        })
    })
})