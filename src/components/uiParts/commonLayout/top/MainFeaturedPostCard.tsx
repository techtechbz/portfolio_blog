import { FC, memo } from "react"

import Card from "@mui/material/Card";

import { postMatterResultOverviews } from "@/types/matterResultData";
import { MainPostActionArea } from "./parts/MainPostActionArea";
import { TopBackgroundImage } from "./parts/TopBackgroundImage";

import indexCss from "@/styles/pageCss/index.module.css"


type Props = {
  mainFeaturedPostCardData: postMatterResultOverviews
}

export const MainFeaturedPostCard: FC<Props> = memo(({ mainFeaturedPostCardData }: Props) => {
  return (
    <Card raised>
      <MainPostActionArea component="a" href={`/posts/${mainFeaturedPostCardData.id}`}>
        <TopBackgroundImage src={mainFeaturedPostCardData.eyecatchFile} alt="Main featured post's header image">
          <div className={indexCss.MainFeaturedPostContainer}>
            <h2 className={indexCss.MainFeaturedPostTitle}>{mainFeaturedPostCardData.title}</h2>
            <h3 className={indexCss.MainFeaturedPostDescription}>{mainFeaturedPostCardData.description}</h3>
          </div>
        </TopBackgroundImage>
      </MainPostActionArea>
    </Card>
  );
})