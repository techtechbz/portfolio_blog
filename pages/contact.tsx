import { useState } from 'react'
import { GetStaticProps } from "next"

import { useContactForm } from '@/common/hooks/useContactForm';
import { contactFormData, contactMessage, contactResultData } from '@/types/contactFormData';
import ContactPageLayout from "@/layouts/perPage/ContactPageLayout"
import { contactFromDataValidator } from '@/lib/contact/contactFormDataValidator';
import { ValidationError } from '@/lib/error/validationError';
import { UnexpectedBehaviorError } from '@/lib/error/unexpectedBehaviorError';


export default function Contact() {
  const [formerContactMessage, setFormerContactMessage] = useState<contactMessage>({summary: "empty", message: ""})
  const {sendContactFormData, onLoading} = useContactForm()

  const fetchContactResult = async (inputData: contactFormData): Promise<contactResultData> => {
    if (inputData.message !== formerContactMessage.message) {
      const result = await sendContactFormData(inputData)
      if (result.status === "success") {
        const {summary, message} = inputData
        setFormerContactMessage({summary, message})
      }
      return result
    } else {
      return {title: 'このメッセージは送信済みです。', status: "error"}
    }
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
