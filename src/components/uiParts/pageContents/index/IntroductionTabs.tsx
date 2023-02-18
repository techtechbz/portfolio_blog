import { FC, memo, ReactNode, SyntheticEvent } from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { PlanningParts } from './PlanningParts';

import indexCss from '@/styles/pageCss/index.module.css'


interface TabPanelProps {
  children: ReactNode;
  index: number;
  value: number;
}

const TabPanel: FC<TabPanelProps> = memo((props: TabPanelProps) => {
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

interface Props {
  tabValue: number;
  handleChange: (event: SyntheticEvent, newValue: number) => void;
}

export const IntroductionTabs: FC = memo(({tabValue, handleChange}: Props) => {
  return (
    <div className={indexCss.IntroductionContainer}>
      <Tabs className={indexCss.IntroductionTabs} value={tabValue} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="読者のみなさまへ" {...a11yProps(0)} />
        <Tab label="企業担当のみなさまへ" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <PlanningParts />
      </TabPanel>
    </div>
  );
})