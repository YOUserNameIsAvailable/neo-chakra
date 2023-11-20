import React, { memo } from 'react'
import { Select } from '@chakra-ui/react'

import ColorsControl from '~components/inspector/controls/ColorsControl'
import ChildrenControl from '~components/inspector/controls/ChildrenControl'
import FormControl from '~components/inspector/controls/FormControl'
import { useForm } from '~hooks/useForm'
import usePropsSelector from '~hooks/usePropsSelector'
import SizeControl from '~components/inspector/controls/SizeControl'

const BadgePanel = () => {
  const { setValueFromEvent } = useForm()
  const variant = usePropsSelector('variant')
  const size = usePropsSelector('size')

  return (
    <>
      <ChildrenControl />
      <SizeControl label="Size" options={['sm', 'md', 'lg']} value={size} />
      <FormControl htmlFor="variant" label="Variant">
        <Select
          id="variant"
          onChange={setValueFromEvent}
          name="variant"
          size="sm"
          value={variant || ''}
        >
          <option>pill</option>
          <option>solid</option>
          <option>outline</option>
          <option>subtle</option>
        </Select>
      </FormControl>

      <ColorsControl label="Color Scheme" name="colorScheme" />
    </>
  )
}

export default memo(BadgePanel)
