import axios, { AxiosError } from "axios";

import { UnexpectedBehaviorError } from "@/lib/error/unexpectedBehaviorError";


export const useRecaptcha = () => {
  const handleRecaptcha = async (action, key) => {
    let isRecaptchaPass = false
    const token = await grecaptcha.enterprise?.execute(key, {
      action: "LOGIN",
    });
    const options = {
      headers: {'Content-Type': 'application/json', "Accept": "/"},
    };
    axios.post('/api/recaptcha', JSON.stringify({ token, action: action }), options)
      .then((res) => {
        isRecaptchaPass = res.score > 0.6
      })
      .catch((error) => {
        if (!(error instanceof AxiosError)) throw new UnexpectedBehaviorError('意図しないエラーです。')
      })
      return isRecaptchaPass
    }
  return handleRecaptcha
}