import { useState } from "react";

import axios from "axios";

import { contactFormData, snackbarData } from "@/types/contactFormData";


export const useContactForm = () => {
  const [onLoading, setOnLoading] = useState(false)
  const sendContactData = (contactFormData: contactFormData) => {
    const sendContactResultData: snackbarData = {title: "", status: "error"}
    setOnLoading(true);
    axios
      .post('/api/contact', JSON.stringify(contactFormData))
      .then((res) => {
        if (res.status === 200) {
          sendContactResultData.title = "お問い合わせメッセージを送信しました。ありがとうございました。"
          sendContactResultData.status = "success"
        } else {
          sendContactResultData.title = "メッセージ送信中にエラーが発生しました。入力内容をご確認ください。"
        }
      })
      .catch(() => {
        sendContactResultData.title = "メッセージ送信中にエラーが発生しました。入力内容をご確認ください。"
      }).finally(() => {
        setOnLoading(false);
      })
    return sendContactResultData
  };
  return {sendContactData, onLoading}
}