import { styled } from "@mui/system"
import Toolbar from "@mui/material/Toolbar";


const CustomToolbar = styled(Toolbar)(({ height }: { height: string }) => ({
  height: height,
  margin: "0 5vw"
}))

export default CustomToolbar