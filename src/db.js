/* let db = {
  boards: [
    {
      boardName: "boardFirst",
      id: 2,              
      todo: [
        {
          id: 1,
          taskName: "first",
          shortDescription: "краткое описание задачи aaa",
          fullDescription: "aaaaaaaaaaaaaaaaaaaaaaaaaaa"
        },
        {
          id: 2,
          taskName: "second",
          shortDescription: "краткое описание задачи bbb",
          fullDescription: "bbbbbbbbbbbbbbbbbbbbbbbbbbbb"
        }
      ],
      progress: [
          {
            id: 3,
            taskName: "first",
            shortDescription: "краткое описание задачи ccc",
            fullDescription: "cccccccccccccccccccccccccccccc"
          },
          {
            id: 4,
            taskName: "second",
            shortDescription: "краткое описание задачи ddd",
            fullDescription: "dddddddddddddddddddddddddddddd"
          }
        ],
      done: []
    },
    {
      boardName: "boardSecond",
      id: 1,              
      todo: [
        {
          id: 5,
          taskName: "jlkjn",
          shortDescription: "краткое описание задачи eee",
          fullDescription: "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
        },
        {
          id: 6,
          taskName: "kljnlkjn",
          shortDescription: "краткое описание задачи ddd",
          fullDescription: "dddddddddddddddddddddddddddddddd"
        }
      ],
      progress: [
          {
            id: 7,
            taskName: "ihnbl",
            shortDescription: "краткое описание задачи fff",
            fullDescription: "ffffffffffffffffffffffffffffffffff"
          }          
        ],
      done: [
        {
            id: 8,
            taskName: "se7huocond",
            shortDescription: "краткое описание задачи iii",
            fullDescription: "iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii"
          }
      ]
    }
  ]
} */

let db = {
  boards: [
    {
      name: 'BoardFirst',
      id: 255,
      type: 'board',
      columns: [12, 23],
    },
    {
      name: 'Boardklm;',
      id: 295,
      type: 'board',
      columns: [],
    },
    {
      name: 'BoardSecond',
      id: 476,
      type: 'board',
      columns: [11, 43, 54],
    },

    {
      name: 'Todo',
      id: 12,
      type: 'column',
      tasks: [1, 2],
    },
    {
      name: 'Progress',
      id: 23,
      type: 'column',
      tasks: [3, 4],
    },
    {
      name: 'Done',
      id: 11,
      type: 'column',
      tasks: [25, 5, 17],
    },
    {
      name: 'Noname2',
      id: 43,
      type: 'column',
      tasks: [7, 8],
    },
    {
      name: 'Noname3',
      id: 54,
      type: 'column',
      tasks: [9],
    },

    {
      id: 3,
      name: 'First',
      type: 'task',
      order: 91,
      shortDescription: 'краткое описание задачи aaa',
      fullDescription: 'aaaaaaaaaaaaaaaaaaaaaaaaaaa',
      creatingDate: 'april 8',
      editingDate: 'april 14',
    },
    {
      id: 1,
      name: 'First',
      type: 'task',
      order: 112,
      shortDescription: 'краткое описание задачи aaa',
      fullDescription: 'aaaaaaaaaaaaaaaaaaaaaaaaaaa',
      creatingDate: 'april 9',
      editingDate: 'april 14',
    },
    {
      id: 2,
      name: 'Second',
      type: 'task',
      order: 33,
      shortDescription: 'краткое описание задачи bbb',
      fullDescription: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbb',
      creatingDate: 'april 3',
      editingDate: 'april 14',
    },

    {
      id: 5,
      name: 'First',
      type: 'task',
      order: 4,
      shortDescription: 'краткое описание задачи ccc',
      fullDescription: 'cccccccccccccccccccccccccccccc',
      creatingDate: 'april 5',
      editingDate: 'april 15',
    },
    {
      id: 17,
      name: 'ljhbcond',
      type: 'task',
      order: 2,
      shortDescription: 'кратljhие задачи iii',
      fullDescription: 'iiiirrrrrrriiiiiiiiiiiiii',
      creatingDate: 'april 10',
      editingDate: 'april 14',
    },
    {
      id: 4,
      name: 'Second',
      type: 'task',
      order: 35,
      shortDescription: 'краткое описание задачи ddd',
      fullDescription: 'dddddddddddddddddddddddddddddd',
      creatingDate: 'april 7',
      editingDate: 'april 12',
    },
    {
      id: 25,
      name: 'Dlkjn',
      type: 'task',
      order: 3,
      shortDescription: 'краткое описание задачи eee',
      fullDescription: 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      creatingDate: 'april 10',
      editingDate: 'april 14',
    },
    {
      id: 8,
      name: 'Rljnlkjn',
      type: 'task',
      order: 427,
      shortDescription: 'краткое описание задачи ddd',
      fullDescription: 'dddddddddddddddddddddddddddddddd',
      creatingDate: 'april 10',
      editingDate: 'april 14',
    },
    {
      id: 7,
      name: 'Thnbl',
      type: 'task',
      order: 88,
      shortDescription: 'краткое описание задачи fff',
      fullDescription: 'ffffffffffffffffffffffffffffffffff',
      creatingDate: 'april 10',
      editingDate: 'april 14',
    },
    {
      id: 9,
      name: 'We7huocond',
      type: 'task',
      order: 95,
      shortDescription: 'краткое описание задачи iii',
      fullDescription: 'iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii',
      creatingDate: 'april 10',
      editingDate: 'april 14',
    },
  ],
};

export default db;
