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
            test("Parsing", () => {
                const dataBlock = DataBlock.parse({id:'block',block:'func',data:'test'})
                expect(dataBlock).toBeInstanceOf(DataBlock)
                expect(dataBlock.id).toBe('block')
                expect(dataBlock.block).toBe('func')
                expect(dataBlock.data).toBe('test')
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
                    // TODO: if you are in an editor the type errors are painfully obvious.
                    const action = new ActionBlock("if_player","alive","NOT")
                    expect(action.block).toBe('if_player')
                    expect(action.action).toBe('alive')
                    expect(action.inverted).toBe('NOT')
                })
                test("Without inverted", () => {
                    const action = new ActionBlock("if_player","alive","")
                    expect(action.block).toBe('if_player')
                    expect(action.action).toBe('alive')
                    expect(action.inverted).toBe('')
                })
            })
            describe("Second line", () => {
                test("Getting", () => {
                    const action = new ActionBlock("player_action","action","NOT")
                    expect(action.secondLine).toBe("action")
                })
                test("Setting", () => {
                    const action = new ActionBlock("player_action","action2","NOT")
                    action.secondLine = 'action3'
                    expect(action.action).toBe("action3")
                    expect(action.secondLine).toBe("action3")
                })
            })
            describe("Forth line", () => {
                test("Getting", () => {
                    const action = new ActionBlock("player_action","action","NOT")
                    expect(action.forthLine).toBe('NOT')
                })
                test("Setting", () => {
                    const action = new ActionBlock("player_action","action","NOT1")
                    action.forthLine = "NOT2"
                    expect(action.inverted).toBe('NOT2')
                    expect(action.forthLine).toBe('NOT2')
                })
            })
            describe("NOT", () => {
                test("Getting", () => {
                    const invertedAction = new ActionBlock("player_action","action","NOT")
                    expect(invertedAction.not).toBe(true)
                    const regularAction = new ActionBlock("player_action","action")
                    expect(regularAction.not).toBe(false)
                })
                test("Setting", () => {
                    const invertedAction = new ActionBlock("player_action","action","NOT")
                    invertedAction.not = false
                    expect(invertedAction.inverted).toBe('')
                    expect(invertedAction.not).toBe(false)
                    const regularAction = new ActionBlock("player_action","action")
                    regularAction.not = true
                    expect(regularAction.inverted).toBe('NOT')
                    expect(regularAction.not).toBe(true)
                })
            })
        })
        describe("Selection Block", () => {
            describe("Constructor", () => {
                test("Only block and action", () => {
                    const selection = new SelectionBlock("player_action","action")
                    expect(selection.block).toBe("player_action")
                    expect(selection.action).toBe("action")
                    expect(selection.target).toBe("")
                    expect(selection.inverted).toBe("")
                })
                test("With target", () => {
                    const selection = new SelectionBlock("player_action","action","target")
                    expect(selection.block).toBe("player_action")
                    expect(selection.action).toBe("action")
                    expect(selection.target).toBe("target")
                    expect(selection.inverted).toBe("")
                })
                test("With target and inverted", () => {
                    const selection = new SelectionBlock("player_action","action","target","inverted")
                    expect(selection.block).toBe("player_action")
                    expect(selection.action).toBe("action")
                    expect(selection.target).toBe("target")
                    expect(selection.inverted).toBe("inverted")
                })
            })
            test("Parsing", () => {
                const selection = SelectionBlock.parse({id:"player_action",block:"player_action",action:"action",target:"target",inverted:"NOT"})
                expect(selection).toBeInstanceOf(SelectionBlock)
                expect(selection.id).toBe('player_action')
                expect(selection.action).toBe('action')
                expect(selection.target).toBe('target')
                expect(selection.inverted).toBe('NOT')
            })
            describe("Third line", () => {
                test("Getting", () => {
                    const selection = new SelectionBlock("player_action","action","target")
                    expect(selection.thirdLine).toBe("target")
                })
                test("Setting", () => {
                    const selection = new SelectionBlock("player_action","action","target1")
                    selection.thirdLine = "target2"
                    expect(selection.target).toBe("target2")
                    expect(selection.thirdLine).toBe("target2")
                })
            })
        })
        describe("SubAction Block", () => {
            describe("Constructor", () => {
                test("Only block and action", () => {
                    const selection = new SubActionBlock("if_player","action")
                    expect(selection.block).toBe("if_player")
                    expect(selection.action).toBe("action")
                    expect(selection.subAction).toBe("")
                    expect(selection.inverted).toBe("")
                })
                test("With target", () => {
                    const selection = new SubActionBlock("if_player","action","subAction")
                    expect(selection.block).toBe("if_player")
                    expect(selection.action).toBe("action")
                    expect(selection.subAction).toBe("subAction")
                    expect(selection.inverted).toBe("")
                })
                test("With target and inverted", () => {
                    const selection = new SubActionBlock("if_player","action","subAction","inverted")
                    expect(selection.block).toBe("if_player")
                    expect(selection.action).toBe("action")
                    expect(selection.subAction).toBe("subAction")
                    expect(selection.inverted).toBe("inverted")
                })
            })

            describe("Third line", () => {
                test("Getting", () => {
                    const selection = new SubActionBlock("if_player","action","subAction")
                    expect(selection.thirdLine).toBe("subAction")
                })
                test("Setting", () => {
                    const selection = new SubActionBlock("if_player","action","subAction1")
                    selection.thirdLine = "subAction2"
                    expect(selection.subAction).toBe("subAction2")
                    expect(selection.thirdLine).toBe("subAction2")
                })
            })
        })
    })
})
