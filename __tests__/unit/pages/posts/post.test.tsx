import fs from 'fs'

import { getStaticProps, getStaticPaths } from '@/pages/posts/[...id]'
import "@/matchers/posts/toBeFetchedPostPageData"
import "@/matchers/posts/toBeFetchedCardData"
import { postPageData } from '@/types/matterResultData'
import { featuredPostsCardData } from '@/types/cardData'


type staticPagePaths = {
  paths?: ReadonlyArray<{params: { id: string }}>
  fallback?: boolean
}

type staticPageProps = {
  title?: string
  description?: string
  postData?: postPageData
  relatedPostsCardData?: featuredPostsCardData
}

describe('Post page test', () => {
  let staticPaths: staticPagePaths
  let staticProps: staticPageProps

  it('Fetching static paths test', async () => {
    staticPaths = await getStaticPaths()
    expect(staticPaths.paths).not.toBeUndefined()
  })

  it('Static paths test', () => {
    for (const path of staticPaths.paths) {
      expect(Array.isArray(path.params.id)).toBe(true)
      expect(fs.existsSync(`/app/postsMd/${path.params.id.join("/")}.md`)).toBe(true)
    }
  })

  it('Page fallback test', () => {
    expect(staticPaths.fallback).toBe(false)
  })

  it.each([
    {id: ['math', 'valid']},
    {id: ['math', 'valid-second']},
  ])('Fetching static props test ($id)', async ({id}) => {
    const dummyContext = {params: {id}, locales: undefined, locale: undefined, defaultLocale: undefined}
    const staticPageData = await getStaticProps(dummyContext)
    staticProps = staticPageData.props
    expect(staticProps).not.toBeUndefined()
  })

  it('Page title test', async () => {
    expect(typeof staticProps.title).toBe('string')
  })
  
  it('Page description test', async () => {
    expect(typeof staticProps.description).toBe('string')
  })
  
  it('Fetching page contents data test', async () => {
    expect(staticProps.postData).toBeFetchedPostPageData()
  })
  
  it('relatedPostsData test ($id)', async () => {
    expect(staticProps.relatedPostsCardData).toBeFetchedFeaturedPostsCardData()
  })
})