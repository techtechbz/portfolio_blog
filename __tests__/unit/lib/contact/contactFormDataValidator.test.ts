import { contactFromDataValidator, emailValidator, stringFormDataValidator } from "@/lib/contact/contactFormDataValidator"


describe('Contact form data Validator test', () => {
  it.each([
    {email: 'sample@sample.com', expected: true},
    {email: 'sample@sample.co.jp', expected: true},
    {email: 'Sample.12_-+@sam_p-le.jp', expected: true},
    {email: 'Sample12sample.jp', expected: false},
    {email: 'Sample12@samplejp', expected: false},
    {email: 'Sample.12&_-+@sample.jp', expected: false},
    {email: 'Sample.12_-+@sample.c&o.jp', expected: false},
    {email: 'Sample.12_-+@sample.co.0jp', expected: false},
    {email: undefined, expected: false},
  ])('Email input Validator test ($email)', ({email, expected}) => {
    const validator = () => emailValidator(email)
    if (expected) {
      expect(validator).not.toThrow()
    } else {
      expect(validator).toThrow()
    }
  })

  it.each([
    {message: 'サンプルのメッセージ', min: 10, expected: true},
    {message: 'サンプルのメッセー', min: 10, expected: false},
    {message: 'サンプルのメ\nッ\nセ\nー\n', min: 10, expected: false},
    {message: '          ', min: 10, expected: false},
    {message: 'サ  ン  プ     ルのメッ\nセー\nジ', min: 10, expected: true},
    {message: 'サンプルのメ\nッ\nセ\nー\n', min: 9, expected: true},
    {message: undefined, min: 1, expected: false},
  ])('Contact message validator test ($message)', ({message, min, expected}) => {
    const validator = () => {
      stringFormDataValidator(message, "メッセージ", min)
    }
    if (expected) {
      expect(validator).not.toThrow()
    } else {
      expect(validator).toThrow()
    }
  })
  
  it.each([
    {inputData: {firstName: '原', lastName: '敬', email: 'sample@email.com', summary: 'defect', message: 'サンプルのメッセージ'},
     expected: true},
     // firstName validation
    {inputData: {lastName: '敬', email: 'sample@email.com', summary: 'defect', message: 'サンプルのメッセージ'},
    expected: false},
    {inputData: {firstName: ' ', lastName: '敬', email: 'sample@email.com', summary: 'defect', message: 'サンプルのメッセージ'},
    expected: false},
    // lastName validation
    {inputData: {firstName: '原', email: 'sample@email.com', summary: 'defect', message: 'サンプルのメッセージ'},
     expected: false},
    {inputData: {firstName: '原', lastName: ' ', email: 'sample@email.com', summary: 'defect', message: 'サンプルのメッセージ'},
     expected: false},
    // email validation
    {inputData: {firstName: '原', lastName: '敬', summary: 'defect', message: 'サンプルのメッセージ'},
     expected: false},
    {inputData: {firstName: '原', lastName: '敬', email: 'sample@&email.com', summary: 'defect', message: 'サンプルのメッセージ'},
     expected: false},
    // summary validation
    {inputData: {firstName: '原', lastName: '敬', email: 'sample@email.com', message: 'サンプルのメッセージ'},
     expected: false},
    {inputData: {firstName: '原', lastName: '敬', email: 'sample@email.com', summary: 'other', message: 'サンプルのメッセージ'},
     expected: true},
    {inputData: {firstName: '原', lastName: '敬', email: 'sample@email.com', summary: 'error', message: 'サンプルのメッセージ'},
     expected: false},
    // message
    {inputData: {firstName: '原', lastName: '敬', email: 'sample@email.com', summary: 'defect'},
     expected: false},
    {inputData: {firstName: '原', lastName: '敬', email: 'sample@email.com', summary: 'defect', message: 'サンプルのメッセー'},
     expected: false},
    {inputData: {firstName: '原', lastName: '敬', email: 'sample@email.com', summary: 'defect', message: '      '},
     expected: false},
  ])('Contact message validator test ($inputData)', ({inputData, expected}) => {
    const validator = () => {
      contactFromDataValidator(inputData)
    }
    if (expected) {
      expect(validator).not.toThrow()
    } else {
      expect(validator).toThrow()
    }
  })
})