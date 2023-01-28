export type contactFormData = {
  firstName: string
  lastName: string
  email: string
  summary: string
  message: string
}

export type snackbarData = {
  title: string
  status:  "info" | "warning" | "success" | "error";
}