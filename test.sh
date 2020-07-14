#!/usr/bin/env bash

rm -rf snapshot/*
tsc
find snapshot -type f | grep .js | xargs rm -f
cp tests/*.d.ts snapshot/

node index.js --src tests --dist snapshot
