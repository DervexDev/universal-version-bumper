import { getInput } from '@actions/core'
import { existsSync } from 'fs'

interface Inputs {
  path: string
  format: string
  version: string
}

function getFormat(path: string): string {
  const format = getInput('format')

  if (format === 'json' || format === 'JSON') {
    return 'json'
  } else if (format === 'toml' || format === 'TOML') {
    return 'toml'
  } else if (format !== '') {
    throw new Error(`Invalid file format: ${format}`)
  }

  if (path.endsWith('.json')) {
    return 'json'
  } else if (path.endsWith('.toml')) {
    return 'toml'
  }

  throw new Error(`File format not recognized: ${path}`)
}

function parseVersion(): string {
  let version = getInput('version')

  if (version === '') {
    const ref = process.env['GITHUB_REF'] || ''

    if (!ref.startsWith('refs/tags/')) {
      throw new Error(`${ref} is not a tag`)
    }

    version = ref.substring('refs/tags/'.length)
  }

  return version.startsWith('v') ? version.substring(1) : version
}

export default function getInputs(): Inputs {
  const path = getInput('path')

  if (!existsSync(path)) {
    throw new Error(`File ${path} does not exist`)
  }

  const format = getFormat(path)
  const version = parseVersion()

  return {
    path,
    format,
    version
  }
}
