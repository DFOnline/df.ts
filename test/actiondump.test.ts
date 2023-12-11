import { Actiondump, Codeblock, Icon } from '../src/actiondump/actiondump'
import { readFileSync } from 'fs'

describe("ActionDump", () => {
        const json = JSON.parse(readFileSync('test/actiondump.json').toString())
        const db = Actiondump(json)
        test("Parsing", () => {
            expect(db.constructor).toStrictEqual(Actiondump)
            expect(db.constructor).not.toStrictEqual(console.log)
        })

        test("Codeblock", () => {
            const codeblock = Codeblock(db.codeblocks[0])
            expect(codeblock.constructor).toStrictEqual(Codeblock)
            expect(db.constructor).not.toStrictEqual(console.log)
            expect(codeblock.getItem().constructor).toBe(Icon)
            expect(codeblock.getItem().constructor).not.toStrictEqual(console.log)
        })
        
        // test("ActionDump", () => {
        //     const cb = db.codeblocks[0]
        //     if(cb == null) return
        //     expect(cb).toBeInstanceOf(CodeBlock)
        //     expect(cb.item).toBeInstanceOf(Icon)
        // })

        test("Icon", () => {
            const myIcon = Icon(json.actions[0].icon)
            expect(myIcon.constructor).toStrictEqual(Icon)
            expect(myIcon.constructor).not.toStrictEqual(console.log)
        })
        
        // test('Action', () => {
        //     const action = db.actions[0]
        //     if(action == null) return
        //     expect(action).toBeInstanceOf(Action)
        //     expect(action.icon).toBeInstanceOf(Icon)
        //     expect(action.name).not.toBe("")
        // })
})
