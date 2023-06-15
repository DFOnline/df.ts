// not at all overkill
import {ActionBlock, Bracket, DataBlock, Else, SelectionBlock, SubActionBlock} from "../src/template/block"

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
                const _else = new Else()
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
            describe("Second line", () => {
                test("Gets data", () => {
                    const dataBlock = new DataBlock('func','testData')
                    expect(dataBlock.secondLine).toBe('testData')
                    dataBlock.data = 'newData'
                    expect(dataBlock.secondLine).toBe('newData')
                })
                test("Sets data", () => {
                    const dataBlock = new DataBlock('func','testData')
                    dataBlock.secondLine = 'newData2'
                    expect(dataBlock.data).toBe('newData2')
                    expect(dataBlock.secondLine).toBe('newData2')
                })
            })
        })
        describe("Action Block", () => {
            describe("Constructor", () => {
                test("With inverted", () => {
                    const action = new ActionBlock("if","alive","NOT")
                    expect(action.block).toBe('if')
                    expect(action.action).toBe('alive')
                    expect(action.inverted).toBe('NOT')
                })
                test("Without inverted", () => {
                    const action = new ActionBlock("if","alive","")
                    expect(action.block).toBe('if')
                    expect(action.action).toBe('alive')
                    expect(action.inverted).toBe('')
                })
            })
            describe("Second line", () => {
                test("Getting", () => {
                    const action = new ActionBlock("block","action","NOT")
                    expect(action.secondLine).toBe("action")
                })
                test("Setting", () => {
                    const action = new ActionBlock("block","action2","NOT")
                    action.secondLine = 'action3'
                    expect(action.action).toBe("action3")
                    expect(action.secondLine).toBe("action3")
                })
            })
            describe("Forth line", () => {
                test("Getting", () => {
                    const action = new ActionBlock("block","action","NOT")
                    expect(action.forthLine).toBe('NOT')
                })
                test("Setting", () => {
                    const action = new ActionBlock("block","action","NOT1")
                    action.forthLine = "NOT2"
                    expect(action.inverted).toBe('NOT2')
                    expect(action.forthLine).toBe('NOT2')
                })
            })
            describe("NOT", () => {
                test("Getting", () => {
                    const invertedAction = new ActionBlock("block","action","NOT")
                    expect(invertedAction.not).toBe(true)
                    const regularAction = new ActionBlock("block","action")
                    expect(regularAction.not).toBe(false)
                })
                test("Setting", () => {
                    const invertedAction = new ActionBlock("block","action","NOT")
                    invertedAction.not = false
                    expect(invertedAction.inverted).toBe('')
                    expect(invertedAction.not).toBe(false)
                    const regularAction = new ActionBlock("block","action")
                    regularAction.not = true
                    expect(regularAction.inverted).toBe('NOT')
                    expect(regularAction.not).toBe(true)
                })
            })
        })
        describe("Selection Block", () => {
            describe("Constructor", () => {
                test("Only block and action", () => {
                    const selection = new SelectionBlock("block","action")
                    expect(selection.block).toBe("block")
                    expect(selection.action).toBe("action")
                    expect(selection.target).toBe("")
                    expect(selection.inverted).toBe("")
                })
                test("With target", () => {
                    const selection = new SelectionBlock("block","action","target")
                    expect(selection.block).toBe("block")
                    expect(selection.action).toBe("action")
                    expect(selection.target).toBe("target")
                    expect(selection.inverted).toBe("")
                })
                test("With target and inverted", () => {
                    const selection = new SelectionBlock("block","action","target","inverted")
                    expect(selection.block).toBe("block")
                    expect(selection.action).toBe("action")
                    expect(selection.target).toBe("target")
                    expect(selection.inverted).toBe("inverted")
                })
            })
            describe("Parsing", () => {
                test("Valid", () => {
                    const selection = SelectionBlock.parse({id:"block",block:"block",action:"action",target:"target",inverted:"NOT"})
                    expect(selection).toBeInstanceOf(SelectionBlock)
                    expect(selection.id).toBe('block')
                    expect(selection.action).toBe('action')
                    expect(selection.target).toBe('target')
                    expect(selection.inverted).toBe('NOT')
                })
                test("Invalid", () => {
                    expect(() => SelectionBlock.parse({block:"block",action:"action",target:"target",inverted:"NOT"})).toThrowError()
                    expect(() => SelectionBlock.parse({id:"block",action:"action",target:"target",inverted:"NOT"})).toThrowError()
                    expect(() => SelectionBlock.parse({id:"block",target:"target",inverted:"NOT"})).toThrowError()
                    expect(() => SelectionBlock.parse({id:"block",block:"block",action:"action",inverted:"NOT"})).toThrowError()
                    expect(() => SelectionBlock.parse({id:"block",block:"block",action:"action",target:"target"})).toThrowError()
                })
            })
            describe("Third line", () => {
                test("Getting", () => {
                    const selection = new SelectionBlock("block","action","target")
                    expect(selection.thirdLine).toBe("target")
                })
                test("Setting", () => {
                    const selection = new SelectionBlock("block","action","target1")
                    selection.thirdLine = "target2"
                    expect(selection.target).toBe("target2")
                    expect(selection.thirdLine).toBe("target2")
                })
            })
        })
        describe("SubAction Block", () => {
            describe("Constructor", () => {
                test("Only block and action", () => {
                    const selection = new SubActionBlock("block","action")
                    expect(selection.block).toBe("block")
                    expect(selection.action).toBe("action")
                    expect(selection.subAction).toBe("")
                    expect(selection.inverted).toBe("")
                })
                test("With target", () => {
                    const selection = new SubActionBlock("block","action","subAction")
                    expect(selection.block).toBe("block")
                    expect(selection.action).toBe("action")
                    expect(selection.subAction).toBe("subAction")
                    expect(selection.inverted).toBe("")
                })
                test("With target and inverted", () => {
                    const selection = new SubActionBlock("block","action","subAction","inverted")
                    expect(selection.block).toBe("block")
                    expect(selection.action).toBe("action")
                    expect(selection.subAction).toBe("subAction")
                    expect(selection.inverted).toBe("inverted")
                })
            })

            describe("Third line", () => {
                test("Getting", () => {
                    const selection = new SubActionBlock("block","action","subAction")
                    expect(selection.thirdLine).toBe("subAction")
                })
                test("Setting", () => {
                    const selection = new SubActionBlock("block","action","subAction1")
                    selection.thirdLine = "subAction2"
                    expect(selection.subAction).toBe("subAction2")
                    expect(selection.thirdLine).toBe("subAction2")
                })
            })
        })
    })
})
