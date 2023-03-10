FROM node:latest

EXPOSE 3000

WORKDIR /app

COPY next.config.js package.json tsconfig.json jest.config.js jest.setup.js .eslintrc.json next-env.d.ts types.d.ts ./

RUN npm i -g npm
RUN npm i -g @railway/cli wsl-open
RUN yarn add next react react-dom \
  glob sharp \
  @mui/material @emotion/react @emotion/styled @emotion/server @mui/icons-material \
  prismjs \
  axios @google-cloud/recaptcha-enterprise \
  unified remark-parse remark-rehype rehype-sanitize rehype-format rehype-stringify \
  remark-math remark-gfm remark-prism \
  rehype-katex rehype-slug \
  gray-matter \
  --network-timeout 600000
RUN yarn add -D @types/node @types/react @types/react-dom @types/prismjs @types/jest typescript \
  eslint eslint-config-next @next/eslint-plugin-next @next/bundle-analyzer prettier eslint-config-prettier eslint-plugin-testing-library \
  @typescript-eslint/parser @typescript-eslint/eslint-plugin \
  jest jest-environment-jsdom ts-jest \
  @testing-library/react @testing-library/jest-dom msw