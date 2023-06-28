import { plainToInstance } from 'class-transformer'
import ActionDump, { Icon } from '../src/actiondump/actiondump'
import CodeBlock from '../src/actiondump/codeblock'

test("ActionDump", () => {
    const db = plainToInstance(ActionDump, {"codeblocks":[{"name":"PLAYER EVENT","identifier":"event","icon":{}}]})
    expect(db).toBeInstanceOf(ActionDump)
    const cb = db.codeblocks[0]
    if(cb == null) return
    expect(cb).toBeInstanceOf(CodeBlock)
    expect(cb.item).toBeInstanceOf(Icon)
})