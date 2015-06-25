#!/bin/bash
export MONGO_URL=mongodb://toto:toto@dogen.mongohq.com:10013/leboncoin
export NODE_ENV=development
export ROOT_URL=http://www.votresuivi.info
export PORT=3000
#export MAIL_URL=smtp://postmaster%40www.ma-visibilite-digitale.fr:47c4db5e452e4b8f3744b3570838e228@smtp.mailgun.org:587
export MAIL_URL=smtp://ac36557:pvvx7kymj@mail.authsmtp.com:2525
meteor run android-device --mobile-server http://192.168.1.25:3000
