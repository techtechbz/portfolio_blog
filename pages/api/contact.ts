import type { NextApiRequest, NextApiResponse } from 'next'

import { contactFromDataValidator } from '@/lib/contact/contactFormDataValidator';
import { ValidationError } from '@/lib/error/validationError';


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    (async () => {
      try {
        if (req.headers['content-type'] !== "application/json") throw new Error('不正なアクセスです。')
        contactFromDataValidator(req.body)
      } catch (error: unknown) {
        if (error instanceof ValidationError) res.status(400).end(error.message)
        res.status(500).end()
      }
    })();
    res.status(200).end()
  }
  res.status(500).end()
}