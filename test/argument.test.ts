import Argument, { ArgumentItem, Arguments, BlockTag, GameValue, Location, MinecraftItem, Potion, Sound, Text, Variable, Vector } from '../src/template/argument'

class DummyItem extends ArgumentItem<{}> {
    id : any;

    data = {} // "data" is abstract so the type is determined by ArgumentItem class.
    constructor() {
        super({})
    }
}

describe("Arguments", () => {
    test("Parsing", () => {
        console.time('Parsing')
        Arguments.parse({items: new Array(100000).fill([
            {slot:0,item:{id:"txt",data:{name:"text"}}},
            {slot:1,item:{id:"num",data:{name:"0"}}},
            {slot:2,item:{id:"var",data:{name:"var",scope:"local"}}},
            {slot:3,item:{id:"loc",data:{isBlock:false,loc:{x:1,y:2,z:3,pitch:90,yaw:-20}}}},
            {slot:4,item:{id:"vec",data:{x:1,y:2,z:3}}},
            {slot:5,item:{id:"pot",data:{pot: "potion", dur: 100000, amp: 4}}},
            {slot:6,item:{id:"snd",data:{sound:"sound",pitch:1,vol:2}}},
            {slot:7,item:{id:"g_val",data:{type:'game value',target:'default'}}},
            {slot:8,item:{id:"bl_tag",data:{option: "option", tag: "tag", action: "action", block: "block"}}},
            {slot:9,item:{id:"item",data:{item:"{Count:1b}"}}},
            {slot:10,item:{id:"comp",data:{name:"<green>component"}}},
            {slot:11,item:{id:"hint",data:{id:"function"}}},
            {slot:12,item:{id:"pn_el",data:{name:"name",type:"any",default_value:{"id":"num","data":{"name":"0"}},plural:false,optional:true}}},
            {slot:13,item:{id:"pn_el",data:{name:"name",type:"var",plural:true,optional:false}}},
            {slot:14,item:{id:"pn_el",data:{name:"name",type:"dict",plural:true,optional:true}}},
            {slot:15,item:{id:"pn_el",data:{name:"name",type:"list",plural:false,optional:false}}},
            {slot:16,item:{id:"pn_el",data:{name:"name",type:"vec",plural:false,optional:false,description:"hi&ahi<green>hi",note:"&ahi<green>hi"}}},
        ]).flat()})
    })
})

describe("Argument", () => {
    describe("Constructor", () => {
        test("Valid", () => {
            new Argument(new DummyItem(), 0);
            new Argument(new DummyItem(), 1);
            new Argument(new DummyItem(), 5);
            new Argument(new DummyItem(), 20);
            new Argument(new DummyItem(), 26);
        })
        test("Out of range", () => {
            expect(() => new Argument(new DummyItem(), -1)).toThrowError();
            expect(() => new Argument(new DummyItem(), 27)).toThrowError();
        })
        test("Not items", () => {
            expect(() => new Argument({} as any, 0)).toThrowError();
        })
    })
})

class TestItem extends ArgumentItem<any> {
    id = "test" as const;

    data: any; // "data implicitly has any type" shur up typescript
    constructor(data: any) {
        super(data);
    }
}

describe("Item",() => {
    describe("Abstract", () => {
        describe("Valid", () => {
            new TestItem({});
            new TestItem({'key':'value'});
        });
        describe("Bad data", () => {
            //@ts-ignore // why
            expect(() => new TestItem()).toThrowError();
            // expect(() => new TestItem('test',null)).toThrowError()
            expect(() => new TestItem('{"key":"value"')).toThrowError();
        });
    });

    describe("Named", () => {
        test("Valid", () => {
            new Number({name:'3592'});
            new Text({name:'hello'});
        });
        test("Bad value", () => {
            expect(() => new Text('hello' as any)).toThrowError();
        });

        describe("Variable", () => {
            test("Valid", () => {
                new Variable({name:'var',scope:'unsaved'});
                new Variable({name:'var',scope:'saved'});
                new Variable({name:'var',scope:'local'});
            });
            test("Invalid", () => {
                expect(() => new Variable({name:'var'} as any)).toThrowError();
                expect(() => new Variable({scope:'local'} as any)).toThrowError();
                expect(() => new Variable({name:'var',scope:'invalid'} as any)).toThrowError();
            });
        });
    });

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
            new GameValue({type:'game value',target:'Default'})
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
