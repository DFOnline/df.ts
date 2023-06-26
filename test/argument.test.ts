import Argument, { ArgumentItem, BlockTag, GameValue, Location, MinecraftItem, Named, Potion, Sound, Variable, Vector } from '../src/template/argument'

class DummyItem extends ArgumentItem {
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

class TestItem extends ArgumentItem {
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

    describe("Potion", () => {
        test("Valid", () => {
            new Potion({pot: "potion", dur: 100000, amp: 4})
        })
        test("Invalid", () => {
            //@ts-ignore
            expect(() => new Potion({dur: 100000, amp: 4})).toThrowError()
            //@ts-ignore
            expect(() => new Potion({pot: "potion", amp: 4})).toThrowError()
            //@ts-ignore
            expect(() => new Potion({pot: "potion", dur: 100000})).toThrowError()
        })
    })

    describe("Sound", () => {
        test("Valid", () => {
            new Sound({sound:"sound",pitch:1,vol:2})
        })
        test("Invalid", () => {
            //@ts-ignore
            expect(() => new Sound({pitch:1,vol:2})).toThrowError()
            //@ts-ignore
            expect(() => new Sound({sound:"sound",vol:2})).toThrowError()
            //@ts-ignore
            expect(() => new Sound({sound:"sound",pitch:1})).toThrowError()
        })
    })

    describe("Game Value", () => {
        test("Valid", () => {
            new GameValue({type:'game value',target:'default'})
        })
        test("Invalid", () => {
            //@ts-ignore
            expect(() => new GameValue({type: 'game value'}))
            //@ts-ignore
            expect(() => new GameValue({target:'default'}))
        })
    })

    describe("Block Tag", () => {
        test("Valid", () => {
            new BlockTag({option: "option", tag: "tag", action: "action", block: "block"})
        })
        test("Invalid", () => {
            //@ts-ignore
            expect(() => new BlockTag({tag: "tag", action: "action", block: "block"})).toThrowError()
            //@ts-ignore
            expect(() => new BlockTag({option: "option", action: "action", block: "block"})).toThrowError()
            //@ts-ignore
            expect(() => new BlockTag({option: "option", tag: "tag", block: "block"})).toThrowError()
            //@ts-ignore
            expect(() => new BlockTag({option: "option", tag: "tag", action: "action"})).toThrowError()

        })
    })

    describe("Minecraft Item", () => {
        test("Valid", () => {
            new MinecraftItem({item:"{Count:1b}"})
        })
        test("Invalid", () => {
            //@ts-ignore
            expect(() => new MinecraftItem({})).toThrowError()
            //@ts-ignore
            expect(() => new MinecraftItem({item:{Count:1}})).toThrowError()
        })
    })
})