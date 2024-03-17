# Universal Version Bumper

Bump version in any JSON or TOML file with this simple Action

[![CI](https://github.com/dervexdev/version-bumper/actions/workflows/ci.yml/badge.svg)](https://github.com/dervexdev/version-bumper/actions/workflows/ci.yml)
[![Super-Linter](https://github.com/dervexdev/version-bumper/actions/workflows/linter.yml/badge.svg)](https://github.com/dervexdev/version-bumper/actions/workflows/linter.yml)
[![CodeQL](https://github.com/dervexdev/version-bumper/actions/workflows/codeql.yml/badge.svg)](https://github.com/dervexdev/version-bumper/actions/workflows/codeql.yml)

## Example

```yaml
name: Release

on:
  push:
    tags: ['*']

jobs:
  bump:
    name: Bump Version
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Bump Cargo version
        uses: DervexDev/version-bumper@v1
        with:
          path: ./Cargo.toml

      - name: Update Cargo lock
        run: cargo update --workspace
```

## Inputs

| Name    | Required | Description                                                             |
| ------- | -------- | ----------------------------------------------------------------------- |
| path    | `true`   | Path to the JSON or TOML file you want to bump                          |
| version | `false`  | The version to bump to, defaults to the tag name                        |
| format  | `false`  | The format of the file you want to bump, defaults to the file extension |

## Outputs

| Name        | Description                  |
| ----------- | ---------------------------- |
| new_version | New version of the file      |
| old_version | Previous version of the file |

> [!IMPORTANT]
>
> Lock files won't update automatically!
>
> You will need to add extra step that runs special command e.g.
> `cargo update --workspace` or `npm i --package-lock-only`
