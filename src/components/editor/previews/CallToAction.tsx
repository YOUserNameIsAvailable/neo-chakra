import React from 'react'
import { Box, Button, Container, Heading, Stack, Text } from '@chakra-ui/react'

import { useInteractive } from '~hooks/useInteractive'
import { useDropComponent } from '~hooks/useDropComponent'
import ComponentPreview from '~components/editor/ComponentPreview'

const CallToActionPreview: React.FC<{ component: IComponent }> = ({
  component,
}) => {
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
        <Box as="section" bg="#dfde">
          <Container py={{ base: '16', md: '24' }}>
            <Stack spacing={{ base: '8', md: '10' }}>
              <Stack spacing={{ base: '4', md: '5' }} align="center">
                <Heading size={{ base: 'sm', md: 'md' }}>
                  Ready to Grow?
                </Heading>
                <Text
                  color="fg.muted"
                  maxW="2xl"
                  textAlign="center"
                  fontSize="xl"
                >
                  With this beautiful and responsive React components you will
                  realize your next project in no time.
                </Text>
              </Stack>
              <Stack
                spacing="3"
                direction={{ base: 'column', sm: 'row' }}
                justify="center"
              >
                <Button variant="secondary" size="xl">
                  Learn more
                </Button>
                <Button size="xl">Start Free Trial</Button>
              </Stack>
            </Stack>
          </Container>
        </Box>
      ) : (
        <Box>
          <ComponentPreview componentName={children[0]} />
        </Box>
      )}
    </Box>
  )
}

export default CallToActionPreview
