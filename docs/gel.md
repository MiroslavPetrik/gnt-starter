# Gel

## TypeScript Client

### Generate

```bash
npm run db:edgeql-js
```

It will create the query builder in the default `dbschema/edgeql-js` directory, which won't be commited to the repository as it's `.gitignore`-d.

This uses the `GEL_SECRET_KEY` and `GEL_INSTANCE` environment variables.

### Usage

```ts
import e from "@/edgeql-js";

export const selectCurrentUserQuery = e.select(
  e.global.currentUser,
  (user) => e.User["*"],
);
```

[A tsconfig path alias](../tsconfig.json#L29) is defined, so the default directory is available
on the `@/` path, even though its not in the `src` folder.
