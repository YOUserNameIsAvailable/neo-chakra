import React from 'react'
import NumberControl from '~components/inspector/controls/NumberControl'

const BannerPanel = () => {
  return (
    <>
      <NumberControl label="Ratio" name="ratio" step={0.01} />
    </>
  )
}

export default BannerPanel
