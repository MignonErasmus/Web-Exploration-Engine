FROM node:lts-alpine

WORKDIR /app
RUN mkdir -p /app/webscraper

COPY ../.editorconfig ./
COPY ../.eslintignore ./
COPY ../.eslintrc.json ./
COPY ../jest.config.ts ./
COPY ../jest.preset.js ./
COPY ../nx.json ./
COPY ../package*.json ./
COPY ../tsconfig.base.json ./

RUN ls -la 
RUN npm install -g npm@latest
RUN npm install

COPY ../webscraper ./webscraper
COPY ../webscraper/.eslintrc.json ./webscraper/.eslintrc.json
WORKDIR /app/webscraper

RUN npx nx build webscraper --skip-nx-cache
EXPOSE 3000

CMD ["npx", "nx", "serve", "webscraper", "--port", "3000", "--verbose"]