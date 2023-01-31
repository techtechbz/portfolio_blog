import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    
    const formDataValidator = async () => {
      if (!req.body.firstName) throw new Error('姓が入力されていません')
      if (!req.body.lastName) throw new Error('名が入力されていません')
      if (!req.body.email) throw new Error('メールアドレスが入力されていません')
      if (!/^(defect|scout|other)$/.exec(req.body.summary)) throw new Error('お問い合わせ内容が指定されていません')
      if (!req.body.message) throw new Error('メッセージが入力されていません')
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