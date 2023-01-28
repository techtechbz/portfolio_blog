import { FC, memo, useState } from "react"

import { styled } from "@mui/system"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


const CustomFormControl = styled(FormControl)(() => ({
  minWidth: "160px"
}))

const MessageSummarySelector: FC = memo(() => {
  const [summary, setSummary] = useState("");

  const handleChange = (e: SelectChangeEvent) => {
    setSummary(e.target.value);
  };

  return (
    <CustomFormControl>
      <InputLabel id="summary-label">お問い合わせ内容</InputLabel>
      <Select
        required
        autoWidth
        labelId="summary-label"
        value={summary}
        onChange={handleChange}
        inputProps={{id: "summary"}}
      >
        <MenuItem value="defect">誤記・不具合の報告</MenuItem>
        <MenuItem value="scout">お仕事のご依頼</MenuItem>
        <MenuItem value="other">その他</MenuItem>
      </Select>
    </CustomFormControl>
  );
})

export default MessageSummarySelector