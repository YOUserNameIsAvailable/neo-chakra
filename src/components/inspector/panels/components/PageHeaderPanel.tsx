import React from 'react'
import NumberControl from '~components/inspector/controls/NumberControl'

const PageHeaderPanel = () => {
  return (
    <>
      <NumberControl label="Ratio" name="ratio" step={0.01} />
    </>
  )
}

export default PageHeaderPanel
