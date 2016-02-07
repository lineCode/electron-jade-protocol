# Electron Jade Protocol

[![Build Status](https://img.shields.io/travis/maael/electron-jade-protocol.svg)](https://travis-ci.org/maael/electron-jade-protocol)
[![Code Climate](https://img.shields.io/codeclimate/github/maael/electron-jade-protocol.svg)](https://codeclimate.com/github/maael/electron-jade-protocol)

## Install
```
npm install --save electron-jade-protocol
```

## Usage

### Registering the protocol

This will wait until the application is ready, and will then register a buffer protocol intercept for the `file` scheme, which will intercept all `file://...` requests, and if a request is for a jade file, it will compile it.

```js
jadeProtocol = require('electron-jade-protocol')(jadeOptions, globalLocals)
```

### Updating the protocol with local variables

These variables will be cleared once the next jade file has been requested.

```js
jadeProtocol(locals)
```
