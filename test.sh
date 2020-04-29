#!/usr/bin/env bash

rm -rf snapshot/*
tsc --outDir snapshot --declaration tests/*.ts
rm -rf snapshot/*.js
cp tests/*.d.ts snapshot/

node index.js --src tests --dist snapshot
