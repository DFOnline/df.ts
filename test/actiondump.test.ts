import ActionDump, { Icon } from '../src/actiondump/actiondump'
import CodeBlock from '../src/actiondump/codeblock'
import { readFileSync } from 'fs'
import Action from '../src/actiondump/action'

//@ts-ignore


describe("ActionDump", () => {
        const db = ActionDump.parse(JSON.parse(readFileSync('test/actiondump.json').toString()))
        test("Parsing", () => {
            expect(db).toBeInstanceOf(ActionDump)
        })
        
        test("ActionDump", () => {
            const cb = db.codeblocks[0]
            if(cb == null) return
            expect(cb).toBeInstanceOf(CodeBlock)
            expect(cb.item).toBeInstanceOf(Icon)
        })
        
        test('Action', () => {
            const action = db.actions[0]
            if(action == null) return
            expect(action).toBeInstanceOf(Action)
            expect(action.icon).toBeInstanceOf(Icon)
            expect(action.name).not.toBe("")
        })
})
