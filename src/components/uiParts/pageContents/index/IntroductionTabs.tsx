import { FC, memo, ReactNode, SyntheticEvent } from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import indexCss from '@/styles/pageCss/index.module.css'


interface TabPanelProps {
  children: ReactNode;
  index: number;
  value: number;
}

export const IntroductionTabPanel: FC<TabPanelProps> = memo((props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <>{children}</>
      )}
    </div>
  );
})

const a11yProps = (index: number) => {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

type Props = {
  tabValue: number;
  handleChange: (event: SyntheticEvent, newValue: number) => void;
}

export const IntroductionTabs: FC<Props> = memo(({tabValue, handleChange}: Props) => {
  return (
    <Tabs className={indexCss.IntroductionTabsMenu} value={tabValue} onChange={handleChange} aria-label="introduction tabs">
      <Tab className={indexCss.IntroductionTab} label="読者のみなさま" {...a11yProps(0)} />
      <Tab className={indexCss.IntroductionTab} label="企業担当の方" {...a11yProps(1)} />
    </Tabs>
  );
})