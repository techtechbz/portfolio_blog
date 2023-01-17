import { useEffect } from 'react'
import { GetStaticProps, GetStaticPaths } from "next"

import Prism from 'prismjs'
import 'prismjs/themes/prism-okaidia.css'
import 'prismjs/plugins/autolinker/prism-autolinker'
import 'prismjs/plugins/autoloader/prism-autoloader'
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/plugins/toolbar/prism-toolbar'
import 'prismjs/plugins/show-language/prism-show-language'
import Slugger from 'github-slugger'
import { ParsedUrlQuery } from "querystring"

import { htmlPostData, postData } from "@/types/postData"
import { CLOBBER_PREFIX } from 'src/common/constants/postConfig'
import PostPageLayout from "@/layouts/perPage/posts/PostPageLayout"
import { getAllMdFilePaths } from "@/lib/posts/globFileData/getAllMdFilePaths";
import { fullPathToPostId } from "@/lib/posts/dataConverter/fullPathToPostId"
import { getHtmlPageData } from "@/lib/posts/translateToHtml/getHtmlPageData"
import { getFeaturedPostsData } from "@/lib/posts/fetchCardData/getFeaturedPostsData"

import postStyles from "@/styles/pageCss/staticPage.module.css"


interface Params extends ParsedUrlQuery {
  id: Array<string>
}

type Props = {
  postData: htmlPostData
  relatedPostsData: ReadonlyArray<postData>
}

if (Prism.plugins.autoloader) {
  Prism.plugins.autoloader.languages_path = 'https://unpkg.com/prismjs@1.29.0/components/'
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

export default function PostPage({ postData, relatedPostsData }: Props) {
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
    <PostPageLayout {...{postData, relatedPostsData}}>
      <div className={postStyles.PageContents} dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </PostPageLayout>
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
