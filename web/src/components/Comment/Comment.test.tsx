import { render, screen, waitFor } from '@redwoodjs/testing'

import Comment from './Comment'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

const COMMENT = {
  name: 'Frank',
  body: 'This is Franks comment',
  createdAt: '2022-07-13T13:13:13Z',
}
describe('Comment', () => {
  it('renders successfully', () => {
    render(<Comment comment={COMMENT} />)

    const dateTime = screen.getByText('13 juli 2022')

    expect(screen.getByText(COMMENT.name)).toBeInTheDocument()
    expect(screen.getByText(COMMENT.body)).toBeInTheDocument()
    expect(dateTime).toBeInTheDocument()
    expect(dateTime.nodeName).toEqual('TIME')
    expect(dateTime).toHaveAttribute('datetime', COMMENT.createdAt)
  })

  it('does not render a delete button if user is logged out', async () => {
    render(<Comment comment={COMMENT} />)

    await waitFor(() =>
      expect(screen.queryByText('Delete')).not.toBeInTheDocument()
    )
  })

  it('renders a delete button if the user is a moderator', async () => {
    mockCurrentUser({ roles: 'moderator' })
    render(<Comment comment={COMMENT} />)

    await waitFor(() => expect(screen.getByText('Delete')).toBeInTheDocument())
  })
})
