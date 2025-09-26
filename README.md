# GNT = Gel + Next.js + T3 (Tailwind, TypeScript, tRPC)

This is Next.js + Gel starter project bootstraped on the [T3 Stack](https://create.t3.gg/)

- [Gel](https://www.geldata.com/) Graph-relational database with a custom query language, Auth extension and more
- [Next.js](https://nextjs.org) Fullstack React framework using the **app router**
- [tRPC](https://trpc.io) typesafe end-2-end API definition & access
- [Tailwind CSS](https://tailwindcss.com) with [Flowbite React](https://www.flowbite-react.com/) components
- [TypeScript](https://www.typescriptlang.org) language for JavaScript autocompletion
- [i18next](https://www.i18next.com) localization integrated with [zod-i18n](https://github.com/aiji42/zod-i18n/)
  - [📄 Setup and Next.js usage guide](docs/i18n.md)
- [Storybook](https://storybook.js.org) for building & testing UI in isolation

# Installation Steps

```
npm i
```

## Gel

### 1. Initiate

`gel project init`

### 2. Configure the Auth extension

#### Set the allowed redirect url via the REPL (run `gel`):

```edgeql
configure current database set ext::auth::AuthConfig::allowed_redirect_urls := {"http://localhost:3000/"};
```

#### Configure the email-password Provider

Via `gel ui`

#### Configure the SMTP Provider

Required for `ext::auth` to work.
Edit the `sandbox.smtp.config.edgeql` with your provider (the default is Mailtrap) and variables.
Run `npm run db:smtp`.

# Troubleshooting

## Gel

### Database Connection refused when generating `edgeql-js`

This is related to ipv6 in Node18 (often on Windows 11).

0. Make sure your `node -v` is equal to the one in `.nvmrc`

Run `nvm use` to apply the project node version.
Run `nvm alias default node` to make it default.

1.  Configure Gel. See [Source](https://github.com/edgedb/edgedb-js/issues/376#issuecomment-1173840632).

```
gel configure set listen_addresses 127.0.0.1 ::1
```

2. or [Update operating system routing](https://github.com/nodejs/node/issues/40537#issuecomment-1706257550)
