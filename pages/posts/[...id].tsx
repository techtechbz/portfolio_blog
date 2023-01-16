import { useEffect } from 'react'
import { GetStaticProps, GetStaticPaths } from "next"

import Slugger from 'github-slugger'
import { ParsedUrlQuery } from "querystring"

import { htmlPostData, postData } from "@/common/types/postData"
import { CLOBBER_PREFIX } from 'src/common/constants/postConfig'
import PostPageLayout from "@/components/layouts/perPage/posts/PostPageLayout"
import { getAllMdFilePaths } from "@/lib/posts/globFileData/getAllMdFilePaths";
import { fullPathToPostId } from "@/lib/posts/dataConverter/fullPathToPostId"
import { getHtmlPageData } from "@/lib/posts/translateToHtml/getHtmlPageData"
import { getFeaturedPostsData } from "@/lib/posts/fetchCardData/getFeaturedPostsData"

import postStyles from "@/common/styles/pageCss/post.module.css"


interface Params extends ParsedUrlQuery {
  id: Array<string>
}

type Props = {
  postData: htmlPostData
  relatedPostsData: ReadonlyArray<postData>
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
