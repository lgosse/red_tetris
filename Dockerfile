FROM  node:alpine

WORKDIR /var/html/app/red_tetris

ENV     CHOKIDAR_USEPOLLING=true
ENV     RED_TETRIS_FRONT_HOST='ec2-52-47-162-238.eu-west-3.compute.amazonaws.com'
ENV     RED_TETRIS_FRONT_PORT=80
ENV     RED_TETRIS_SERVER_HOST='0.0.0.0'
ENV     RED_TETRIS_SERVER_PORT=3004
ENV     RED_TETRIS_DB_HOST='database'

# Getting yarn
RUN		apk update && apk add yarn && chmod 770 .

COPY  . .

# Running npm install
RUN		yarn

CMD   yarn client-dist && yarn srv-dist && node dist/server/main.js

# It requires your app to listen on the port 3004
EXPOSE  3004
