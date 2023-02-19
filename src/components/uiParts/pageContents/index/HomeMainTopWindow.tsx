import { FC, memo } from "react"

import { TopBackgroundImage } from "@/uiParts/commonLayout/top/parts/TopBackgroundImage";

import indexCss from "@/styles/pageCss/index.module.css"


export const HomeMainTopWindow: FC = memo(() => {
  return (
    <TopBackgroundImage src="home.jpg" alt="Image of home top">
      <div className={indexCss.HomeMainTopWindow}>
        <h1 className="TopWindowTitle">サンプル</h1>
        <h2 className="TopWindowDescription">副題やキャッチコピーなどをここに挿入することができます。</h2>
      </div>
    </TopBackgroundImage>
  );
})
