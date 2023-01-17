import { FC, memo } from "react"

import Breadcrumbs from "@mui/material/Breadcrumbs";

import { BLOG_CATEGORIES_LIST } from "@/constants/blogCategories";
import BlackTextLink from "./BlackTextLink";

import postCss from "@/styles/pageCss/post.module.css";


type Props = {
  postId: string
  postTitle: string
}

const PostBreadCrumbs: FC<Props> = memo(({ postId, postTitle }: Props) => {
  const postCategory = postId.split("/")[0]
  return(
    <Breadcrumbs separator=">" aria-label="post breadcrumb">
      <div className={postCss.PostBreadCrumbsLink}>
        <BlackTextLink href="/posts">
          投稿一覧
        </BlackTextLink>
      </div>
      <div className={postCss.PostBreadCrumbsLink}>
        <BlackTextLink href={`/posts/${postCategory}`}>
          {BLOG_CATEGORIES_LIST[postCategory].text}
        </BlackTextLink>
      </div>
      <div className={postCss.PostBreadCrumbsLink}>
        <BlackTextLink href={`/posts/${postId}`}>
          {postTitle}
        </BlackTextLink>
      </div>
    </Breadcrumbs>
  )
})

export default PostBreadCrumbs