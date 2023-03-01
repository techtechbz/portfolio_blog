import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {RecaptchaEnterpriseServiceClient} = require('@google-cloud/recaptcha-enterprise').v1;
  const recaptchaenterpriseClient = new RecaptchaEnterpriseServiceClient();
  const parent = ''
}