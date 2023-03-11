import { useState } from 'react'
import { GetStaticProps } from "next"
import Script from "next/script"

import { useContactForm } from '@/hooks/useContactForm';
import { useRecaptcha } from '@/hooks/useRecaptcha';
import { contactFormData, contactMessage, contactResultData } from '@/types/contactFormData';
import ContactPageLayout from "@/layouts/perPage/ContactPageLayout"


export default function Contact() {
  const [formerContactMessage, setFormerContactMessage] = useState<contactMessage>({summary: "empty", message: ""})
  const [onLoading, setOnLoading] = useState(false)
  const sendContactFormData = useContactForm()
  const handleRecaptcha = useRecaptcha()

  const fetchContactMessage = async (inputData: contactFormData): Promise<contactResultData> => {
    if (inputData.message === formerContactMessage.message) return {title: 'このメッセージは送信済みです。', status: "error"}
    
    const isRecaptchaPass = await handleRecaptcha("LOGIN", process.env.NEXT_PUBLIC_RECAPTCHA_KEY)
    if (!isRecaptchaPass) return {title: '不正なアクセスです。', status: "error"}
    
    const contactResult = await sendContactFormData({...inputData})
    if (contactResult.status === "success") {
      const {summary, message} = inputData
      setFormerContactMessage({summary, message})
    }
    return contactResult
  }
  
  const fetchContactResult = async (inputData: contactFormData): Promise<contactResultData> => {
    setOnLoading(true)
    const contactResult = await fetchContactMessage(inputData)
    setOnLoading(false)
    return contactResult
  }

  return(
    <>
      <Script id="recaptcha-enterprise" src={`https://www.google.com/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_KEY}`} strategy='lazyOnload'/>
      <ContactPageLayout {...{fetchContactResult, onLoading}} />
    </>
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
