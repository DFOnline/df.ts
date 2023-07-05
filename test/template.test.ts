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
                    "id": "item",
                    "data": {
                      "item": "{Count:1b,DF_NBT:2975,id:\"minecraft:flower_banner_pattern\",tag:{HideFlags:127}}"
                    }
                  },
                  "slot": 0
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
            "data": "levelInfo"
          },
          {
            "id": "block",
            "block": "set_var",
            "args": {
              "items": [
                {
                  "item": {
                    "id": "var",
                    "data": {
                      "name": "levelHead",
                      "scope": "local"
                    }
                  },
                  "slot": 0
                },
                {
                  "item": {
                    "id": "var",
                    "data": {
                      "name": "levels",
                      "scope": "local"
                    }
                  },
                  "slot": 1
                },
                {
                  "item": {
                    "id": "var",
                    "data": {
                      "name": "levelIndex",
                      "scope": "local"
                    }
                  },
                  "slot": 2
                }
              ]
            },
            "action": "GetListValue"
          },
          {
            "id": "block",
            "block": "set_var",
            "args": {
              "items": [
                {
                  "item": {
                    "id": "var",
                    "data": {
                      "name": "name",
                      "scope": "local"
                    }
                  },
                  "slot": 0
                },
                {
                  "item": {
                    "id": "var",
                    "data": {
                      "name": "levelHead",
                      "scope": "local"
                    }
                  },
                  "slot": 1
                }
              ]
            },
            "action": "GetItemName"
          },
          {
            "id": "block",
            "block": "set_var",
            "args": {
              "items": [
                {
                  "item": {
                    "id": "var",
                    "data": {
                      "name": "msgs",
                      "scope": "local"
                    }
                  },
                  "slot": 0
                },
                {
                  "item": {
                    "id": "txt",
                    "data": {
                      "name": "Â§7Ã¢ÂÂ %var(name)"
                    }
                  },
                  "slot": 1
                },
                {
                  "item": {
                    "id": "txt",
                    "data": {
                      "name": "Â§xÂ§fÂ§fÂ§cÂ§fÂ§6Â§6Ã¢Â­Â Ã¢Â­Â Â§7Ã¢Â­Â"
                    }
                  },
                  "slot": 2
                },
                {
                  "item": {
                    "id": "txt",
                    "data": {
                      "name": "Â§f"
                    }
                  },
                  "slot": 3
                },
                {
                  "item": {
                    "id": "txt",
                    "data": {
                      "name": "Â§xÂ§6Â§6Â§7Â§fÂ§fÂ§fÃ¢ÂÂÃ¢ÂÂ Â§xÂ§6Â§0Â§9Â§eÂ§dÂ§7Â§lÃ¡Â´ÂÃ¡Â´ÂÃ¡Â´ÂÃ¡Â´Â Â§xÂ§8Â§aÂ§8Â§aÂ§8Â§aÃ¢ÂÂ  Â§fÃ¢ÂÂ¹ Â§xÂ§dÂ§7Â§9Â§6Â§6Â§0ÃªÂÂ° Â§fÃ¢ÂÂº"
                    }
                  },
                  "slot": 4
                },
                {
                  "item": {
                    "id": "txt",
                    "data": {
                      "name": "Â§xÂ§fÂ§fÂ§eÂ§6Â§6Â§6Ã¢ÂÂ Â§xÂ§fÂ§fÂ§dÂ§cÂ§2Â§eÂ§lÃ¡Â´ÂÃ¡Â´ÂÃÂÃ¡Â´ÂÃ¡Â´ÂÃÂ Â§xÂ§8Â§aÂ§8Â§aÂ§8Â§aÃ¢ÂÂ  Â§fÃ¢ÂÂ¹ Â§xÂ§dÂ§7Â§9Â§6Â§6Â§0ÃªÂÂ° Â§fÃ¢ÂÂº"
                    }
                  },
                  "slot": 5
                },
                {
                  "item": {
                    "id": "txt",
                    "data": {
                      "name": "Â§xÂ§6Â§eÂ§dÂ§7Â§6Â§0Ã¢ÂÂ Â§xÂ§5Â§2Â§dÂ§8Â§4Â§1Â§lÃ¡Â´ÂÃÂÃ¡Â´ÂÃÂ Â§xÂ§8Â§aÂ§8Â§aÂ§8Â§aÃ¢ÂÂ  Â§fÃ¢ÂÂ¹ Â§xÂ§dÂ§7Â§9Â§6Â§6Â§0ÃªÂÂ° Â§fÃ¢ÂÂº"
                    }
                  },
                  "slot": 6
                }
              ]
            },
            "action": "CreateList"
          },
          {
            "id": "block",
            "block": "set_var",
            "args": {
              "items": [
                {
                  "item": {
                    "id": "var",
                    "data": {
                      "name": "levelInfos",
                      "scope": "local"
                    }
                  },
                  "slot": 0
                },
                {
                  "item": {
                    "id": "var",
                    "data": {
                      "name": "msgs",
                      "scope": "local"
                    }
                  },
                  "slot": 1
                }
              ]
            },
            "action": "="
          },
          {
            "id": "block",
            "block": "set_var",
            "args": {
              "items": [
                {
                  "item": {
                    "id": "var",
                    "data": {
                      "name": "hol",
                      "scope": "local"
                    }
                  },
                  "slot": 0
                },
                {
                  "item": {
                    "id": "var",
                    "data": {
                      "name": "levelLocs",
                      "scope": "local"
                    }
                  },
                  "slot": 1
                },
                {
                  "item": {
                    "id": "var",
                    "data": {
                      "name": "levelIndex",
                      "scope": "local"
                    }
                  },
                  "slot": 2
                }
              ]
            },
            "action": "GetListValue"
          },
          {
            "id": "block",
            "block": "set_var",
            "args": {
              "items": [
                {
                  "item": {
                    "id": "var",
                    "data": {
                      "name": "hol",
                      "scope": "local"
                    }
                  },
                  "slot": 0
                },
                {
                  "item": {
                    "id": "num",
                    "data": {
                      "name": "1.5"
                    }
                  },
                  "slot": 1
                },
                {
                  "item": {
                    "id": "bl_tag",
                    "data": {
                      "option": "Y",
                      "tag": "Coordinate",
                      "action": "ShiftOnAxis",
                      "block": "set_var"
                    }
                  },
                  "slot": 26
                }
              ]
            },
            "action": "ShiftOnAxis"
          },
          {
            "id": "block",
            "block": "set_var",
            "args": {
              "items": [
                {
                  "item": {
                    "id": "var",
                    "data": {
                      "name": "tempIndex",
                      "scope": "local"
                    }
                  },
                  "slot": 0
                },
                {
                  "item": {
                    "id": "num",
                    "data": {
                      "name": "0"
                    }
                  },
                  "slot": 1
                }
              ]
            },
            "action": "="
          },
          {
            "id": "block",
            "block": "repeat",
            "args": {
              "items": [
                {
                  "item": {
                    "id": "var",
                    "data": {
                      "name": "msg",
                      "scope": "local"
                    }
                  },
                  "slot": 0
                },
                {
                  "item": {
                    "id": "var",
                    "data": {
                      "name": "msgs",
                      "scope": "local"
                    }
                  },
                  "slot": 1
                },
                {
                  "item": {
                    "id": "bl_tag",
                    "data": {
                      "option": "True",
                      "tag": "Allow List Changes",
                      "action": "ForEach",
                      "block": "repeat"
                    }
                  },
                  "slot": 26
                }
              ]
            },
            "action": "ForEach"
          },
          {
            "id": "bracket",
            "direct": "open",
            "type": "repeat"
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
                      "name": "hol",
                      "scope": "local"
                    }
                  },
                  "slot": 0
                },
                {
                  "item": {
                    "id": "var",
                    "data": {
                      "name": "msg",
                      "scope": "local"
                    }
                  },
                  "slot": 1
                }
              ]
            },
            "action": "DisplayHologram"
          },
          {
            "id": "block",
            "block": "set_var",
            "args": {
              "items": [
                {
                  "item": {
                    "id": "var",
                    "data": {
                      "name": "tempIndex",
                      "scope": "local"
                    }
                  },
                  "slot": 0
                }
              ]
            },
            "action": "+="
          },
          {
            "id": "block",
            "block": "set_var",
            "args": {
              "items": [
                {
                  "item": {
                    "id": "var",
                    "data": {
                      "name": "levelInfos",
                      "scope": "local"
                    }
                  },
                  "slot": 0
                },
                {
                  "item": {
                    "id": "var",
                    "data": {
                      "name": "tempIndex",
                      "scope": "local"
                    }
                  },
                  "slot": 1
                },
                {
                  "item": {
                    "id": "var",
                    "data": {
                      "name": "hol",
                      "scope": "local"
                    }
                  },
                  "slot": 2
                }
              ]
            },
            "action": "SetListValue"
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
                      "name": "levelInfos",
                      "scope": "local"
                    }
                  },
                  "slot": 0
                },
                {
                  "item": {
                    "id": "bl_tag",
                    "data": {
                      "option": "Add spaces",
                      "tag": "Text Value Merging",
                      "action": "SendMessage",
                      "block": "player_action"
                    }
                  },
                  "slot": 25
                },
                {
                  "item": {
                    "id": "bl_tag",
                    "data": {
                      "option": "Regular",
                      "tag": "Alignment Mode",
                      "action": "SendMessage",
                      "block": "player_action"
                    }
                  },
                  "slot": 26
                }
              ]
            },
            "action": "SendMessage"
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
                      "name": "hol",
                      "scope": "local"
                    }
                  },
                  "slot": 0
                },
                {
                  "item": {
                    "id": "bl_tag",
                    "data": {
                      "option": "Add spaces",
                      "tag": "Text Value Merging",
                      "action": "SendMessage",
                      "block": "player_action"
                    }
                  },
                  "slot": 25
                },
                {
                  "item": {
                    "id": "bl_tag",
                    "data": {
                      "option": "Regular",
                      "tag": "Alignment Mode",
                      "action": "SendMessage",
                      "block": "player_action"
                    }
                  },
                  "slot": 26
                }
              ]
            },
            "action": "SendMessage"
          },
          {
            "id": "block",
            "block": "set_var",
            "args": {
              "items": [
                {
                  "item": {
                    "id": "var",
                    "data": {
                      "name": "hol",
                      "scope": "local"
                    }
                  },
                  "slot": 0
                },
                {
                  "item": {
                    "id": "num",
                    "data": {
                      "name": "0.25"
                    }
                  },
                  "slot": 1
                },
                {
                  "item": {
                    "id": "bl_tag",
                    "data": {
                      "option": "Y",
                      "tag": "Coordinate",
                      "action": "ShiftOnAxis",
                      "block": "set_var"
                    }
                  },
                  "slot": 26
                }
              ]
            },
            "action": "ShiftOnAxis"
          },
          {
            "id": "bracket",
            "direct": "close",
            "type": "repeat"
          }
        ]
      });
})