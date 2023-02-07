import type { NextApiRequest, NextApiResponse } from 'next'

import { contactFromDataValidator } from '@/lib/contact/contactFormDataValidator';
import { ValidationError } from '@/lib/error/validationError';


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    (async () => {
      try {
        console.log(req.headers)
        contactFromDataValidator(req.body)
      } catch (error: unknown) {
        if (error instanceof ValidationError) {
          res.status(400).end(error.message)
        } else {
          res.status(500).end()
        }
      }
    })();
  }
  res.status(200).end()
}