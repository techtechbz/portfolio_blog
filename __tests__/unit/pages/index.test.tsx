import { render, screen } from '@testing-library/react'

import HomePage, { getStaticProps } from '../../../pages/index'


describe('Home', () => {
  it('renders a heading', async () => {
    const homePageProps = await getStaticProps()

    render(<HomePage {...{...homePageProps.props, isMobile: true}} />);

    const heading = screen.getByRole('heading', {
      name: /サンプル/i,
    })

    expect(heading).toBeInTheDocument()
  })
})