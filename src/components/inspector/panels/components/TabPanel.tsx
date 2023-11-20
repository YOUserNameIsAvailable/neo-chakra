import React from 'react'
import ChildrenControl from '~components/inspector/controls/ChildrenControl'
import SwitchControl from '~components/inspector/controls/SwitchControl'
import TextControl from '~components/inspector/controls/TextControl'

const TabPanel = () => {
  return (
    <>
      <SwitchControl label="Is Disabled" name="isDisabled" />
      <SwitchControl label="Is Selected" name="isSelected" />
      <ChildrenControl />
      <TextControl name="panelId" label="Panel Id" />
    </>
  )
}

export default TabPanel
