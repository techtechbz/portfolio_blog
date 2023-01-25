import { useEffect } from 'react'
import { GetStaticProps, GetStaticPaths } from "next"

import Prism from 'prismjs'
import 'prismjs/themes/prism-okaidia.min.css'
import 'prismjs/plugins/autoloader/prism-autoloader.min'
import 'prismjs/plugins/line-numbers/prism-line-numbers.min'
import 'prismjs/plugins/line-numbers/prism-line-numbers.min.css'
import 'prismjs/plugins/toolbar/prism-toolbar.min'
import 'prismjs/plugins/toolbar/prism-toolbar.min.css'
import 'prismjs/plugins/show-language/prism-show-language.min'
import Slugger from 'github-slugger'
import { ParsedUrlQuery } from "querystring"

import { htmlPostData, postData } from "@/types/postData"
import { CLOBBER_PREFIX } from '@/constants/postConfig'
import PostPageLayout from "@/layouts/perPage/posts/PostPageLayout"
import { getAllMdFilePaths } from "@/lib/posts/globFileData/getAllMdFilePaths";
import { fullPathToPostId } from "@/lib/posts/dataConverter/fullPathToPostId"
import { getHtmlPageData } from "@/lib/posts/translateToHtml/getHtmlPageData"
import { getFeaturedPostsData } from "@/lib/posts/fetchCardData/getFeaturedPostsData"


interface Params extends ParsedUrlQuery {
  id: Array<string>
}

type Props = {
  postData: htmlPostData
  relatedPostsData: ReadonlyArray<postData>
  isMobile: boolean
}

if (Prism.plugins.autoloader) {
  Prism.plugins.autoloader.languages_path = 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/';
}

const hashchange = () => {
  /** @type {string|undefined} */
  let hash
  try {
    const unSluggedHash = decodeURIComponent(location.hash.slice(1))
    const slugs = new Slugger
    slugs.reset()
    hash = slugs.slug(unSluggedHash).toLowerCase()
  } catch {
    return
  }
  const name = CLOBBER_PREFIX + hash
  const target = document.getElementById(name) || document.getElementsByName(name)[0]

  if (target) {
    setTimeout(() => {
      target.scrollIntoView()
    }, 0)
  }
}

export default function PostPage({ postData, relatedPostsData, isMobile }: Props) {
  useEffect(() => {
    window.addEventListener('hashchange', hashchange)
    document.addEventListener(
      'click',
      (event) => {
        if (
          event.target &&
          event.target instanceof HTMLAnchorElement &&
          event.target.href === location.href &&
          location.hash.length > 1
        ) {
          setTimeout(() => {
            if (!event.defaultPrevented) {
              hashchange()
            }
          })
        }
      },
      false
    )
    Prism.highlightAll()
  }, [])

  return(
    <>
      {/<span class="math math-inline">/.exec(postData.contentHtml) && (
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.3/dist/katex.min.css"
          integrity="sha384-Juol1FqnotbkyZUT5Z7gUPjQ9gzlwCENvUZTpQBAPxtusdwFLRy382PSDx5UUJ4/"
          crossOrigin="anonymous"
        />
      )}
      <PostPageLayout {...{postData, relatedPostsData, isMobile}} />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allFilePaths = await getAllMdFilePaths()
  const paths = allFilePaths.map((filePath: string) => (
    { params: { id: fullPathToPostId(filePath).split("/") }}
  ))
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params as Params
  const postData = await getHtmlPageData(`/app/postsMd/${params.id.join("/")}.md`)
  const relatedPostsData = await getFeaturedPostsData(postData.relatedPostsIds)
  return {
    props: {
      title: postData.title,
      description: postData.description,
      postData,
      relatedPostsData
    }
  }
}
