import { contactFormData } from "@/types/contactFormData";
import { ValidationError } from "../error/validationError";
import { MessageSummary } from "./messageSummary";


const messageSummary = new MessageSummary()

export const emailValidator = (email: string) => {
  const emailPattern = /^[a-zA-Z0-9.+_-]+@([a-zA-Z0-9_-]+\.)+[a-zA-Z]+$/
  if (!email) throw new ValidationError('メールアドレスが記述されていません')
  if (!emailPattern.exec(email)) throw new ValidationError('メールアドレスが不正な値です')
}

export const stringFormDataValidator = (input: string, entry: string, minCharacter: number) => {
  if (typeof input !== 'string') throw new ValidationError(`${entry}が記述されていません。`)
  // eslint-disable-next-line no-control-regex
  const omitMessage = input.replaceAll(/[\x00-\x1f\x7f ]/g, "")
  if (omitMessage.length < minCharacter) throw new ValidationError(`${entry}は空白・改行などを除いて${minCharacter}字以上で記載してください。`)
}

export const contactFromDataValidator = (inputData: contactFormData) => {
  stringFormDataValidator(inputData.firstName, "姓", 1)
  stringFormDataValidator(inputData.lastName, "名", 1)
  emailValidator(inputData.email)
  if (!(messageSummary.messageSummaryKeys.includes(inputData.summary))) throw new ValidationError('メッセージ概要欄に不正な選択肢が指定されています。')
  stringFormDataValidator(inputData.message, "メッセージ", 10)
}