import { useState } from "react";

import axios, { AxiosError } from "axios";

import { contactFormData, contactResultData } from "@/types/contactFormData";
import { UnexpectedBehaviorError } from "@/lib/error/unexpectedBehaviorError";


// const axiosConfig = {
//   xsrfHeaderName: 'X-CSRF-Token',
//   header: {
//     "content-type": "application/json"
//   }
// }

export const useContactForm = () => {
  const [onLoading, setOnLoading] = useState(false)
  const sendContactFormData = (contactFormData: contactFormData): contactResultData => {
    const sendContactResultData: contactResultData = {title: "", status: "error"}
    setOnLoading(true);
    axios
      .post('/api/contact', JSON.stringify(contactFormData), { xsrfHeaderName: 'X-CSRF-Token', headers: {'Content-Type': 'application/json', "Accept": "application/json"}})
      .then((res) => {
        if (res.status === 200) {
          sendContactResultData.title = "お問い合わせメッセージを送信しました。ありがとうございました。"
          sendContactResultData.status = "success"
        }
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            sendContactResultData.title = error.response.data
          } else {
            sendContactResultData.title = "サーバー内でエラーが発生しました。"
          }
        } else {
          throw new UnexpectedBehaviorError('意図しないエラーです。')
        }
      }).finally(() => {
        setOnLoading(false);
      })
    return sendContactResultData
  };
  return {sendContactFormData, onLoading}
}