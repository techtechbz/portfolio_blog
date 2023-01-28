import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    
    const formDataValidator = async () => {
      if (!req.body.firstName) new Error('姓が入力されていません')
      if (!req.body.lastName) new Error('名が入力されていません')
      if (!req.body.email) new Error('メールアドレスが入力されていません')
      if (!/^(defect|scout|other)$/.exec(req.body.summary)) new Error('お問い合わせ内容が指定されていません')
      if (!req.body.message) new Error('メッセージが入力されていません')
    } 

    (async () => {
      try {
        await formDataValidator();
      } catch (error) {
        res.status(400).end()
      }
    })();
  }

  res.status(200).end()
}