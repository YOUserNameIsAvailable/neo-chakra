import React, { memo } from 'react'
import ColorsControl from '~components/inspector/controls/ColorsControl'
import SizeControl from '~components/inspector/controls/SizeControl'
import { Select } from '@chakra-ui/react'
import ChildrenControl from '~components/inspector/controls/ChildrenControl'
import FormControl from '~components/inspector/controls/FormControl'
import { useForm } from '~hooks/useForm'
import usePropsSelector from '~hooks/usePropsSelector'
import IconControl from '~components/inspector/controls/IconControl'
import SwitchControl from '~components/inspector/controls/SwitchControl'

const ButtonPanel = () => {
  const { setValueFromEvent } = useForm()

  const size = usePropsSelector('size')
  const variant = usePropsSelector('variant')

  return (
    <>
      <ChildrenControl />
      <SwitchControl label="Disabled" name="isDisabled" />
      <SizeControl name="size" label="Size" value={size} />

      <FormControl htmlFor="variant" label="Variant">
        <Select
          id="variant"
          onChange={setValueFromEvent}
          name="variant"
          size="sm"
          value={variant || ''}
        >
          <option>primary</option>
          <option>secondary</option>
          <option>tertiary</option>
          <option>text</option>
          <option>outline</option>
          <option>ghost</option>
          <option>unstyled</option>
          <option>link</option>
          <option>solid</option>
        </Select>
      </FormControl>

      <ColorsControl label="Color Scheme" name="colorScheme" />
      <IconControl label="Left icon" name="leftIcon" />
      <IconControl label="Right icon" name="rightIcon" />
    </>
  )
}

export default memo(ButtonPanel)
