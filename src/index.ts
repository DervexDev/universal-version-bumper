import { setFailed, setOutput } from '@actions/core'
import getInputs from './getInputs'
import bumpVersion from './bumpVersion'

try {
  const { path, format, version } = getInputs()

  const oldVersion = bumpVersion(path, format, version)

  setOutput('new_version', version)
  setOutput('old_version', oldVersion)
} catch (error) {
  if (error instanceof Error) {
    setFailed(error.message)
  } else {
    setFailed(`${error}`)
  }
}
