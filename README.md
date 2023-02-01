# Express Typescript Tsoa Project Starter

### Scripts to add

```json
// package.json
{
    "scripts": {
        "dev": "concurrently \"nodemon\" \"nodemon -x tsoa spec-and-routes\"",
        "build": "tsoa spec-and-routes && tsc",
        "start": "ts-node src/server.ts"
    },
}
```