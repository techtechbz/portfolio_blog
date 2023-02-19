import { FC, memo, SyntheticEvent, useState } from "react"

import { featuredPostsCardData } from "@/types/cardData";
import { HomeMainTopWindow } from "@/uiParts/pageContents/index/HomeMainTopWindow";
import { IntroductionTabPanel, IntroductionTabs } from "@/uiParts/pageContents/index/IntroductionTabs";
import { SitePresentationPart } from "@/uiParts/pageContents/index/SitePresentationPart";
import { PlanningParts } from "@/uiParts/pageContents/index/PlanningParts";
import { AuthorIntroduction } from "@/uiParts/pageContents/index/authorIntroduction/AuthorIntroduction";
import { WhatsNew } from "@/uiParts/pageContents/index/WhatsNew";
import { FeaturedPagesLineUpPart } from "@/uiParts/commonLayout/card/cardLineUp/FeaturedPagesLineUpPart";

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
        <div className={indexCss.IndexFlexBox}>
          <div className={indexCss.IndexContents}>
            <WhatsNew />
          </div>
          <div className={indexCss.IndexSideMenu}>
            <AuthorIntroduction />
          </div>
        </div>
      </div>
    </>
  );
})

export default HomeLayout