import { render, screen, waitFor } from '@redwoodjs/testing/web'

import { standard } from 'src/components/CommentsCell/CommentsCell.mock'

import Article from './Article'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components
const ARTICLE = {
  id: 1,
  title: 'First Post',
  body: `Neutra tacos hot chicken prism raw denim, put a bird on it enamel pin post-ironic vape cred DIY. Street art next level umami squid. Hammock hexagon glossier 8-bit banjo. Neutra la croix mixtape echo park four loko semiotics kitsch forage chambray. Semiotics salvia selfies jianbing hella shaman. Letterpress helvetica vaporware cronut, shaman butcher YOLO poke fixie hoodie gentrify woke heirloom.`,
  createdAt: '2020-01-01T12:34:45Z',
}

const bodyEllipsis = 'Neutra tacos hot chi...'

describe('Article', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Article article={ARTICLE} />)
    }).not.toThrow()
  })

  it('renders comments with a full post', async () => {
    const comment = standard().comments[0]
    render(<Article article={ARTICLE} />)

    expect(screen.getByText(ARTICLE.title)).toBeInTheDocument()
    expect(screen.getByText(ARTICLE.body)).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText(comment.body)).toBeInTheDocument()
    })
  })

  it('not renders comments with a summary post', async () => {
    const comment = standard().comments[0]
    render(<Article article={ARTICLE} summary={true} />)

    expect(screen.getByText(ARTICLE.title)).toBeInTheDocument()
    expect(screen.getByText(bodyEllipsis)).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.queryByText(comment.body)).not.toBeInTheDocument()
    })
  })

  it('renders a summary post', () => {
    render(<Article article={ARTICLE} summary={true} />)

    expect(screen.getByText(ARTICLE.title)).toBeInTheDocument()
    expect(screen.getByText(bodyEllipsis)).toBeInTheDocument()
  })
})
