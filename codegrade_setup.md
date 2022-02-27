# Codegrade Setup

This is the solution repo for [Express Middleware](https://github.com/BloomInstituteOfTechnology/node-api2-project) Module Project.

Whenever setting up a Codegrade assignment or importing settings from another assignment:

1. Make sure that rubrics, fixtures and scripts match the ones in **this repo**.
2. Re-upload to Codegrade any items that don't match exactly the ones in this repo.
3. Run tests locally, and push an empty commit to Codegrade to verify that this repo passes all tests.

## 1- Fixtures

### Student-Facing

- [codegrade_mvp.test.js](./codegrade_mvp.test.js)

## 2- Global Setup Script

```bash
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash - && sudo apt-get install -y nodejs; cg-jest install; npm i -g jest@27.5.1
```

## 3- Per-Student Setup Script

```bash
mv $FIXTURES/* . && npm install
```

## 4- Auto Tests

### Learner-Facing - Weight 100

```bash
NODE_ENV=testing cg-jest run -- codegrade_mvp.test.js --runInBand --forceExit
```
