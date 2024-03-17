import { readFileSync, writeFileSync } from 'fs'

type Data = {
  [key: string]: {
    regex: RegExp
    replace: string
    index: number
  }
}

const DATA: Data = {
  json: {
    regex: /"version"\s*:\s*"[^"]+?([^"]+)"/gm,
    replace: '"version": "$v"',
    index: 1
  },
  toml: {
    regex: /version\s*=\s*"[^"]+?([^"]+)"/gm,
    replace: 'version = "$v"',
    index: 0
  }
}

function process(contents: string, format: string, version: string): [string, string] {
  const matches = contents.match(DATA[format].regex)

  if (!matches) {
    throw new Error('No version field found or file is corrupted')
  }

  const match = matches[0]

  const newContents = contents.replace(match, DATA[format].replace.replace('$v', version))
  // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
  const oldVersion = match.match(/"(.*?)"/g)![DATA[format].index].replaceAll('"', '')

  return [newContents, oldVersion]
}

export default function bumpVersion(
  path: string,
  format: string,
  version: string
): string {
  const contents = readFileSync(path, 'utf8')

  if (!DATA[format]) {
    throw new Error(`Unsupported format: ${format}`)
  }

  const [newContents, oldVersion] = process(contents, format, version)

  writeFileSync(path, newContents, 'utf8')

  return oldVersion
}
