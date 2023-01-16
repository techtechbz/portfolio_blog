FROM node:latest

EXPOSE 3000

WORKDIR /app

COPY .eslintrc.json next-env.d.ts package.json tsconfig.json next.config.js jest.config.js jest.setup.js types.d.ts ./

RUN npm i -g npm
RUN npm i -g @railway/cli wsl-open
RUN yarn add next react react-dom @next/font \
  glob sharp \
  @mui/material @emotion/react @emotion/styled @emotion/server @mui/icons-material \
  prismjs \
  unified remark-parse remark-rehype rehype-sanitize rehype-format rehype-stringify \
  remark-math remark-gfm remark-prism \
  rehype-katex rehype-slug \
  gray-matter \
  --network-timeout 600000
RUN yarn add -D @types/node @types/react @types/react-dom @types/prismjs typescript \
  eslint eslint-config-next @next/eslint-plugin-next @next/bundle-analyzer prettier eslint-config-prettier eslint-plugin-testing-library \
  jest ts-jest jest-environment-jsdom react-test-renderer enzyme enzyme-adapter-react-16 enzyme-to-json \
  @testing-library/react @testing-library/jest-dom msw \
  @types/react-test-renderer @types/enzyme-adapter-react-16
