import type { NextApiRequest, NextApiResponse } from 'next'

import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise';


export default async function createAssessment(req: NextApiRequest, res: NextApiResponse) {
  const client = new RecaptchaEnterpriseServiceClient();
  const projectPath = client.projectPath(process.env.PROJECT_ID);
  const request = {
    assessment: {
      event: {
        token: req?.body.token,
        siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_KEY,
      },
    },
    parent: projectPath,
  };
  const [response] = await client.createAssessment(request);
  if (!response.tokenProperties?.valid) {
    res.status(400)?.json({
      status: "invalid",
      message: "Invalid token",
      score:response?.riskAnalysis?.score,
      reason:response.tokenProperties?.invalidReason
    })
    return;
  }
 
   if (response.tokenProperties.action === "LOGIN") {
    res.status(200)?.json({
      status: "Ok",
      message: "passed",
      score: response?.riskAnalysis?.score,
      reason: response.riskAnalysis?.reasons
    });
  } else {
    res.status(500)?.json({
      status: "Fail",
      message: "Communication error",
      reason: response.riskAnalysis?.reasons
    });
  } 
}