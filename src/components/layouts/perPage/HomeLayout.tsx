import { FC, memo, SyntheticEvent, useState } from "react"

import { featuredPostsCardData } from "@/types/cardData";
import { AuthorIntroduction } from "@/uiParts/pageContents/index/authorIntroduction/AuthorIntroduction";
import { IntroductionTabPanel, IntroductionTabs } from "@/uiParts/pageContents/index/IntroductionTabs";
import { SitePresentationPart } from "@/uiParts/pageContents/index/SitePresentationPart";
import { PlanningParts } from "@/uiParts/pageContents/index/PlanningParts";
import { FeaturedPagesLineUpPart } from "@/uiParts/pageContents/blogIndex/FeaturedPagesLineUpPart";
import { HomeMainTopWindow } from "@/uiParts/commonLayout/top/HomeMainTopWindow";

import indexCss from "@/styles/pageCss/index.module.css";


type Props = {
  featuredPostsCardData: featuredPostsCardData
  isDesktop: boolean
}

const HomeLayout: FC<Props> = memo(({ featuredPostsCardData, isDesktop }: Props) => {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  }
  
  return (
    <>
      <HomeMainTopWindow />
      <div className={indexCss.IntroductionContainer}>
        <IntroductionTabs {...{tabValue, handleChange}} />
        <IntroductionTabPanel value={tabValue} index={0}>
          <SitePresentationPart />
          <div className={indexCss.IndexContainer}>
            <FeaturedPagesLineUpPart
              heading="オススメの投稿"
              {...{featuredPostsCardData, isDesktop}}
            />
          </div>
        </IntroductionTabPanel>
        <IntroductionTabPanel value={tabValue} index={1}>
          <PlanningParts />
        </IntroductionTabPanel>
      </div>
      <div className={indexCss.IndexContainer}>
        <AuthorIntroduction />
      </div>
    </>
  );
})

export default HomeLayout