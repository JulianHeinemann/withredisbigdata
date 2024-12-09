# Big Data News mit Redis

## 🟢 Vorausetzungen:

DU solltest folgendes installiert haben:

- Node.js v16.14.0. oder höher
- npm v8.3.1. oder höher (bei mir gabs mit der neusten Version keine Probleme)

## 📦 Los gehts:
Was macht man natürlich als Erstes?

```shell
npm i
```

- `cd` in den Projekt-Ordner und mache `npm install` zum Herunterladen der Dependecies.

- artillery brauchen wir auch noch 😉🦏

```shell
npm install -g artillery@latest
```
- Führe den Command unten aus, um den Server zu starten:

```shell
npm run dev
```
hier solltest du nun sein: 🦕

- Adresse: http://localhost:3000

- dann los...

```shell
npm run start
```

jetzt wirds wild:
![giphy](https://github.com/user-attachments/assets/53f3fbe0-3c05-47ca-9d59-c97c6f490d87)

```shell
artillery run artillery.yml
```

Ergebnisse / Summary sammeln

-erstelle eine eigene Ergebnisse.txt und kopiere deine Summary hinein

![giphy](https://github.com/user-attachments/assets/53f3fbe0-3c05-47ca-9d59-c97c6f490d87)

Bei Fragen:

### Julian Heinrich (791757)

jh791757@fh-muenster.de


In Anlehnung an:

https://betterstack.com/community/guides/scaling-nodejs/build-nodejs-application-express-pug/

## ⚖ Lizenz

verlinktes Tutorial ist lizensiert durch [Apache License, Version 2.0](LICENSE).
