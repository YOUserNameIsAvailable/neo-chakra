import React, { memo, useMemo } from 'react'
import FormControl from '~components/inspector/controls/FormControl'
import { useForm } from '~hooks/useForm'
import usePropsSelector from '~hooks/usePropsSelector'
import {
  SliderTrack,
  SliderFilledTrack,
  Slider,
  SliderThumb,
  Select,
} from '@chakra-ui/react'
import TextControl from '~components/inspector/controls/TextControl'

const EffectsPanel = () => {
  const { setValue } = useForm()
  const opacity = usePropsSelector('opacity')

  const normalizedOpacity = useMemo(() => {
    return opacity * 100 || 100
  }, [opacity])
  const { setValueFromEvent } = useForm()
  const value = usePropsSelector('boxShadow')
  const options = ['xs', 'sm', 'md', 'lg', 'xl']
  return (
    <>
      <FormControl label="Opacity">
        <Slider
          min={1}
          onChange={(value: any) => setValue('opacity', value / 100)}
          value={normalizedOpacity}
          mr={2}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </FormControl>
      <FormControl label="Box Shadow" htmlFor="boxShadow">
        <Select
          size="sm"
          id={'boxShadow'}
          name={'boxShadow'}
          value={value}
          onChange={setValueFromEvent}
        >
          {options.map(choice => (
            <option key={choice}>{choice}</option>
          ))}
        </Select>
      </FormControl>

      {/* <TextControl name="boxShadow" label="Box Shadow" /> */}
    </>
  )
}

export default memo(EffectsPanel)
