export interface contactMessage {
  summary: string
  message: string
}

export interface contactFormData extends contactMessage {
  firstName: string
  lastName: string
  email: string
}

export interface contactResultData {
  title: string
  status:  "info" | "warning" | "success" | "error";
}