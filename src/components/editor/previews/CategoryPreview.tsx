import React from 'react'
import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Skeleton,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { useInteractive } from '~hooks/useInteractive'
import { useDropComponent } from '~hooks/useDropComponent'
import ComponentPreview from '~components/editor/ComponentPreview'

const CategoryPreview: React.FC<{ component: IComponent }> = ({
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
        <Box
          bg="white"
          maxW="7xl"
          mx="auto"
          px={{ base: '0', lg: '12' }}
          py={{ base: '0', lg: '12' }}
        >
          <Stack
            direction={{ base: 'column-reverse', lg: 'row' }}
            spacing={{ base: '0', lg: '20' }}
          >
            <Box
              width={{ lg: 'sm' }}
              transform={{ base: 'translateY(-50%)', lg: 'none' }}
              bg={{
                base: useColorModeValue('red.50', 'gray.700'),
                lg: 'transparent',
              }}
              mx={{ base: '6', md: '8', lg: '0' }}
              px={{ base: '6', md: '8', lg: '0' }}
              py={{ base: '6', md: '8', lg: '12' }}
            >
              <Stack spacing={{ base: '8', lg: '10' }}>
                <Stack spacing={{ base: '2', lg: '4' }}>
                  <Heading
                    size="xl"
                    color={useColorModeValue('gray.500', 'gray.300')}
                  >
                    Misguided
                  </Heading>
                  <Heading size="xl" fontWeight="normal">
                    Refresh your wardrobe
                  </Heading>
                </Stack>
                <HStack spacing="3">
                  <Link
                    color={useColorModeValue('gray.500', 'gray.300')}
                    fontWeight="bold"
                    fontSize="lg"
                  >
                    Discover now
                  </Link>
                  <ArrowForwardIcon color="gray.500" />
                </HStack>
              </Stack>
            </Box>
            <Flex flex="1" overflow="hidden">
              <Image
                src="https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80"
                alt="Lovely Image"
                fallback={<Skeleton />}
                maxH="450px"
                minW="200px"
                objectFit="contain"
                flex="1"
              />
              {/* <Image
                display={{ base: 'none', sm: 'initial' }}
                src="https://images.unsplash.com/photo-1589156206699-bc21e38c8a7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80"
                alt="Lovely Image"
                fallback={<Skeleton />}
                maxH="450px"
                objectFit="cover"
              /> */}
            </Flex>
          </Stack>
        </Box>
      ) : (
        <Box>
          <ComponentPreview componentName={children[0]} />
        </Box>
      )}
    </Box>
  )
}

export default CategoryPreview
