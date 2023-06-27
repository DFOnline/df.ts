import Template from "../src/template/template"

test("parsing", () => {
    Template.parse({"blocks":[{"id":"block","block":"event","args":{"items":[]},"action":"honestly","target":"quite","inverted":"incredible"}]});
})