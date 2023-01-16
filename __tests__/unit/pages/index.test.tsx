import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen } from '@testing-library/react'

import HomePage from '../../../pages/index'

const dummyPostsData = {
  id: "coding/test",
  title: "無題",
  description: "test",
  date: "2023-1-01",
  eyecatchFile: "blackboard.jpg",
  relatedPostsIds: []
}

const handlers = [
  rest.get('/', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(
        {
          title: "テスト",
          description: "テストです",
          featuredPostsData: [dummyPostsData, dummyPostsData],
          recentPostsData: [{...dummyPostsData, contentHtml: ""},],
        }
      )
    )
  })
]

const server = setupServer(...handlers)

beforeAll(() => {
  server.listen();
})

afterEach(() => {
  server.resetHandlers();
})

afterAll(() => {
  server.close();
})

describe('Home', () => {
  it('renders a heading', async () => {
    const homePageProps = {
      featuredPostsData: [dummyPostsData, dummyPostsData],
      recentPostsData: [{...dummyPostsData, contentHtml: ""},],
      isMobile: true
    }

    render(<HomePage {...homePageProps} />);

    const heading = screen.getByRole('heading', {
      name: /サンプルサイト/i,
    })

    expect(heading).toBeInTheDocument()
  })
})