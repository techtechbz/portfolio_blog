import { FC, memo } from "react"

import Card from "@mui/material/Card";

import { postData } from "src/common/types/postData";
import MainPostActionArea from "./parts/MainPostActionArea";
import TopBackgroundImage from "./parts/TopBackgroundImage";

import indexCss from "src/common/styles/pageCss/index.module.css"


type Props = {
  mainFeaturedPostData: postData
}

const MainFeaturedPost: FC<Props> = memo(({ mainFeaturedPostData }: Props) => {
  return (
    <Card raised>
      <MainPostActionArea component="a" href={`/posts/${mainFeaturedPostData.id}`}>
        <TopBackgroundImage src={mainFeaturedPostData.eyecatchFile} alt="Main featured post's header image">
          <div className={indexCss.MainFeaturedPostContainer}>
            <h2 className={indexCss.MainFeaturedPostTitle}>{mainFeaturedPostData.title}</h2>
            <h3 className={indexCss.MainFeaturedPostDescription}>{mainFeaturedPostData.description}</h3>
          </div>
        </TopBackgroundImage>
      </MainPostActionArea>
    </Card>
  );
})

export default MainFeaturedPost