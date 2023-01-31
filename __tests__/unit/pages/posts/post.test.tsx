import fs from 'fs'

import { getStaticProps, getStaticPaths } from '@/pages/posts/[...id]'
import "@/matchers/posts/toBeFetchedPostPageData"
import "@/matchers/posts/toBeFetchedCardData"
import { postPageData } from '@/common/types/matterResultData'
import { featuredPostsCardData } from '@/common/types/cardData'


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

  it('Fetching static props test', async () => {
    const dummyContext = {params: {id: ['math', 'ai-formula']}, locales: undefined, locale: undefined, defaultLocale: undefined}
    const staticPageData = await getStaticProps(dummyContext)
    staticProps = staticPageData.props
    expect(staticProps).not.toBeUndefined()
  })
  
  it('Page title test', () => {
    expect(typeof staticProps.title).toBe('string')
  })

  it('Page description test', async () => {
    expect(typeof staticProps.description).toBe('string')
  })

  it('Fetching page contents data test', async () => {
    expect(staticProps.postData).toBeFetchedPostPageData()
  })

  it('relatedPostsData test', async () => {
    expect(staticProps.relatedPostsCardData).toBeFetchedFeaturedPostsCardData()
  })
})