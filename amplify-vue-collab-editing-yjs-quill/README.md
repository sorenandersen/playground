# amplify-vue-collab-editing-yjs-quill

## About

DEMO!

Collaborative editing powered by Yjs and the Quill editor.

### Web socket servers, for sync between clients

- wss://demos.yjs.dev (as seen in Yjs own demos)
- ws://localhost:8099: `HOST=localhost PORT=8099 node ./node_modules/y-websocket/bin/server.js`
- ws://localhost:8099, with storage: `HOST=localhost PORT=8099 YPERSISTENCE=./dbDir node ./node_modules/y-websocket/bin/server.js`
- localhost alternative: The separate `y-websocket` repo (demo server identical to above)


## Vue project setup
```
npm install
```

### Developing, building, linting, ...
```
# Compiles and hot-reloads for development
npm run serve

# Compiles and minifies for production
npm run build

# Lints and fixes files
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
