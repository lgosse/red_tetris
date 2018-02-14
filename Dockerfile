FROM  node:alpine

WORKDIR /var/html/app/red_tetris

ENV     CHOKIDAR_USEPOLLING=true

# Getting yarn
RUN		apk update && apk add yarn && chmod 770 .

COPY  . .

# Running npm install
RUN		yarn

CMD   yarn client-dist && yarn srv-dist && node dist/server/main.js

# It requires your app to listen on the port 3004
EXPOSE  3004
