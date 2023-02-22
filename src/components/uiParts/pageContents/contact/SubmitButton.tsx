import { FC, memo, ReactNode } from "react"

import Button from '@mui/material/Button';


type Props = {
  children: ReactNode;
  disabled?: boolean;
  onLoading?: boolean;
  type?: "button" | "reset" | "submit" | undefined
}

export const SubmitButton: FC<Props> = memo((props: Props) => {
  const { children, disabled = false, onLoading = false, type = "button" } = props;
  return (
    <Button
      fullWidth
      variant="contained"
      disabled={disabled || onLoading}
      type={type}
    >
      {children}
    </Button>
  );
});
