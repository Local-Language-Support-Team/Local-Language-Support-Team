#!/bin/sh

for d in packages/*/ ; do (cd "$d" && yarn link); done
