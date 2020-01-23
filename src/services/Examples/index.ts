export const examples = [ {
    expression: [
        {
            itemType: 'condition',
            content: {
              conditionId: `1`,
              target: {
                id: `1`,
               },
              match: {
                values: [`morning`],
                type: `exact`
              }
            },
          },
    ],
    inputs: [
        {
            id: '1',
            name: 'Time',
            value: 'morning'
        }
    ]
},
 {
    expression: [
        {
            itemType: 'parenthesis',
            content: {
                parenType: 'open',
                highlight: false,
            }
          },
        {
            itemType: 'condition',
            content: {
              conditionId: `1`,
              target: {
                id: `1`,
               },
              match: {
                values: [`Small`],
                type: `exact`
              }
            },
          },
          {
            itemType: 'operator',
            content: {
              operatorType: 'or'
            }
          },
          {
            itemType: 'condition',
            content: {
              conditionId: `2`,
              target: {
                id: `1`,
               },
              match: {
                values: [`Fast`],
                type: `exact`
              }
            },
          },
          {
            itemType: 'operator',
            content: {
              operatorType: 'or'
            }
          },
          {
            itemType: 'condition',
            content: {
              conditionId: `3`,
              target: {
                id: `1`,
               },
              match: {
                values: [`Cheap`],
                type: `exact`
              }
            },
          },
          {
            itemType: 'parenthesis',
            content: {
                parenType: 'close',
                highlight: false,
            }
          }
    ],
    inputs: [
        {
            id: '1',
            name: 'Size',
            value: 'Large'
        },
        {
            id: '2',
            name: 'Speed',
            value: 'Slow'
        },
        {
            id: '3',
            name: 'Cost',
            value: 'High'
        }
    ]
},
 {
    expression: [
        {
            itemType: 'condition',
            content: {
              conditionId: `1`,
              target: {
                id: `1`,
               },
              match: {
                values: [`Happy`, `Glad`, `Joyous`, `Merry`],
                type: `partial`
              }
            },
          },
          {
            itemType: 'operator',
            content: {
              operatorType: 'and'
            }
          },
          {
            itemType: 'operator',
            content: {
              operatorType: 'not'
            }
          },
        {
            itemType: 'parenthesis',
            content: {
                parenType: 'open',
                highlight: false,
            }
          },
          {
            itemType: 'condition',
            content: {
              conditionId: `2`,
              target: {
                id: `1`,
               },
              match: {
                values: [`Unhappy`, `Sad`, `Down`, `Upset`],
                type: `partial`
              }
            },
          },
          {
            itemType: 'operator',
            content: {
              operatorType: 'or'
            }
          },
          {
            itemType: 'condition',
            content: {
              conditionId: `3`,
              target: {
                id: `1`,
               },
              match: {
                values: [`Happy`],
                type: `exact`
              }
            },
          },
          {
            itemType: 'parenthesis',
            content: {
                parenType: 'close',
                highlight: false,
            }
          },
    ],
    inputs: [
        {
            id: '1',
            name: 'Mood',
            value: 'happy'
        }
    ]
}]