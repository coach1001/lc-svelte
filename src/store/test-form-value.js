export default {
  step: {
    firstName: 'Francois',
    age: 37,
    hobbies: ['gaming', 'coding'],
    children: [
      {
        __id__: '00',
        __op__: 'update',
        biological: false, detail: {
          firstName: 'Dailen'
        }
      },
      {
        __id__: '01',
        __op__: 'update',
        biological: true, detail: {
          firstName: 'Isabella'
        }
      }
    ],
    spouse: {
      firstName: 'Leanne'
    }
  },
}
