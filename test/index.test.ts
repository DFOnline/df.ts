// not at all overkill
import {Bracket, DataBlock, Else, Template} from "../src";

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

    describe("Blocks", () => {
        describe("Else", () => {
            test("Can be constructed", () => {
                const _else = new Else();
                expect(_else.id).toBe('block')
                expect(_else.block).toBe('else')
            })
        })
        describe("Data Block", () => {
            test("Can be constructed", () => {
                const dataBlock = new DataBlock('func','data')
                expect(dataBlock.id).toBe('block')
                expect(dataBlock.data).toBe('data')
            })
            describe("Parsing", () => {
                test("Data", () => {
                    const dataBlock = DataBlock.parse({id:'block',block:'func',data:'test'})
                    expect(dataBlock).toBeInstanceOf(DataBlock)
                    expect(dataBlock.id).toBe('block')
                    expect(dataBlock.block).toBe('func')
                    expect(dataBlock.data).toBe('test')
                })
                test("Missing data", () => {
                    expect(() => DataBlock.parse({id:'block',block:'func'})).toThrowError()
                })
                test("Missing block", () => {
                    expect(() => DataBlock.parse({id:'block',data:'test'})).toThrowError()
                })
                test("Missing id", () => {
                    expect(() => DataBlock.parse({block:'func',data:'test'})).toThrowError()
                })
            })
        })
    })
})
