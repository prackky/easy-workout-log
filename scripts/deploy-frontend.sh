#!/bin/bash

cd ~/npq/easy-workout-log/

echo "syncing repo"
git fetch
git reset --hard origin/master

echo "install dependencies"
npm install

echo "package app"
npm run build

echo "deploy"
rm -rf ~/npq/ewolo-api/public
cp -r build ~/npq/ewolo-api/public
