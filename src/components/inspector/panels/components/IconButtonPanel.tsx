import React, { memo } from 'react'
import ColorsControl from '~components/inspector/controls/ColorsControl'
import VariantsControl from '~components/inspector/controls/VariantsControl'
import SizeControl from '~components/inspector/controls/SizeControl'
import usePropsSelector from '~hooks/usePropsSelector'
import SwitchControl from '~components/inspector/controls/SwitchControl'
import IconControl from '~components/inspector/controls/IconControl'
import { useForm } from '~hooks/useForm'
import { Select } from '@chakra-ui/react'
import FormControl from '~components/inspector/controls/FormControl'

const IconButtonPanel = () => {
  const size = usePropsSelector('size')
  const variant = usePropsSelector('variant')
  const { setValueFromEvent } = useForm()

  return (
    <>
      <IconControl name="icon" label="Icon" />
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
        </Select>
      </FormControl>
      <ColorsControl label="Color" name="colorScheme" />
      <SwitchControl label="Loading" name="isLoading" />
      <SwitchControl label="Round" name="isRound" />
      <VariantsControl label="Variant" name="variant" value={variant} />
    </>
  )
}

export default memo(IconButtonPanel)
