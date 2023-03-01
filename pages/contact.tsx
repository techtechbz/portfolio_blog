import { useState } from 'react'
import { GetStaticProps } from "next"

import { useContactForm } from '@/hooks/useContactForm';
import { contactFormData, contactMessage, contactResultData } from '@/types/contactFormData';
import ContactPageLayout from "@/layouts/perPage/ContactPageLayout"


export default function Contact() {
  const [formerContactMessage, setFormerContactMessage] = useState<contactMessage>({summary: "empty", message: ""})
  const {sendContactFormData, onLoading} = useContactForm()

  const fetchContactResult = async (inputData: contactFormData): Promise<contactResultData> => {
    if (inputData.message === formerContactMessage.message) return {title: 'このメッセージは送信済みです。', status: "error"}
    
    const contactResult = await sendContactFormData({...inputData})
    if (contactResult.status === "success") {
      const {summary, message} = inputData
      setFormerContactMessage({summary, message})
    }
    return contactResult
  }

  return(
    <ContactPageLayout {...{fetchContactResult, onLoading}} />
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
