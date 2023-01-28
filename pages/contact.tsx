import { FormEvent, SyntheticEvent, useCallback, useState } from 'react'
import { GetStaticProps } from "next"

import ContactPageLayout from "@/layouts/perPage/ContactPageLayout"
import { useContactForm } from '@/common/hooks/useContactForm';
import { contactFormData, snackbarData } from '@/types/contactFormData';


export default function Contact() {
  const [contactFormData, setContactFormData] = useState({})
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const [snackbarData, setSnackbarData] = useState<snackbarData>({title: '', status: "error"})
  const {sendContactData, onLoading} = useContactForm()

  const handleSnackbarClose = useCallback((event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackbarOpen(false);
  }, []);

  const onSubmitContactFormData = async (e: FormEvent<HTMLFormElement>) => {
    const isConfirm = confirm(`以下の内容で送信しますか?\nお問い合わせ内容:\n${e.currentTarget.message.value}`)
    if (!isConfirm) return
    
    e.preventDefault()
    const inputData: contactFormData = {
      firstName: e.currentTarget.firstName.value,
      lastName: e.currentTarget.lastName.value,
      email: e.currentTarget.email.value,
      summary: e.currentTarget.summary.value,
      message: e.currentTarget.message.value,
    }
    if (inputData !== contactFormData) {
      setContactFormData(inputData)
      setSnackbarData(sendContactData(inputData))
    } else {
      setSnackbarData({title: 'このデータは送信済みです。', status: "error"})
    }
    setIsSnackbarOpen(true)
  }

  return(
    <ContactPageLayout {...{onSubmitContactFormData, onLoading, isSnackbarOpen, snackbarData, handleSnackbarClose}} />
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: "お問い合わせ",
      description: "お問い合わせはこちらから"
    }
  }
}
