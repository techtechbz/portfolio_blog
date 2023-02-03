export interface contactFormData {
  firstName: string
  lastName: string
  email: string
  summary: string
  message: string
}

export interface snackbarData {
  title: string
  status:  "info" | "warning" | "success" | "error";
}