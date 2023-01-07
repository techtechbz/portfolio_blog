import { FC, memo, ReactNode } from "react"
import Image from "next/image"

import { htmlPostData, postData } from "src/common/types/postData";
import BackToHomeLink from "src/components/uiElements/link/BackToHomeLink";
import PostBreadCrumbs from "src/components/uiElements/link/PostBreadCrumbs";
import PostDate from  "src/components/uiElements/text/PostDate";
import RelatedPostsContentsPart from "src/components/uiParts/contents/RelatedPostsContentsPart";
import { MIN_MOBILE_WIDTH_QUERY } from "src/lib/themes/defaultTheme";

import postCss from "src/common/styles/pageCss/post.module.css"


type Props = {
  postData: htmlPostData
  relatedPostsData: ReadonlyArray<postData>
  children: ReactNode
}

const PostPageLayout: FC<Props> = memo(({ postData, relatedPostsData, children }: Props) => {
  return (
    <>
      <div className={postCss.PostContainer}>
        <div className={postCss.PostBreadCrumbs}>
          <PostBreadCrumbs postId={postData.id} postTitle={postData.title} />
        </div>
        <h1 className={postCss.PostTitle}>{postData.title}</h1>
        <div className={postCss.PostDate}>
          <PostDate dateString={postData.date} />
        </div>
        <div className={postCss.PostImageContainer}>
          <Image src={`/images/${postData.eyecatchFile}`} alt="post header image" fill priority sizes={`${MIN_MOBILE_WIDTH_QUERY} 280px, 440px`} />
        </div>
        {children}
        <BackToHomeLink />
        <RelatedPostsContentsPart {...{relatedPostsData}} />
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