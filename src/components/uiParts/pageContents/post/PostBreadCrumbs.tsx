import { FC, memo } from "react"

import Breadcrumbs from "@mui/material/Breadcrumbs";

import { PostCategory } from "@/lib/posts/dataHandler/postCategory";
import BlackTextLink from "../../../uiElements/link/BlackTextLink";

import postCss from "@/styles/pageCss/staticPage.module.css";


type Props = {
  postId: string
  postTitle: string
}

const PostBreadCrumbs: FC<Props> = memo(({ postId, postTitle }: Props) => {
  const postDirectory = postId.split("/")[0]
  const postCategoryName = new PostCategory().categoryNamesList[postDirectory]
  return(
    <Breadcrumbs separator=">" aria-label="post breadcrumb">
      <div className={postCss.PostBreadCrumbsLink}>
        <BlackTextLink href="/posts">
          投稿一覧
        </BlackTextLink>
      </div>
      <div className={postCss.PostBreadCrumbsLink}>
        <BlackTextLink href={`/posts/${postDirectory}`}>
          {postCategoryName}
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