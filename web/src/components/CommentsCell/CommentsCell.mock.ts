// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  comments: [
    {
      id: 42,
      name: 'Frank',
      body: 'This is Franks comment',
      createdAt: '2022-07-13T13:13:13Z',
      postId: 1,
    },
    {
      id: 43,
      name: 'Frank2',
      body: 'This is Frank222 comment',
      createdAt: '2022-05-15T13:13:13Z',
      postId: 2,
    },
    {
      id: 44,
      name: 'Frank3',
      body: 'This is Frank333 comment',
      createdAt: '2022-06-19T13:13:13Z',
      postId: 3,
    },
  ],
})
