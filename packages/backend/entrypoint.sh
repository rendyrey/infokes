#!/bin/sh
echo "Running migrations..."
bun run generate:dev
bun run migrate:dev
bun run seed:dev
bun run generate:test
bun run migrate:test
bun run seed:test
bun run --watch index.ts