import { FC, memo } from "react"
import Image from "next/image"

import { featuredPostsCardData } from "@/types/cardData";
import { postPageData } from "@/types/matterResultData";
import BackToHomeLink from "@/uiElements/link/BackToHomeLink";
import PostBreadCrumbs from "@/uiElements/link/PostBreadCrumbs";
import PostDate from  "@/uiElements/text/PostDate";
import RelatedPostsContentsPart from "@/uiParts/contents/RelatedPostsContentsPart";
import { MIN_MOBILE_WIDTH_QUERY } from "@/lib/themes/defaultTheme";

import staticPageCss from "@/styles/pageCss/staticPage.module.css"


type Props = {
  postData: postPageData
  relatedPostsCardData: featuredPostsCardData
  isDesktop: boolean
}

const PostPageLayout: FC<Props> = memo(({ postData, relatedPostsCardData, isDesktop }: Props) => {
  return (
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
      <div className={staticPageCss.PageContents} dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      <BackToHomeLink />
      <RelatedPostsContentsPart {...{relatedPostsCardData, isDesktop}} />
    </div>
  );
})

export default PostPageLayout