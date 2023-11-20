import React, { memo } from 'react'
import ColorsControl from '~components/inspector/controls/ColorsControl'
import TextControl from '~components/inspector/controls/TextControl'

const BorderPanel = () => {
  return (
    <>
      <ColorsControl label="Border" name="border" />

      {/* <TextControl name="border" label="Border" /> */}
      <TextControl name="borderRadius" label="Border radius" />
    </>
  )
}

export default memo(BorderPanel)
