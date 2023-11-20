import React, { useState, useEffect } from 'react'
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react'

import { useInteractive } from '~hooks/useInteractive'
import { useDropComponent } from '~hooks/useDropComponent'
import ComponentPreview from '~components/editor/ComponentPreview'
import { useCurrency } from '../../../hooks/useCurrency'
import { RepeatIcon } from '@chakra-ui/icons'
import { useFlags } from '../../../hooks/useFlags'

const CurrencyConverterPreview: React.FC<{ component: IComponent }> = ({
  component,
}) => {
  const { props, ref } = useInteractive(component, true)
  const {
    amount,
    setAmount,
    currencyOne,
    setCurrencyOne,
    currencyTwo,
    setCurrencyTwo,
    symbolsData,
    isLoading = false,
    isError,
    convertedAmount,
    date,
    time,
    currencyList,
  } = useCurrency()
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

  if (isError)
    return (
      <Text fontWeight="bold" fontSize="3xl" color="red" my="10">
        Something has gone wrong
      </Text>
    )

  return (
    <Box {...boxProps}>
      {!children.length ? (
        /*
         * We need at least one children because of the implementation
         * of AspectRatio
         */
        <>
          <div>
            {isLoading && (
              <div className="loader-overlay">
                <div className="loader"></div>
              </div>
            )}
          </div>
          <Box>
            <Flex
              bgGradient="linear(to-t, #ae085c, #2e0656)"
              height="80vh"
              justifyContent="center"
            >
              <Box margin="0 auto">
                <Box
                  textAlign="center"
                  color="white"
                  margin={{ base: '10', sm: '16' }}
                  marginBottom="10"
                >
                  <Text fontWeight="bold" fontSize={{ base: '2xl', sm: '3xl' }}>
                    Currency Converter
                  </Text>
                </Box>{' '}
                <Grid
                  templateColumns="repeat(5, 1fr)"
                  templateRows="repeat(2, 1fr)"
                  padding={{ base: '6', sm: '10' }}
                  gap="1rem"
                  backgroundColor="white"
                  borderRadius="lg"
                  ml={{ base: '46' }}
                  mr={{ base: '46' }}
                >
                  <GridItem
                    colSpan={{ base: 5, sm: 2 }}
                    justifySelf="center"
                    alignSelf="center"
                  >
                    <Flex
                      gap="1rem"
                      shadow="md"
                      padding="1rem"
                      borderRadius="lg"
                    >
                      <Avatar src={useFlags(currencyOne)?.flagUrl} size="xs" />
                      <Select
                        variant="unstyled"
                        size="md"
                        defaultValue={currencyOne}
                        onChange={e => setCurrencyOne(e.target.value)}
                      >
                        {currencyList?.map((currency: any) => (
                          <option key={currency} value={currency}>
                            {currency} - {symbolsData.data[currency]}
                          </option>
                        ))}
                      </Select>
                    </Flex>
                  </GridItem>
                  <GridItem
                    display={{ base: 'none', sm: 'block' }}
                    colSpan={1}
                    justifySelf="center"
                    alignSelf="center"
                  >
                    <RepeatIcon boxSize="2rem" color="purple.300" />
                  </GridItem>
                  <GridItem
                    colSpan={{ base: 5, sm: 2 }}
                    justifySelf="center"
                    alignSelf="center"
                  >
                    <Flex
                      gap="1rem"
                      shadow="md"
                      padding="1rem"
                      borderRadius="lg"
                    >
                      <Avatar src={useFlags(currencyTwo)?.flagUrl} size="xs" />
                      <Select
                        variant="unstyled"
                        size="md"
                        defaultValue={currencyTwo}
                        onChange={e => setCurrencyTwo(e.target.value)}
                      >
                        {currencyList?.map((currency: any) => (
                          <option key={currency} value={currency}>
                            {currency} - {symbolsData.data[currency]}
                          </option>
                        ))}
                      </Select>
                    </Flex>
                  </GridItem>
                  <GridItem colSpan={2}>
                    <FormLabel
                      htmlFor="amount"
                      fontWeight="bold"
                      color="purple.500"
                    >
                      Amount
                    </FormLabel>
                    <Input
                      id="amount"
                      size="lg"
                      type="number"
                      min={0}
                      value={amount}
                      onChange={e => setAmount(e.target.value)}
                    />
                  </GridItem>
                  <GridItem colSpan={3} justifySelf="right" alignSelf="right">
                    <Box textAlign="right">
                      <Text fontSize="lg" fontWeight="bold">
                        {amount} {currencyOne}
                      </Text>
                      <Text fontSize="2xl" fontWeight="bold" color="purple.500">
                        {convertedAmount} {currencyTwo}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        Market rates collected - {date} {time}
                      </Text>
                    </Box>
                  </GridItem>
                </Grid>
              </Box>{' '}
            </Flex>
          </Box>
        </>
      ) : (
        // </>
        <Box>
          <ComponentPreview componentName={children[0]} />
        </Box>
      )}
    </Box>
  )
}

export default CurrencyConverterPreview
