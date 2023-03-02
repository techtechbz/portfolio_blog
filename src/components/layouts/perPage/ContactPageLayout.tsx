import { FormEvent, FC, memo, SyntheticEvent, useCallback, useState } from "react"

import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';

import { contactFormData, contactResultData } from "@/types/contactFormData";
import { SubmitButton } from "@/uiParts/pageContents/contact/SubmitButton";
import { MessageSummarySelector } from "@/uiParts/pageContents/contact/MessageSummarySelector";
import { ContactResultSnackbar } from "@/uiParts/pageContents/contact/ContactResultSnackbar";

import contactPageCss from "@/styles/pageCss/contact.module.css"


type Props = {
  fetchContactResult: (inputData: contactFormData) => Promise<contactResultData>
  onLoading: boolean
}

const ContactPageLayout: FC<Props> = memo((props: Props) => {
  const { fetchContactResult, onLoading } = props
  const [snackbarData, setSnackbarData] = useState<contactResultData>({title: '', status: "error"})
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  
  const onSubmitContactFormData = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isConfirm = confirm("フォームを送信しますか?")
    if (isConfirm) {
      const inputData: contactFormData = {
        firstName: e.currentTarget.firstName.value,
        lastName: e.currentTarget.lastName.value,
        email: e.currentTarget.email.value,
        summary: e.currentTarget.summary.value,
        message: e.currentTarget.message.value,
      }
      const result = await fetchContactResult(inputData)
      setSnackbarData(result)
      setIsSnackbarOpen(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSnackbarClose = useCallback((event?: SyntheticEvent | Event, reason?: string) => {
    if (reason !== 'clickaway') setIsSnackbarOpen(false);
  }, []);

  return (
    <div className={contactPageCss.ContactPageContainer}>
      <h1 className={contactPageCss.ContactPageTitle}>お問い合わせ</h1>
      <div className={contactPageCss.ContactElementsContainer}>
        <p>お問い合わせは以下のフォームよりお願いします。</p>
      </div>
      <form onSubmit={onSubmitContactFormData}>
        <div className={contactPageCss.InputNameRowContainer}>
          <div className={contactPageCss.InputNameContainer}>
            <TextField required fullWidth id="firstName" label="姓" variant="outlined" />
          </div>
          <div className={contactPageCss.InputNameContainer}>
            <TextField required fullWidth id="lastName" label="名" variant="outlined" />
          </div>
        </div>
        <div className={contactPageCss.ContactElementsContainer}>
          <TextField required fullWidth id="email" type="email" label="メールアドレス" placeholder="name@example.com" variant="outlined" />
        </div>
        <div className={contactPageCss.ContactElementsContainer}>
          <MessageSummarySelector />
        </div>
        <div className={contactPageCss.ContactElementsContainer}>
          <TextField required fullWidth multiline rows={4} id="message" label="詳細"
           placeholder="お問い合わせの詳細をこちらにご入力ください(改行・空白等を除いて10文字以上)。" variant="outlined" />
        </div>
        <div className={contactPageCss.SubmitButtonContainer}>
          <SubmitButton onLoading={onLoading} type="submit">
            {onLoading ? <CircularProgress color="inherit" /> : "送信"}
          </SubmitButton>
        </div>
      </form>
      <ContactResultSnackbar {...snackbarData} isOpen={isSnackbarOpen && !onLoading} handleClose={handleSnackbarClose} />
    </div>
  )
})
        
export default ContactPageLayout