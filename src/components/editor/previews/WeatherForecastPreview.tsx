import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Input,
  InputGroup,
  Text,
  useToast,
} from '@chakra-ui/react'

import { useInteractive } from '~hooks/useInteractive'
import { useDropComponent } from '~hooks/useDropComponent'
import ComponentPreview from '~components/editor/ComponentPreview'
import {
  BsSunFill,
  BsCloudsFill,
  BsWind,
  BsCloudFog,
  BsSun,
  BsFillArrowUpCircleFill,
  BsCloudDrizzle,
} from 'react-icons/bs'

const WeatherForecastPreview: React.FC<{ component: IComponent }> = ({
  component,
}) => {
  const { props, ref } = useInteractive(component, true)
  const [weatherData, setWeatherData] = useState({
    data: {
      time: '2023-10-12T05:52:00Z',
      values: {
        cloudBase: null,
        cloudCeiling: null,
        cloudCover: 1,
        dewPoint: 4.5,
        freezingRainIntensity: 0,
        humidity: 93,
        precipitationProbability: 0,
        pressureSurfaceLevel: 1001.32,
        rainIntensity: 0,
        sleetIntensity: 0,
        snowIntensity: 0,
        temperature: 5.81,
        temperatureApparent: 5.81,
        uvHealthConcern: 0,
        uvIndex: 0,
        visibility: 15.42,
        weatherCode: 1000,
        windDirection: 276.5,
        windGust: 0.88,
        windSpeed: 0.88,
      },
    },
    location: {
      lat: 43.653480529785156,
      lon: -79.3839340209961,
      name: 'Toronto, Toronto, Golden Horseshoe, Ontario, Canada',
      type: 'administrative',
    },
  })
  const [currentCity, setCurrentCity] = useState('')
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const formatTime = (inputTime: any) => {
    const date = new Date(inputTime)
    const dayName = date.toLocaleString('en-US', { weekday: 'long' })
    return dayName
  }

  const handleChange = async (e: React.FormEvent<HTMLInputElement>) => {
    await setCurrentCity(e.currentTarget.value)
  }
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

  const getWeather = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `https://api.tomorrow.io/v4/weather/realtime?location=${currentCity}&apikey=${process.env.NEXT_APP_ACCESS_TOKEN}`,
      )

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setWeatherData(data)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box {...boxProps}>
      {!children.length ? (
        /*
         * We need at least one children because of the implementation
         * of AspectRatio
         */
        <>
          <div>
            {loading && (
              <div className="loader-overlay">
                <div className="loader"></div>
              </div>
            )}
          </div>
          <Box bgColor="#e1f6ff" minHeight="100%">
            <Flex
              bg="primary.100"
              alignItems="center"
              height={20}
              justifyContent="space-between"
            >
              <Text
                ml={{ base: 3, md: 10, lg: 5 }}
                fontSize="3xl"
                color="primary.900"
                as="b"
              >
                Weather
              </Text>
              <Flex
                bg="primary.100"
                alignItems="center"
                mr={[5, 10, 5]}
                justifyContent="end"
              >
                <InputGroup
                  bg="white"
                  maxWidth={{ base: '60%', md: '60%', lg: '60%' }}
                  position="relative"
                >
                  <Input placeholder="Enter City" onChange={handleChange} />
                </InputGroup>
                <Button
                  bg="white"
                  variant="secondary"
                  size="md"
                  onClick={() => getWeather()}
                >
                  Search
                </Button>
              </Flex>
            </Flex>

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <Box
                minH={350}
                maxH={600}
                bgColor="primary.f9f8fe"
                w="95%"
                backgroundRepeat="no-repeat"
                backgroundPosition="center"
                backgroundSize="cover"
                backgroundImage={
                  weatherData?.data?.values?.cloudCover > 50
                    ? `url(https://github.com/Khalifa1997/next-weather-app/blob/main/public/cloud.jpg?raw=true)`
                    : `url(https://github.com/Khalifa1997/next-weather-app/blob/main/public/sunny.jpg?raw=true)`
                }
                borderRadius="6px"
                position="relative"
              >
                <Flex
                  flexDirection="row"
                  position="absolute"
                  bottom="10px"
                  left="0px"
                  w="100%"
                  justifyContent="space-between"
                >
                  <Box position="absolute" bottom="0px" left="20px">
                    {weatherData?.data?.values?.cloudCover > 50 ? (
                      <BsCloudsFill color="white" size={55} />
                    ) : (
                      <BsSunFill color="white" size={55} />
                    )}
                    <Text color="whiteAlpha.800" fontSize="5xl">
                      {Math.ceil(weatherData?.data?.values?.temperature)}°C
                    </Text>
                    <Text color="whiteAlpha.800" fontSize="2xl">
                      {weatherData?.location?.name?.split(',')?.[0]?.trim()}
                    </Text>
                  </Box>
                  <Box
                    position="absolute"
                    bottom="0px"
                    right="20px"
                    textAlign="right"
                  >
                    <Text
                      color="whiteAlpha.900"
                      fontSize="2xl"
                      width="100%"
                    ></Text>
                    <Text color="whiteAlpha.700" fontSize="2xl">
                      {formatTime(weatherData?.data?.time)}
                    </Text>
                  </Box>
                </Flex>
              </Box>

              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <Box minH={350} maxH={600} w="95%" position="relative">
                  <Flex
                    direction={{ base: 'column', md: 'column', lg: 'row' }}
                    justifyContent={{
                      base: 'center',
                      md: 'space-around',
                      lg: 'space-around',
                    }}
                    // alignItems="center"
                    gap={{ base: 10, md: 10, lg: 40 }}
                    marginTop={4}
                  >
                    <Flex direction="column">
                      <Box
                        bg={'white'}
                        border="2px"
                        borderColor="gray.400"
                        borderRadius="md"
                        width="inherit"
                        m={4}
                      >
                        {' '}
                        <Grid
                          templateColumns="180px 5px 220px"
                          rowGap={3}
                          columnGap={4}
                          alignItems="center"
                          justifyContent="center"
                          minHeight={200}
                        >
                          <GridItem h="10">
                            <Flex justify="center">
                              <BsWind
                                style={{
                                  marginTop: 'auto',
                                  marginBottom: 'auto',
                                }}
                                size={40}
                                color="#6B81FE"
                              />

                              <Box ml={4}>
                                <Text fontSize="xl">Humidity</Text>
                                <Text as="b">
                                  {weatherData?.data?.values?.humidity}%
                                </Text>
                              </Box>
                            </Flex>
                          </GridItem>
                          <GridItem rowSpan={2} width={4}>
                            <Box
                              m="auto"
                              height={[50, 100, 150]}
                              borderLeft="1px"
                              width={3}
                              borderColor="gray.300"
                            ></Box>
                          </GridItem>
                          <GridItem h="10">
                            <Flex justify="center">
                              <BsCloudDrizzle
                                style={{
                                  marginTop: 'auto',
                                  marginBottom: 'auto',
                                }}
                                size={40}
                                color="#6B81FE"
                              />
                              <Box ml={4}>
                                <Text fontSize="xl">Rain Level</Text>
                                <Text as="b">
                                  {weatherData?.data?.values?.rainIntensity}%
                                </Text>
                              </Box>
                            </Flex>
                          </GridItem>
                          <GridItem h="10">
                            <Flex justify="center">
                              <BsSun
                                style={{
                                  marginTop: 'auto',
                                  marginBottom: 'auto',
                                }}
                                size={40}
                                color="#6B81FE"
                              />
                              <Box ml={4}>
                                <Text fontSize="xl">UV Index</Text>
                                <Text as="b">
                                  {weatherData?.data?.values?.uvIndex.toFixed(
                                    2,
                                  )}
                                </Text>
                              </Box>
                            </Flex>
                          </GridItem>

                          <GridItem h="10">
                            <Flex justify="center">
                              <BsCloudFog
                                style={{
                                  marginTop: 'auto',
                                  marginBottom: 'auto',
                                }}
                                size={40}
                                color="#6B81FE"
                              />
                              <Box ml={4}>
                                <Text fontSize="xl">Dew Point</Text>
                                <Text as="b">
                                  {weatherData?.data?.values?.dewPoint}%
                                </Text>
                              </Box>
                            </Flex>
                          </GridItem>
                        </Grid>
                      </Box>
                      <Box
                        bg={'white'}
                        border="2px"
                        borderColor="gray.400"
                        borderRadius="md"
                        width="inherit"
                        m={4}
                      >
                        <Flex
                          direction="column"
                          alignItems="center"
                          justifyContent="center"
                          minHeight={200}
                        >
                          <Text mb="5" fontSize="xx-large">
                            Wind
                          </Text>
                          <BsFillArrowUpCircleFill color="#7D90FE" size={60} />

                          <Text as="i" mt="2">
                            {weatherData?.data?.values?.windSpeed * 3.6}
                            Km/h
                          </Text>
                        </Flex>
                      </Box>{' '}
                    </Flex>
                  </Flex>
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        <Box>
          <ComponentPreview componentName={children[0]} />
        </Box>
      )}
    </Box>
  )
}

export default WeatherForecastPreview
