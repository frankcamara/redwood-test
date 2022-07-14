import Comment from './Comment'

export const defaultView = () => {
  return (
    <div className="m-4">
      <Comment
        comment={{
          id: 1,
          name: 'Frank',
          body: 'This is Franks comment',
          createdAt: '2022-07-13T13:13:13Z',
          postId: 1,
        }}
      />
    </div>
  )
}

export const modView = () => {
  mockCurrentUser({
    roles: 'moderator',
  })

  return (
    <div className="m-4">
      <Comment
        comment={{
          id: 1,
          name: 'Frank',
          body: 'This is Franks comment',
          createdAt: '2022-07-13T13:13:13Z',
          postId: 1,
        }}
      />
    </div>
  )
}

export default { title: 'Components/Comment' }
