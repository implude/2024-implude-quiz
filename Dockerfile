FROM node:18-alpine3.19
 
WORKDIR /usr/src/app

ARG VITE_BASE_URL

ENV VITE_BASE_URL=$VITE_BASE_URL

ENV TURBO_TELEMETRY_DISABLED=1
 
COPY . .

RUN npm install

RUN npm run build
 
EXPOSE 3000

CMD ["npm", "run", "start" ]