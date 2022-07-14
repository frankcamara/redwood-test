import { AuthenticationError, ForbiddenError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

import { comments, createComment, deleteComment } from './comments'
import type { StandardScenario } from './comments.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('comments', () => {
  scenario(
    'returns all comments for a single post from the db',
    async (scenario: StandardScenario) => {
      const result = await comments({ postId: scenario.comment.jane.postId })
      const post = await db.post.findUnique({
        where: { id: scenario.comment.jane.postId },
        include: { comments: true },
      })
      expect(result.length).toEqual(post.comments.length)
    }
  )

  scenario('postOnly', 'creates a new comment', async (scenario) => {
    const comment = await createComment({
      input: {
        name: 'Frank',
        body: 'Is frank still around',
        postId: scenario.post.bark.id,
      },
    })

    expect(comment.name).toEqual('Frank')
    expect(comment.body).toEqual('Is frank still around')
    expect(comment.postId).toEqual(scenario.post.bark.id)
    expect(comment.createdAt).not.toEqual(null)
  })

  scenario('allows a moderator to delete a comment', async (scenario) => {
    mockCurrentUser({ roles: ['moderator'] })

    const comment = await deleteComment({
      id: scenario.comment.jane.id,
    })
    expect(comment.id).toEqual(scenario.comment.jane.id)

    const result = await comments({ postId: scenario.comment.jane.id })
    expect(result.length).toEqual(0)
  })

  scenario(
    'does not allow a non-moderator to delete a comment',
    async (scenario) => {
      mockCurrentUser({ roles: 'admin' })

      expect(() =>
        deleteComment({
          id: scenario.comment.jane.id,
        })
      ).toThrow(ForbiddenError)
    }
  )

  scenario(
    'does not allow a logged out user to delete a comment',
    async (scenario) => {
      mockCurrentUser(null)

      expect(() =>
        deleteComment({
          id: scenario.comment.jane.id,
        })
      ).toThrow(AuthenticationError)
    }
  )
})
