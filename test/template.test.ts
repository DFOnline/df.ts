import Template from "../src/template/template"

test("parsing", () => {
    Template.parse({
      "blocks": [
        {
          "id": "block",
          "block": "func",
          "args": {
            "items": [
              {
                "item": {
                  "id": "pn_el",
                  "data": {
                    "name": "name",
                    "type": "any",
                    "default_value": {
                      "id": "num",
                      "data": {
                        "name": "0"
                      }
                    },
                    "plural": false,
                    "optional": true
                  }
                },
                "slot": 0
              },
              {
                "item": {
                  "id": "pn_el",
                  "data": {
                    "name": "name",
                    "type": "var",
                    "plural": true,
                    "optional": false
                  }
                },
                "slot": 1
              },
              {
                "item": {
                  "id": "pn_el",
                  "data": {
                    "name": "name",
                    "type": "dict",
                    "plural": true,
                    "optional": true
                  }
                },
                "slot": 2
              },
              {
                "item": {
                  "id": "pn_el",
                  "data": {
                    "name": "name",
                    "type": "list",
                    "plural": false,
                    "optional": false
                  }
                },
                "slot": 3
              },
              {
                "item": {
                  "id": "pn_el",
                  "data": {
                    "name": "name",
                    "type": "vec",
                    "plural": false,
                    "optional": false,
                    "description": "hi&ahi<green>hi",
                    "note": "&ahi<green>hi"
                  }
                },
                "slot": 4
              },
              {
                "item": {
                  "id": "hint",
                  "data": {
                    "id": "function"
                  }
                },
                "slot": 25
              },
              {
                "item": {
                  "id": "bl_tag",
                  "data": {
                    "option": "False",
                    "tag": "Is Hidden",
                    "action": "dynamic",
                    "block": "func"
                  }
                },
                "slot": 26
              }
            ]
          },
          "data": ""
        },
        {
          "id": "block",
          "block": "player_action",
          "args": {
            "items": [
              {
                "item": {
                  "id": "txt",
                  "data": {
                    "name": "&astring! %default"
                  }
                },
                "slot": 0
              }
            ]
          },
          "action": ""
        },
        {
          "id": "block",
          "block": "player_action",
          "args": {
            "items": [
              {
                "item": {
                  "id": "comp",
                  "data": {
                    "name": "<green>hi"
                  }
                },
                "slot": 0
              }
            ]
          },
          "action": ""
        },
        {
          "id": "block",
          "block": "player_action",
          "args": {
            "items": [
              {
                "item": {
                  "id": "num",
                  "data": {
                    "name": "%var(&chi)"
                  }
                },
                "slot": 0
              }
            ]
          },
          "action": ""
        },
        {
          "id": "block",
          "block": "player_action",
          "args": {
            "items": [
              {
                "item": {
                  "id": "loc",
                  "data": {
                    "isBlock": false,
                    "loc": {
                      "x": 2.100503566321322,
                      "y": 64.14752328981187,
                      "z": 22.627610902878587,
                      "pitch": 23.69824,
                      "yaw": -110.94752
                    }
                  }
                },
                "slot": 0
              }
            ]
          },
          "action": ""
        },
        {
          "id": "block",
          "block": "player_action",
          "args": {
            "items": [
              {
                "item": {
                  "id": "vec",
                  "data": {
                    "x": 1,
                    "y": 0.1,
                    "z": 0.03
                  }
                },
                "slot": 0
              }
            ]
          },
          "action": ""
        },
        {
          "id": "block",
          "block": "player_action",
          "args": {
            "items": [
              {
                "item": {
                  "id": "snd",
                  "data": {
                    "pitch": 1,
                    "vol": 2,
                    "sound": "Pling"
                  }
                },
                "slot": 0
              }
            ]
          },
          "action": ""
        },
        {
          "id": "block",
          "block": "player_action",
          "args": {
            "items": [
              {
                "item": {
                  "id": "part",
                  "data": {
                    "particle": "Cloud",
                    "cluster": {
                      "amount": 1,
                      "horizontal": 0,
                      "vertical": 0
                    },
                    "data": {
                      "x": 1,
                      "y": 0,
                      "z": 0,
                      "motionVariation": 100
                    }
                  }
                },
                "slot": 0
              }
            ]
          },
          "action": ""
        },
        {
          "id": "block",
          "block": "player_action",
          "args": {
            "items": [
              {
                "item": {
                  "id": "pot",
                  "data": {
                    "pot": "Speed",
                    "dur": 1000000,
                    "amp": 0
                  }
                },
                "slot": 0
              }
            ]
          },
          "action": ""
        },
        {
          "id": "block",
          "block": "player_action",
          "args": {
            "items": [
              {
                "item": {
                  "id": "var",
                  "data": {
                    "name": "hi",
                    "scope": "unsaved"
                  }
                },
                "slot": 0
              },
              {
                "item": {
                  "id": "var",
                  "data": {
                    "name": "hello",
                    "scope": "saved"
                  }
                },
                "slot": 1
              },
              {
                "item": {
                  "id": "var",
                  "data": {
                    "name": "morning",
                    "scope": "local"
                  }
                },
                "slot": 2
              },
              {
                "item": {
                  "id": "var",
                  "data": {
                    "name": "night",
                    "scope": "line"
                  }
                },
                "slot": 3
              }
            ]
          },
          "action": ""
        },
        {
          "id": "block",
          "block": "player_action",
          "args": {
            "items": [
              {
                "item": {
                  "id": "g_val",
                  "data": {
                    "type": "Player Count",
                    "target": "Default"
                  }
                },
                "slot": 0
              },
              {
                "item": {
                  "id": "g_val",
                  "data": {
                    "type": "Current Health",
                    "target": "Default"
                  }
                },
                "slot": 1
              }
            ]
          },
          "action": ""
        }
      ]
    });
})