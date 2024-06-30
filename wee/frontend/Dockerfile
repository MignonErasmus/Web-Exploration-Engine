FROM node:lts-alpine

WORKDIR /app
RUN mkdir -p /app/frontend

COPY ../package*.json ./
RUN ls -la 
RUN npm install

COPY ../frontend ./frontend
WORKDIR /app/frontend


EXPOSE 3001

CMD ["npx", "nx", "start", "frontend"]