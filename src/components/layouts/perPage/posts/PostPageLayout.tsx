import { FC, memo, ReactNode } from "react"
import Image from "next/image"

import { htmlPostData, postData } from "@/types/postData";
import BackToHomeLink from "@/uiElements/link/BackToHomeLink";
import PostBreadCrumbs from "@/uiElements/link/PostBreadCrumbs";
import PostDate from  "@/uiElements/text/PostDate";
import RelatedPostsContentsPart from "@/uiParts/contents/RelatedPostsContentsPart";
import { MIN_MOBILE_WIDTH_QUERY } from "@/lib/themes/defaultTheme";

import staticPageCss from "@/styles/pageCss/staticPage.module.css"


type Props = {
  postData: htmlPostData
  relatedPostsData: ReadonlyArray<postData>
  isMobile: boolean
  children: ReactNode
}

const PostPageLayout: FC<Props> = memo(({ postData, relatedPostsData, isMobile, children }: Props) => {
  return (
    <>
      <div className={staticPageCss.PostContainer}>
        <div className={staticPageCss.PostBreadCrumbs}>
          <PostBreadCrumbs postId={postData.id} postTitle={postData.title} />
        </div>
        <h1 className={staticPageCss.PostTitle}>{postData.title}</h1>
        <div className={staticPageCss.PostDate}>
          <PostDate dateString={postData.date} />
        </div>
        <div className={staticPageCss.PostImageContainer}>
          <Image src={`/images/${postData.eyecatchFile}`} alt="post header image" fill priority sizes={`${MIN_MOBILE_WIDTH_QUERY} 280px, 440px`} />
        </div>
        {children}
        <BackToHomeLink />
        <RelatedPostsContentsPart {...{relatedPostsData, isMobile}} />
      </div>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.16.3/dist/katex.min.css"
        integrity="sha384-Juol1FqnotbkyZUT5Z7gUPjQ9gzlwCENvUZTpQBAPxtusdwFLRy382PSDx5UUJ4/"
        crossOrigin="anonymous"
      />
    </>
  );
})

export default PostPageLayout