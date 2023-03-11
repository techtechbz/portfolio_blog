import axios, { AxiosError } from "axios";

import { contactFormData, contactResultData } from "@/types/contactFormData";
import { UnexpectedBehaviorError } from "@/lib/error/unexpectedBehaviorError";


export const useContactForm = () => {
  const sendContactFormData = (contactFormData: contactFormData): contactResultData => {
    const sendContactResultData: contactResultData = {title: "", status: "error"}
    
    const axiosOption = {
      headers: {'Content-Type': 'application/json',
                "Accept": "/"},
      withCredentials: true,
      credential: "same-origin"
    }
    axios.post('/api/contact', JSON.stringify(contactFormData), axiosOption)
      .then((res) => {
        if (res.status === 200) {
          sendContactResultData.title = "お問い合わせメッセージを送信しました。ありがとうございました。"
          sendContactResultData.status = "success"
        }
      })
      .catch((error) => {
        if (!(error instanceof AxiosError)) throw new UnexpectedBehaviorError('意図しないエラーです。')
        if (error.response) { 
          sendContactResultData.title = error.response.data
        } else {
          sendContactResultData.title = "サーバー内でエラーが発生しました。"
        }
    })
    return sendContactResultData
  };
  return sendContactFormData
}