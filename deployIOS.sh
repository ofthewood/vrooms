#!/bin/bash

delAndCp () {
    if [ "$has2delete" == "o" ]; then
        echo "delete  $project ..."
        rm -fr $iosRep$project
    fi
    echo "cp $project ..."
    cp -fR $winRep$project $iosRep
}

echo "delete before ?(o/n)"
read has2delete

echo "Full copy ?(o/n)"
read fullCopy

winRep=/Volumes/meteor/_linode/
iosRep=/Users/vincent/WebstormProjects/
project=vrooms

if [ "$fullCopy" == "n" ]; then
    echo "move ressources"
    mv   $winRep$project/public/ressources/ $winRep$project/..
fi
delAndCp

if [ "$fullCopy" == "n" ]; then
    echo "move back ressources"
    mv   $winRep$project/../ressources $winRep$project/public/
fi
winRep=/Volumes/meteor/_linode/packages/
iosRep=/Users/vincent/WebstormProjects/packages/

project=vrooms-base
delAndCp

project=vrooms-mobile
delAndCp

project=safe-reload
delAndCp

project=moment-locale-fr
delAndCp

cd /Users/vincent/WebstormProjects/vrooms
./iosStart4Mac.sh