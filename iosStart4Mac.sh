#!/bin/bash
echo "En developpement ?(o/n)"
read rep
if [ "$rep" == "o" ]; then
    env=development
    url=http://www.votresuivi.info
else
    env=production
    url=http://www.votresuivi.fr
fi

echo "env $env"
echo "url $url"

#export MONGO_URL=mongodb://toto:toto@dogen.mongohq.com:10013/leboncoin
export NODE_ENV=$env
export ROOT_URL=http://www.votresuivi.fr
export PORT=3000
#export MAIL_URL=smtp://postmaster%40www.ma-visibilite-digitale.fr:47c4db5e452e4b8f3744b3570838e228@smtp.mailgun.org:587
export MAIL_URL=smtp://ac36557:pvvx7kymj@mail.authsmtp.com:2525
#meteor run android-device --mobile-server http://192.168.1.25:3000


echo "IOS ?(o/n)"
read typeRun

if [ "$typeRun" == "o" ]; then
    echo "sur IOS"
    meteor run ios-device --mobile-server $url
else
    echo "sur Android"
    meteor run android-device --mobile-server $url
fi
