import { FormEvent, FC, memo, SyntheticEvent } from "react"

import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';

import SubmitButton from "@/uiElements/button/SubmitButton";
import MessageSummarySelector from "@/uiElements/form/MessageSummarySelector";
import StatusSnackbar from "@/uiElements/form/StatusSnackbar";

import contactPageCss from "@/styles/pageCss/contact.module.css"
import { snackbarData } from "@/types/contactFormData";


type Props = {
  /* eslint no-unused-vars: 0 */
  onSubmitContactFormData: (e: FormEvent<HTMLFormElement>) => void,
  onLoading: boolean
  isSnackbarOpen: boolean
  snackbarData: snackbarData
  /* eslint no-unused-vars: 0 */
  handleSnackbarClose: (event?: SyntheticEvent | Event, reason?: string) => void
}

const ContactPageLayout: FC<Props> = memo((props: Props) => {
  const {onSubmitContactFormData, onLoading, isSnackbarOpen, snackbarData, handleSnackbarClose} = props

  return (
    <div className={contactPageCss.ContactPageContainer}>
      <h1 className={contactPageCss.ContactPageTitle}>お問い合わせ</h1>
      <form onSubmit={onSubmitContactFormData}>
        <div className={contactPageCss.ContactElemetsContainer}>
          <TextField required fullWidth id="firstName" label="姓" variant="outlined" />
        </div>
        <div className={contactPageCss.ContactElemetsContainer}>
          <TextField required fullWidth id="lastName" label="名" variant="outlined" />
        </div>
        <div className={contactPageCss.ContactElemetsContainer}>
          <TextField required fullWidth id="email" type="email" label="メールアドレス" placeholder="name@example.com" variant="outlined" />
        </div>
        <div className={contactPageCss.ContactElemetsContainer}>
          <MessageSummarySelector />
        </div>
        <div className={contactPageCss.ContactElemetsContainer}>
          <TextField required fullWidth multiline rows={4} id="message" label="詳細" placeholder="お問い合わせの詳細をこちらにご入力ください。" variant="outlined" />
        </div>
        <div className={contactPageCss.ContactElemetsContainer}>
          <SubmitButton onLoading={onLoading} type="submit">
            {onLoading ? <CircularProgress color="inherit" /> : "送信"}
          </SubmitButton>
        </div>
      </form>
      <StatusSnackbar {...snackbarData} isOpen={isSnackbarOpen && !onLoading} handleClose={handleSnackbarClose} />
    </div>
  )
})
        
export default ContactPageLayout