#!/bin/bash
browserify -t [babelify --stage 1] js/main.js -o public/bundle.js
