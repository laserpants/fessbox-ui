#!/bin/bash
browserify -t [babelify --stage 1] js/main.js > public/bundle.js
