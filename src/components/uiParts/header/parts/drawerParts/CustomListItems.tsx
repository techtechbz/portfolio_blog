import { styled } from "@mui/system"
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton"


export const CustomListItemText = styled(ListItemText)(() => ({
  paddingLeft: 10
}))
        
export const CustomListItemButton = styled(ListItemButton)(() => ({
  padding: "2px 16px"
}))