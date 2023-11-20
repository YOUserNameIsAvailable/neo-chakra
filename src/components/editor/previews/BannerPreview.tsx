import React from 'react'
import { Box, Container, IconButton, Stack, Text } from '@chakra-ui/react'
import { FiX } from 'react-icons/fi'
import { useInteractive } from '~hooks/useInteractive'
import { useDropComponent } from '~hooks/useDropComponent'
import ComponentPreview from '~components/editor/ComponentPreview'

const BannerPreview: React.FC<{ component: IComponent }> = ({ component }) => {
  const { props, ref } = useInteractive(component, true)
  const { drop, isOver } = useDropComponent(
    component.id,
    undefined,
    component.children.length === 0,
  )
  const children = component.children

  const boxProps: any = {}

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Box {...boxProps}>
      {!children.length ? (
        /*
         * We need at least one children because of the implementation
         * of AspectRatio
         */
        <Box as="section" pb={{ base: '12', md: '24' }} bg="white">
          <Box borderBottomWidth="1px" bg="bg.surface">
            <Container py={{ base: '4', md: '3.5' }}>
              <Stack
                direction="row"
                spacing={{ base: '3', md: '4' }}
                justify="space-between"
                align={{ base: 'start', md: 'center' }}
              >
                <Box>
                  <Text fontWeight="medium">
                    Hooray, twe just released a new version.
                  </Text>
                  <Text color="fg.muted">
                    Exciting times ahead, as the new version integrates the most
                    recent updates from Chakra UI.
                  </Text>
                </Box>
                <IconButton
                  icon={<FiX />}
                  variant="tertiary"
                  aria-label="Close banner"
                />
              </Stack>
            </Container>
          </Box>
        </Box>
      ) : (
        <Box>
          <ComponentPreview componentName={children[0]} />
        </Box>
      )}
    </Box>
  )
}

export default BannerPreview
