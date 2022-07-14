import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.CommentCreateArgs>({
  comment: {
    jane: {
      data: {
        name: 'Jane Doe',
        body: 'Jane comment',
        post: {
          create: {
            title: 'Is Jane still around',
            body: 'The quick brown fox jumped over the lazy dog.',
          },
        },
      },
    },
    john: {
      data: {
        name: 'John Doe',
        body: 'John comment',
        post: {
          create: {
            title: 'Is John still around',
            body: 'The quick brown fox jumped over the lazy dog.',
          },
        },
      },
    },
  },
})

export const postOnly = defineScenario({
  post: {
    bark: {
      data: {
        title: 'Bark',
        body: 'The quick brown fox jumped over the lazy dog.',
      },
    },
  },
})

export type StandardScenario = typeof standard
