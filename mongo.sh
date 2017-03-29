#!/bin/sh

mongod --port 1701 --fork --dbpath ./testdb --logpath ./db.log --logappend
