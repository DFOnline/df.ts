import { plainToInstance } from 'class-transformer'
import ActionDump, { Icon } from '../src/actiondump/actiondump'
import CodeBlock from '../src/actiondump/codeblock'
import { readFile } from 'fs/promises'

test("ActionDump", async () => {
    const db = plainToInstance(ActionDump, (await readFile('test/actiondump.json')).toJSON())
    expect(db).toBeInstanceOf(ActionDump)
    const cb = db.codeblocks[0]
    if(cb == null) return
    expect(cb).toBeInstanceOf(CodeBlock)
    expect(cb.item).toBeInstanceOf(Icon)
});
