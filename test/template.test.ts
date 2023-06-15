import Template from "../src/template/template"

test("parsing", () => {
    const template = Template.parse({"blocks":[{"id":"block","block":"event","args":{"items":[]},"action":"honestly","target":"quite","inverted":"incredible"}]})
    debugger
})