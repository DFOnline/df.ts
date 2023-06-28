import Template from "../src/template/template"

test("parsing", () => {
    Template.parse({"blocks":[{"id":"block","block":"event","args":{"items":[{slot:3,item:{id:"loc",data:{isBlock:false,loc:{x:1,y:2,z:3,pitch:90,yaw:-20}}}},{slot:3,item:{id:"loc",data:{isBlock:false,loc:{x:1,y:2,z:3,pitch:90,yaw:-20}}}},{slot:3,item:{id:"loc",data:{isBlock:false,loc:{x:1,y:2,z:3,pitch:90,yaw:-20}}}}]},"action":"honestly","target":"quite","inverted":"incredible"}]});
})