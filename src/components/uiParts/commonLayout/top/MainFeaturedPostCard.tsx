import { FC, memo } from "react"

import Card from "@mui/material/Card";

import { postMatterResultOverviews } from "@/types/matterResultData";
import { MainPostActionArea } from "./parts/MainPostActionArea";
import { TopBackgroundImage } from "./parts/TopBackgroundImage";

import postIndexCss from "@/styles/pageCss/postIndex.module.css"


type Props = {
  mainFeaturedPostCardData: postMatterResultOverviews
}

export const MainFeaturedPostCard: FC<Props> = memo(({ mainFeaturedPostCardData }: Props) => {
  return (
    <Card raised>
      <MainPostActionArea component="a" href={`/posts/${mainFeaturedPostCardData.id}`}>
        <TopBackgroundImage src={mainFeaturedPostCardData.eyecatchFile} alt="Main featured post's header image">
          <div className={postIndexCss.MainFeaturedPostContainer}>
            <h2 className={postIndexCss.MainFeaturedPostTitle}>{mainFeaturedPostCardData.title}</h2>
            <h3 className={postIndexCss.MainFeaturedPostDescription}>{mainFeaturedPostCardData.description}</h3>
          </div>
        </TopBackgroundImage>
      </MainPostActionArea>
    </Card>
  );
})