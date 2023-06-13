// not at all overkill
import {Bracket, Else, Template} from "../src";

describe("Templates", () => {
    it("can be constructed", () => {
        new Template()
    })
})

describe("Codeblock", () => {
    describe("Bracket", () => {
        describe("Parsing", () => {
            describe("Success", () => {
                test("Good parsing data", () => {
                    const bracket = Bracket.parse({"id": "bracket", "direct": "open", "type": "norm"})
                    expect(bracket.id).toBe('bracket')
                    expect(bracket.direct).toBe('open')
                    expect(bracket.type).toBe('norm')
                })
                test("Closing", () => {
                    const bracket = Bracket.parse({id: "bracket", direct: "close", type: "norm"})
                    expect(bracket.id).toBe('bracket')
                    expect(bracket.direct).toBe('close')
                    expect(bracket.type).toBe('norm')
                })
                test("Sticky", () => {
                    const bracket = Bracket.parse({id: "bracket", direct: "open", type: "repeat"})
                    expect(bracket.id).toBe('bracket')
                    expect(bracket.direct).toBe('open')
                    expect(bracket.type).toBe('repeat')
                })
                test("Closing and sticky", () => {
                    const bracket = Bracket.parse({id: "bracket", direct: "close", type: "repeat"})
                    expect(bracket.id).toBe('bracket')
                    expect(bracket.direct).toBe('close')
                    expect(bracket.type).toBe('repeat')
                })
            })
            describe("Errors", () => {
                test("Bad parsing data", () => {
                    expect(() => Bracket.parse(`{"id":"bracket","direct":"open","type":"norm"}`)).toThrowError()
                })
                test("Missing id", () => {
                    expect(() => Bracket.parse({direct: "open", type: "norm"})).toThrowError()
                })
                test("Bad direct", () => {
                    expect(() => Bracket.parse({id: "bracket", direct: "something", type: "norm"})).toThrowError()
                })
                test("Bad type", () => {
                    expect(() => Bracket.parse({id: "bracket", direct: "open", type: "something"})).toThrowError()
                })
            })
        })
    })

    describe("Block", () => {
        describe("Else", () => {
            test("Can be constructed", () => {
                const _else = new Else();
                expect(_else.id).toBe('block')
                expect(_else.block).toBe('else')
            })
        })
    })
})
