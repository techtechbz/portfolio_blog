import { FC, memo, useState } from "react"

import { styled } from "@mui/system"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { MessageSummary } from "@/lib/contact/messageSummary";


const CustomSelectorFormControl = styled(FormControl)(() => ({
  minWidth: "160px"
}))

export const MessageSummarySelector: FC = memo(() => {
  const [summary, setSummary] = useState("");
  const messageSummary = new MessageSummary()

  const handleChange = (e: SelectChangeEvent) => {
    setSummary(e.target.value);
  };

  return (
    <CustomSelectorFormControl>
      <InputLabel id="summary-label">お問い合わせ内容</InputLabel>
      <Select
        required
        autoWidth
        labelId="summary-label"
        value={summary}
        onChange={handleChange}
        inputProps={{id: "summary"}}
      >
        {messageSummary.messageSummaryList.map(([key, value]) => {
          return <MenuItem value={key} key={key}>{value}</MenuItem>
        })}
      </Select>
    </CustomSelectorFormControl>
  );
})
