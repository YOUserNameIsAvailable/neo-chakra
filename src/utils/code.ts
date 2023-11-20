import isBoolean from 'lodash/isBoolean'
import filter from 'lodash/filter'
import icons from '~iconsList'
import { useDropComponent } from '~hooks/useDropComponent'
import { componentsArray } from '../constants/index'

const capitalize = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export const formatCode = async (code: string) => {
  let formattedCode = `// 🚨 Your props contains invalid code`

  const prettier = await import('prettier/standalone')
  const babylonParser = await import('prettier/parser-babylon')

  try {
    formattedCode = prettier.format(code, {
      parser: 'babel',
      plugins: [babylonParser],
      semi: false,
      singleQuote: true,
    })
  } catch (e) {}

  return formattedCode
}

type BuildBlockParams = {
  component: IComponent
  components: IComponents
  forceBuildBlock?: boolean
}

const buildStyledProps = (propsNames: string[], childComponent: IComponent) => {
  let propsContent = ``

  propsNames.forEach((propName: string) => {
    const propsValue = childComponent.props[propName]

    if (
      propName.toLowerCase().includes('icon') &&
      childComponent.type !== 'Icon'
    ) {
      if (Object.keys(icons).includes(propsValue)) {
        let operand = `={<${propsValue} />}`

        propsContent += `${propName}${operand} `
      }
    } else if (propName !== 'children' && propsValue) {
      let operand = `='${propsValue}'`

      if (propsValue === true || propsValue === 'true') {
        operand = ``
      } else if (
        propsValue === 'false' ||
        isBoolean(propsValue) ||
        !isNaN(propsValue)
      ) {
        operand = `={${propsValue}}`
      }

      propsContent += `${propName}${operand} `
    }
  })

  return propsContent
}

const buildBlock = ({
  component,
  components,
  forceBuildBlock = false,
}: BuildBlockParams) => {
  let content = ''

  component.children.forEach((key: string) => {
    let childComponent = components[key]
    if (!childComponent) {
      console.error(`invalid component ${key}`)
    } else if (forceBuildBlock || !childComponent.componentName) {
      const componentName = capitalize(childComponent.type)
      let propsContent = ''

      const propsNames = Object.keys(childComponent.props).filter(propName => {
        if (childComponent.type === 'Icon') {
          return propName !== 'icon'
        }

        return true
      })

      // Special case for Highlight component
      if (componentName === 'Highlight') {
        const [query, children, ...restProps] = propsNames
        propsContent += buildStyledProps([query, children], childComponent)

        propsContent += `styles={{${restProps
          .filter(propName => childComponent.props[propName])
          .map(
            propName => `${propName}:'${childComponent.props[propName]}'`,
          )}}}`
      } else {
        propsContent += buildStyledProps(propsNames, childComponent)
      }

      if (
        typeof childComponent.props.children === 'string' &&
        childComponent.children.length === 0
      ) {
        content += `<${componentName} ${propsContent}>${childComponent.props.children}</${componentName}>`
      } else if (childComponent.type === 'Icon') {
        content += `<${childComponent.props.icon} ${propsContent} />`
      } else if (childComponent.children.length) {
        content += `<${componentName} ${propsContent}>
      ${buildBlock({ component: childComponent, components, forceBuildBlock })}
      </${componentName}>`
      } else {
        if (!componentsArray?.includes(componentName)) {
          content += `<${componentName} ${propsContent} />`
        } else if (componentName === 'CategoryShowcase') {
          content += `<Box
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
                minW="300px"
                objectFit="cover"
                flex="1"
              />

            </Flex>
          </Stack>
        </Box>`
        } else if (componentName === 'CallToAction') {
          content += `<Box as="section" bg="#dfde">
    <Container py={{ base: '16', md: '24' }}>
      <Stack spacing={{ base: '8', md: '10' }}>
        <Stack spacing={{ base: '4', md: '5' }} align="center">
          <Heading size={{ base: 'sm', md: 'md' }}>Ready to Grow?</Heading>
          <Text color="fg.muted" maxW="2xl" textAlign="center" fontSize="xl">
            With this beautiful and responsive React components you will realize your next project
            in no time.
          </Text>
        </Stack>
        <Stack spacing="3" direction={{ base: 'column', sm: 'row' }} justify="center">
          <Button variant="secondary" size="xl">
            Learn more
          </Button>
          <Button size="xl">Start Free Trial</Button>
        </Stack>
      </Stack>
    </Container>
  </Box>`
        } else if (componentName === 'PageHeader') {
          content += `<Container py={{ base: '16', md: '24' }}>
          <Stack spacing={{ base: '8', md: '10' }}>
            <Stack spacing={{ base: '4', md: '6' }}>
              <Stack spacing="3">
                <Text
                  fontSize={{ base: 'sm', md: 'md' }}
                  fontWeight="semibold"
                  color="accent"
                >
                  Tagline
                </Text>
                <Heading size={{ base: 'md', md: 'lg' }} fontWeight="semibold">
                  Get lifetime access
                </Heading>
              </Stack>
              <Text
                color="fg.muted"
                fontSize={{ base: 'lg', md: 'xl' }}
                maxW="3xl"
              >
                Get early access to 210+ components and free updates.
              </Text>
            </Stack>
            <Stack
              direction={{ base: 'column-reverse', md: 'row' }}
              spacing="4"
            >
              <Button variant="secondary" size="xl">
                Learn more
              </Button>
              <Button variant="primary" size="xl">
                Buy now
              </Button>
            </Stack>
          </Stack>
        </Container>`
        } else if (componentName === 'StorePopups') {
          content += `<Box height="100vh">
                <Stack
                  maxW="xs"
                  mx="auto"
                  py={{ base: '12', md: '16' }}
                  spacing={{ base: '6', md: '10' }}
                >
                  <Stack height="5">
                    <chakra.svg
                      viewBox="0 0 116 15"
                      fill="currentColor"
                      flexShrink={0}
                    >
                      <path d="M0 6.95215C0 5.97363 0.18457 5.0625 0.553711 4.21875C0.922852 3.36914 1.45605 2.63379 2.15332 2.0127C2.85645 1.38574 3.71191 0.893555 4.71973 0.536133C5.7334 0.178711 6.87891 0 8.15625 0C9.27539 0 10.3008 0.114258 11.2324 0.342773C12.1699 0.56543 13.04 0.908203 13.8428 1.37109L12.5596 3.48047C12.3193 3.32227 12.041 3.18164 11.7246 3.05859C11.4141 2.93555 11.0801 2.83301 10.7227 2.75098C10.3711 2.66309 10.0049 2.5957 9.62402 2.54883C9.24902 2.50195 8.87695 2.47852 8.50781 2.47852C7.61719 2.47852 6.82324 2.58984 6.12598 2.8125C5.42871 3.0293 4.83984 3.33691 4.35938 3.73535C3.88477 4.12793 3.52148 4.59961 3.26953 5.15039C3.02344 5.69531 2.90039 6.2959 2.90039 6.95215C2.90039 7.63184 3.0293 8.25586 3.28711 8.82422C3.54492 9.39258 3.91699 9.88477 4.40332 10.3008C4.89551 10.7109 5.49316 11.0332 6.19629 11.2676C6.90527 11.4961 7.70508 11.6104 8.5957 11.6104C9 11.6104 9.40137 11.5811 9.7998 11.5225C10.1982 11.4639 10.582 11.3848 10.9512 11.2852C11.3262 11.1797 11.6865 11.0566 12.0322 10.916C12.3779 10.7695 12.7002 10.6113 12.999 10.4414L14.2822 12.5508C13.5322 13.0312 12.665 13.4092 11.6807 13.6846C10.6963 13.9541 9.65039 14.0889 8.54297 14.0889C7.13086 14.0889 5.8916 13.9072 4.8252 13.5439C3.75879 13.1748 2.86816 12.6709 2.15332 12.0322C1.43848 11.3877 0.899414 10.6318 0.536133 9.76465C0.178711 8.8916 0 7.9541 0 6.95215Z" />
                      <path d="M20.9496 0.166992H23.7357V3.75293H32.2787V0.166992H35.0736V13.9043H32.2787V6.13477H23.7357V13.9043H20.9496V0.166992Z" />
                      <path d="M47.2605 0.166992H50.2137L56.8582 13.9043H53.9314L52.8328 11.5928H44.8084L43.7449 13.9043H40.8094L47.2605 0.166992ZM51.7342 9.29883L48.7635 3.05859L45.8719 9.29883H51.7342Z" />
                      <path d="M62.5939 0.166992H65.3801V7.27734L72.6311 0.166992H76.1994L69.4318 6.72363L76.1994 13.9043H72.4904L67.4279 8.66602L65.3801 10.6436V13.9043H62.5939V0.166992Z" />
                      <path d="M81.1705 0.166992H88.1578C89.2125 0.166992 90.1266 0.27832 90.9 0.500977C91.6734 0.717773 92.315 1.03418 92.8248 1.4502C93.3346 1.86621 93.7125 2.37305 93.9586 2.9707C94.2105 3.56836 94.3365 4.24512 94.3365 5.00098C94.3365 5.51074 94.275 5.99707 94.152 6.45996C94.0289 6.91699 93.8385 7.33887 93.5807 7.72559C93.3287 8.1123 93.0094 8.45801 92.6227 8.7627C92.2359 9.06152 91.7818 9.31055 91.2604 9.50977L94.2486 13.9043H90.8385L88.2545 10.002H88.1754L83.9566 9.99316V13.9043H81.1705V0.166992ZM88.2281 7.58496C88.7555 7.58496 89.2154 7.52344 89.608 7.40039C90.0064 7.27734 90.3375 7.10449 90.6012 6.88184C90.8707 6.65918 91.0699 6.38965 91.1988 6.07324C91.3336 5.75098 91.401 5.39355 91.401 5.00098C91.401 4.2334 91.1373 3.6416 90.61 3.22559C90.0826 2.80371 89.2887 2.59277 88.2281 2.59277H83.9566V7.58496H88.2281Z" />
                      <path d="M105.926 0.166992H108.879L115.523 13.9043H112.597L111.498 11.5928H103.474L102.41 13.9043H99.4746L105.926 0.166992ZM110.399 9.29883L107.429 3.05859L104.537 9.29883H110.399Z" />
                    </chakra.svg>
                  </Stack>
                  <Stack spacing="3" textAlign="center">
                    <Text fontSize="lg">Enter your email below &amp; get</Text>
                    <Text
                      color={useColorModeValue('blue.500', 'blue.200')}
                      fontWeight="extrabold"
                      fontSize={{ base: '5xl', md: '6xl' }}
                      textTransform="uppercase"
                      transform="scale(1.2)"
                    >
                      20% off
                    </Text>
                    <Text fontSize="lg">
                      <Box as="span" whiteSpace="nowrap" fontWeight="bold">
                        on your next purchase
                      </Box>{' '}
                      + exclusive access to new products
                    </Text>
                  </Stack>
                  <Stack
                    as="form"
                    spacing="3"
                    onSubmit={e => {
                      e.preventDefault()
                      // manage form submission
                    }}
                  >
                    <FormControl id="email">
                      <FormLabel srOnly>Enter your email</FormLabel>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        size="lg"
                        fontSize="md"
                        focusBorderColor={useColorModeValue(
                          'blue.500',
                          'blue.200',
                        )}
                      />
                    </FormControl>
                    <Button
                      type="submit"
                      fontWeight="bold"
                      textTransform="uppercase"
                      fontSize="md"
                      colorScheme="blue"
                      size="lg"
                    >
                      Get my 20% off
                    </Button>
                  </Stack>
                  <Link
                    fontSize="sm"
                    textAlign="center"
                    color={useColorModeValue('gray.600', 'gray.400')}
                    textDecoration="underline"
                  >
                    No, I don’t want discounts
                  </Link>
                </Stack>
        </Box>`
        } else if (componentName === 'WeatherForecast') {
          content += `<Box bgColor="#e1f6ff" minHeight="100%">
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
                    ? \`url(https://github.com/Khalifa1997/next-weather-app/blob/main/public/cloud.jpg?raw=true)\`
                    : \`url(https://github.com/Khalifa1997/next-weather-app/blob/main/public/sunny.jpg?raw=true)\`
                }              borderRadius="6px"
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
                                {weatherData?.data?.values?.uvIndex.toFixed(2)}
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
        </Box>`
        } else if (componentName === 'CurrencyConverter') {
          content += `
       <>
        <Flex
          bgGradient="linear(to-t, #ae085c, #2e0656)"
          height="100vh"
          justifyContent="center"
        >
          <Box width={{ base: "90vw", sm: "65vw" }} margin="0 auto">
            <Box
              textAlign="center"
              color="white"
              margin={{ base: "10", sm: "16" }}
              marginBottom="10"
            >
              <Text fontWeight="bold" fontSize={{ base: "2xl", sm: "3xl" }}>
                Currency Converter
              </Text>
            </Box>{" "}
            <Grid
              templateColumns="repeat(5, 1fr)"
              templateRows="repeat(2, 1fr)"
              padding={{ base: "6", sm: "10" }}
              gap="1rem"
              backgroundColor="white"
              borderRadius="lg"
            >
              <GridItem
                colSpan={{ base: 5, sm: 2 }}
                justifySelf="center"
                alignSelf="center"
              >
                <Flex gap="1rem" shadow="md" padding="1rem" borderRadius="lg">
                  <Avatar src={useFlags(currencyOne)?.flagUrl} size="xs" />
                  <Select
                    variant="unstyled"
                    size="md"
                    defaultValue={currencyOne}
                    onChange={(e) => setCurrencyOne(e.target.value)}
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
                display={{ base: "none", sm: "block" }}
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
                <Flex gap="1rem" shadow="md" padding="1rem" borderRadius="lg">
                  <Avatar src={useFlags(currencyTwo)?.flagUrl} size="xs" />
                  <Select
                    variant="unstyled"
                    size="md"
                    defaultValue={currencyTwo}
                    onChange={(e) => setCurrencyTwo(e.target.value)}
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
                  onChange={(e) => setAmount(e.target.value)}
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
          </Box>{" "}
        </Flex>
      </>
    `
        } else {
          content += `<Box as="section" pb={{ base: '12', md: '24' }}>
    <Box borderBottomWidth="1px" bg="bg.surface">
      <Container py={{ base: '4', md: '3.5' }}>
        <Stack
          direction="row"
          spacing={{ base: '3', md: '4' }}
          justify="space-between"
          align={{ base: 'start', md: 'center' }}
        >
          <Box>
            <Text fontWeight="medium">Hooray, twe just released a new version.</Text>
            <Text color="fg.muted">
              Exciting times ahead, as the new version integrates the most recent updates from
              Chakra UI.
            </Text>
          </Box>
          <IconButton icon={<FiX />} variant="tertiary" aria-label="Close banner" />
        </Stack>
      </Container>
    </Box>
  </Box>`
        }
      }
    } else {
      content += `<${childComponent.componentName} />`
    }
  })
  return content
}

const buildComponents = (components: IComponents) => {
  const codes = filter(components, comp => !!comp.componentName).map(comp => {
    return generateComponentCode({
      component: { ...components[comp.parent], children: [comp.id] },
      components,
      forceBuildBlock: true,
      componentName: comp.componentName,
    })
  })

  return codes.reduce((acc, val) => {
    return `
      ${acc}

      ${val}
    `
  }, '')
}

type GenerateComponentCode = {
  component: IComponent
  components: IComponents
  componentName?: string
  forceBuildBlock?: boolean
}

export const generateComponentCode = ({
  component,
  components,
  componentName,
  forceBuildBlock,
}: GenerateComponentCode) => {
  let code = buildBlock({
    component,
    components,
    forceBuildBlock,
  })

  code = `
const ${componentName} = () => (
  ${code}
)`

  return code
}

const getIconsImports = (components: IComponents) => {
  return Object.keys(components).flatMap(name => {
    return Object.keys(components[name].props)
      .filter(prop => prop.toLowerCase().includes('icon'))
      .filter(prop => !!components[name].props[prop])
      .map(prop => components[name].props[prop])
  })
}

export const generateCode = async (components: IComponents) => {
  let code = buildBlock({ component: components.root, components })
  let componentsCodes = buildComponents(components)
  const iconImports = Array.from(new Set(getIconsImports(components)))
  const imports = [
    ...new Set(
      Object.keys(components)
        .filter(name => name !== 'root')
        .map(name => components[name].type),
    ),
  ]

  const content = () => {
    let contentHtml = ''
    for (let i = 0; i < imports.length; i++) {
      if (imports[i] === 'CategoryShowcase') {
        contentHtml += `<Box
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
                minW="300px"
                objectFit="cover"
                flex="1"
              />

            </Flex>
          </Stack>
        </Box>`
      } else if (imports[i] === 'Banner') {
        contentHtml += `<Box as="section" pb={{ base: '12', md: '24' }}>
    <Box borderBottomWidth="1px" bg="bg.surface">
      <Container py={{ base: '4', md: '3.5' }}>
        <Stack
          direction="row"
          spacing={{ base: '3', md: '4' }}
          justify="space-between"
          align={{ base: 'start', md: 'center' }}
        >
          <Box>
            <Text fontWeight="medium">Hooray, twe just released a new version.</Text>
            <Text color="fg.muted">
              Exciting times ahead, as the new version integrates the most recent updates from
              Chakra UI.
            </Text>
          </Box>
          <IconButton icon={<FiX />} variant="tertiary" aria-label="Close banner" />
        </Stack>
      </Container>
    </Box>
  </Box>`
      } else if (imports[i] === 'StorePopups') {
        contentHtml += `<Box height="100vh">    
                <Stack
                  maxW="xs"
                  mx="auto"
                  py={{ base: '12', md: '16' }}
                  spacing={{ base: '6', md: '10' }}
                >
                  <Stack height="5">
                    <chakra.svg
                      viewBox="0 0 116 15"
                      fill="currentColor"
                      flexShrink={0}
                    >
                      <path d="M0 6.95215C0 5.97363 0.18457 5.0625 0.553711 4.21875C0.922852 3.36914 1.45605 2.63379 2.15332 2.0127C2.85645 1.38574 3.71191 0.893555 4.71973 0.536133C5.7334 0.178711 6.87891 0 8.15625 0C9.27539 0 10.3008 0.114258 11.2324 0.342773C12.1699 0.56543 13.04 0.908203 13.8428 1.37109L12.5596 3.48047C12.3193 3.32227 12.041 3.18164 11.7246 3.05859C11.4141 2.93555 11.0801 2.83301 10.7227 2.75098C10.3711 2.66309 10.0049 2.5957 9.62402 2.54883C9.24902 2.50195 8.87695 2.47852 8.50781 2.47852C7.61719 2.47852 6.82324 2.58984 6.12598 2.8125C5.42871 3.0293 4.83984 3.33691 4.35938 3.73535C3.88477 4.12793 3.52148 4.59961 3.26953 5.15039C3.02344 5.69531 2.90039 6.2959 2.90039 6.95215C2.90039 7.63184 3.0293 8.25586 3.28711 8.82422C3.54492 9.39258 3.91699 9.88477 4.40332 10.3008C4.89551 10.7109 5.49316 11.0332 6.19629 11.2676C6.90527 11.4961 7.70508 11.6104 8.5957 11.6104C9 11.6104 9.40137 11.5811 9.7998 11.5225C10.1982 11.4639 10.582 11.3848 10.9512 11.2852C11.3262 11.1797 11.6865 11.0566 12.0322 10.916C12.3779 10.7695 12.7002 10.6113 12.999 10.4414L14.2822 12.5508C13.5322 13.0312 12.665 13.4092 11.6807 13.6846C10.6963 13.9541 9.65039 14.0889 8.54297 14.0889C7.13086 14.0889 5.8916 13.9072 4.8252 13.5439C3.75879 13.1748 2.86816 12.6709 2.15332 12.0322C1.43848 11.3877 0.899414 10.6318 0.536133 9.76465C0.178711 8.8916 0 7.9541 0 6.95215Z" />
                      <path d="M20.9496 0.166992H23.7357V3.75293H32.2787V0.166992H35.0736V13.9043H32.2787V6.13477H23.7357V13.9043H20.9496V0.166992Z" />
                      <path d="M47.2605 0.166992H50.2137L56.8582 13.9043H53.9314L52.8328 11.5928H44.8084L43.7449 13.9043H40.8094L47.2605 0.166992ZM51.7342 9.29883L48.7635 3.05859L45.8719 9.29883H51.7342Z" />
                      <path d="M62.5939 0.166992H65.3801V7.27734L72.6311 0.166992H76.1994L69.4318 6.72363L76.1994 13.9043H72.4904L67.4279 8.66602L65.3801 10.6436V13.9043H62.5939V0.166992Z" />
                      <path d="M81.1705 0.166992H88.1578C89.2125 0.166992 90.1266 0.27832 90.9 0.500977C91.6734 0.717773 92.315 1.03418 92.8248 1.4502C93.3346 1.86621 93.7125 2.37305 93.9586 2.9707C94.2105 3.56836 94.3365 4.24512 94.3365 5.00098C94.3365 5.51074 94.275 5.99707 94.152 6.45996C94.0289 6.91699 93.8385 7.33887 93.5807 7.72559C93.3287 8.1123 93.0094 8.45801 92.6227 8.7627C92.2359 9.06152 91.7818 9.31055 91.2604 9.50977L94.2486 13.9043H90.8385L88.2545 10.002H88.1754L83.9566 9.99316V13.9043H81.1705V0.166992ZM88.2281 7.58496C88.7555 7.58496 89.2154 7.52344 89.608 7.40039C90.0064 7.27734 90.3375 7.10449 90.6012 6.88184C90.8707 6.65918 91.0699 6.38965 91.1988 6.07324C91.3336 5.75098 91.401 5.39355 91.401 5.00098C91.401 4.2334 91.1373 3.6416 90.61 3.22559C90.0826 2.80371 89.2887 2.59277 88.2281 2.59277H83.9566V7.58496H88.2281Z" />
                      <path d="M105.926 0.166992H108.879L115.523 13.9043H112.597L111.498 11.5928H103.474L102.41 13.9043H99.4746L105.926 0.166992ZM110.399 9.29883L107.429 3.05859L104.537 9.29883H110.399Z" />
                    </chakra.svg>
                  </Stack>
                  <Stack spacing="3" textAlign="center">
                    <Text fontSize="lg">Enter your email below &amp; get</Text>
                    <Text
                      color={useColorModeValue('blue.500', 'blue.200')}
                      fontWeight="extrabold"
                      fontSize={{ base: '5xl', md: '6xl' }}
                      textTransform="uppercase"
                      transform="scale(1.2)"
                    >
                      20% off
                    </Text>
                    <Text fontSize="lg">
                      <Box as="span" whiteSpace="nowrap" fontWeight="bold">
                        on your next purchase
                      </Box>{' '}
                      + exclusive access to new products
                    </Text>
                  </Stack>
                  <Stack
                    as="form"
                    spacing="3"
                    onSubmit={e => {
                      e.preventDefault()
                      // manage form submission
                    }}
                  >
                    <FormControl id="email">
                      <FormLabel srOnly>Enter your email</FormLabel>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        size="lg"
                        fontSize="md"
                        focusBorderColor={useColorModeValue(
                          'blue.500',
                          'blue.200',
                        )}
                      />
                    </FormControl>
                    <Button
                      type="submit"
                      fontWeight="bold"
                      textTransform="uppercase"
                      fontSize="md"
                      colorScheme="blue"
                      size="lg"
                    >
                      Get my 20% off
                    </Button>
                  </Stack>
                  <Link
                    fontSize="sm"
                    textAlign="center"
                    color={useColorModeValue('gray.600', 'gray.400')}
                    textDecoration="underline"
                  >
                    No, I don’t want discounts
                  </Link>
                </Stack>
            
        </Box>`
      } else if (imports[i] === 'CallToAction') {
        contentHtml += `<Box as="section" bg="#dfde">
    <Container py={{ base: '16', md: '24' }}>
      <Stack spacing={{ base: '8', md: '10' }}>
        <Stack spacing={{ base: '4', md: '5' }} align="center">
          <Heading size={{ base: 'sm', md: 'md' }}>Ready to Grow?</Heading>
          <Text color="fg.muted" maxW="2xl" textAlign="center" fontSize="xl">
            With this beautiful and responsive React components you will realize your next project
            in no time.
          </Text>
        </Stack>
        <Stack spacing="3" direction={{ base: 'column', sm: 'row' }} justify="center">
          <Button variant="secondary" size="xl">
            Learn more
          </Button>
          <Button size="xl">Start Free Trial</Button>
        </Stack>
      </Stack>
    </Container>
  </Box>`
      } else if (imports[i] === 'PageHeader') {
        contentHtml += `<Container py={{ base: '16', md: '24' }}>
          <Stack spacing={{ base: '8', md: '10' }}>
            <Stack spacing={{ base: '4', md: '6' }}>
              <Stack spacing="3">
                <Text
                  fontSize={{ base: 'sm', md: 'md' }}
                  fontWeight="semibold"
                  color="accent"
                >
                  Tagline
                </Text>
                <Heading size={{ base: 'md', md: 'lg' }} fontWeight="semibold">
                  Get lifetime access
                </Heading>
              </Stack>
              <Text
                color="fg.muted"
                fontSize={{ base: 'lg', md: 'xl' }}
                maxW="3xl"
              >
                Get early access to 210+ components and free updates.
              </Text>
            </Stack>
            <Stack
              direction={{ base: 'column-reverse', md: 'row' }}
              spacing="4"
            >
              <Button variant="secondary" size="xl">
                Learn more
              </Button>
              <Button variant="primary" size="xl">
                Buy now
              </Button>
            </Stack>
          </Stack>
        </Container>`
      } else if (imports[i] === 'WeatherForecast') {
        contentHtml += `<Box bgColor="#e1f6ff" minHeight="100%">
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
                    ? \`url(https://github.com/Khalifa1997/next-weather-app/blob/main/public/cloud.jpg?raw=true)\`
                    : \`url(https://github.com/Khalifa1997/next-weather-app/blob/main/public/sunny.jpg?raw=true)\`
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
                                {weatherData?.data?.values?.uvIndex.toFixed(2)}
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
        </Box>`
      } else if (imports[i] === 'CurrencyConverter') {
        contentHtml += ` <>
        <Flex
          bgGradient="linear(to-t, #ae085c, #2e0656)"
          height="100vh"
          justifyContent="center"
        >
          <Box width={{ base: "90vw", sm: "65vw" }} margin="0 auto">
            <Box
              textAlign="center"
              color="white"
              margin={{ base: "10", sm: "16" }}
              marginBottom="10"
            >
              <Text fontWeight="bold" fontSize={{ base: "2xl", sm: "3xl" }}>
                Currency Converter
              </Text>
            </Box>{" "}
            <Grid
              templateColumns="repeat(5, 1fr)"
              templateRows="repeat(2, 1fr)"
              padding={{ base: "6", sm: "10" }}
              gap="1rem"
              backgroundColor="white"
              borderRadius="lg"
            >
              <GridItem
                colSpan={{ base: 5, sm: 2 }}
                justifySelf="center"
                alignSelf="center"
              >
                <Flex gap="1rem" shadow="md" padding="1rem" borderRadius="lg">
                  <Avatar src={useFlags(currencyOne)?.flagUrl} size="xs" />
                  <Select
                    variant="unstyled"
                    size="md"
                    defaultValue={currencyOne}
                    onChange={(e) => setCurrencyOne(e.target.value)}
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
                display={{ base: "none", sm: "block" }}
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
                <Flex gap="1rem" shadow="md" padding="1rem" borderRadius="lg">
                  <Avatar src={useFlags(currencyTwo)?.flagUrl} size="xs" />
                  <Select
                    variant="unstyled"
                    size="md"
                    defaultValue={currencyTwo}
                    onChange={(e) => setCurrencyTwo(e.target.value)}
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
                  onChange={(e) => setAmount(e.target.value)}
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
          </Box>{" "}
        </Flex>
      </>
     `
      } else {
        contentHtml = code
      }
    }
    return contentHtml
  }

  const weatherForecast = ` 
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

  const formatTime = (inputTime: any) => {
    const date = new Date(inputTime)
    const dayName = date.toLocaleString('en-US', { weekday: 'long' })
    return dayName
  }

  const handleChange = async (e: React.FormEvent<HTMLInputElement>) => {
    await setCurrentCity(e.currentTarget.value)
  }
  
  const getWeather = () => {
    fetch(
      \`https://api.tomorrow.io/v4/weather/realtime?location=\${currentCity}&apikey=TrchKDjt3EgsrYIhM0fUFMMcaFMFssoS\`,
    )
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
        setWeatherData(data)
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }`

  const CurrencyConverter = ` 

   const [amount, setAmount] = useState('1')
  const [currencyOne, setCurrencyOne] = useState('USD')
  const [currencyTwo, setCurrencyTwo] = useState('ETB')

   const fetchSymbols = async () => {
  const { data } = await axios.get(
    \`https://api.apilayer.com/fixer/symbols?apikey=OYGvNPxqCHmwRQKZWw4oq4x2RoaYgDmV\`,
  )
  return data
}
  const [ratesData, symbolsData] = useQueries({
    queries: [
      {
        queryKey: ['rates', currencyOne],
        queryFn: () => fetchRates(currencyOne),
        staleTime: Infinity,
        select: ({ rates, date, timestamp }) => {
          return { rates, date, timestamp }
        },
        keepPreviousData: true,
      },
      {
        queryKey: ['symbols'],
        queryFn: fetchSymbols,
        staleTime: Infinity,
        select: ({ symbols }) => symbols,
      },
    ],
  })

  const isLoading = [ratesData, symbolsData].some(query => query.isLoading)
  const isError = [ratesData, symbolsData].some(query => query.isError)

  const convertedAmount = (ratesData.data?.rates[currencyTwo] * amount).toFixed(
    2,
  )

  const date = new Date(ratesData.data?.date).toLocaleDateString()
  const time = new Date(ratesData.data?.timestamp).toLocaleTimeString('en-US')

  const currencyList = symbolsData.data ? Object.keys(symbolsData.data) : []

  const fetchRates = async currencyOne => {
  const { data } = await axios.get(
    \`https://api.apilayer.com/fixer/latest?base=\${currencyOne}&apikey=OYGvNPxqCHmwRQKZWw4oq4x2RoaYgDmV\`,
  )
  return data
}



const useFlags = (flag: any) => {
  const flagUrl = \`https://wise.com/public-resources/assets/flags/rectangle/\${flag.toLowerCase()}.png\`
  return { flagUrl }
}

  if (isError)
    return (
      <Text fontWeight="bold" fontSize="3xl" color="red" my="10">
        Something has gone wrong
      </Text>
    )

    if (isLoading)
    return (
      <Spinner
        margin="auto 0"
        size="xl"
        thickness="4px"
        speed="0.6s"
        color="purple.500"
        emptyColor="purple.200"
      />
    );

 `
  const importContent = () => {
    let contentImports = ''
    for (let i = 0; i < imports.length; i++) {
      if (imports[i] === 'CategoryShowcase') {
        contentImports += `,Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Skeleton,
  Stack,
  useColorModeValue`
      } else if (imports[i] === 'Banner') {
        contentImports += `,Box, Container, IconButton, Stack, Text`
      } else if (imports[i] === 'StorePopups') {
        contentImports += ` ,Box,
  Link,
  Stack,
  Text,
  useColorModeValue,
  chakra,
  Button,
  FormControl,
  FormLabel,
  Input`
      } else if (imports[i] === 'CallToAction') {
        contentImports += `,Box, Button, Container, Heading, Stack, Text`
      } else if (imports[i] === 'PageHeader') {
        contentImports += `,Box, Button, Container, Heading, Stack, Text`
      } else if (imports[i] === 'WeatherForecast') {
        contentImports += `,Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text`
      } else if (imports[i] === 'CurrencyConverter') {
        contentImports += `,Avatar,
  Box,
  Flex,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Select,
  Text,
  Spinner`
      } else {
      }
    }
    const importItems = imports.join(',')
    const mergedImports = importItems + contentImports
    const uniqueItems = mergedImports
      .split(',')
      .map(item => item.trim()) // Remove leading/trailing whitespace
      .filter((item, index, self) => self.indexOf(item) === index) // Remove duplicates
      .join(', ')
    return uniqueItems
  }

  code = `import React, { useState, useEffect } from 'react'
;
import {
  ChakraProvider,
  ${importContent()}
  
} from "@chakra-ui/react";
${
  imports?.includes('CategoryShowcase')
    ? `import { ArrowForwardIcon } from '@chakra-ui/icons' `
    : ''
}
${
  imports?.includes('CurrencyConverter')
    ? `import { RepeatIcon } from '@chakra-ui/icons'`
    : ''
}
${imports?.includes('Banner') ? `import { FiX } from 'react-icons/fi' ` : ''}
${
  imports?.includes('WeatherForecast')
    ? `import {
   BsSunFill,
  BsCloudsFill,
  BsWind,
  BsCloudFog,
  BsSun,
  BsFillArrowUpCircleFill,
  BsCloudDrizzle
} from 'react-icons/bs' `
    : ''
}
${
  imports?.includes('CurrencyConverter')
    ? `import { useQueries } from '@tanstack/react-query'
import axios from 'axios'
 `
    : ''
}

${
  iconImports.length
    ? `

import { ${iconImports.join(',')} } from "@chakra-ui/icons";`
    : ''
}

${componentsCodes}

const App = () => {
  ${imports?.includes('WeatherForecast') ? weatherForecast : ''}
    ${imports?.includes('CurrencyConverter') ? CurrencyConverter : ''}

  return (
    
  <ChakraProvider resetCSS>
    ${content()}
  </ChakraProvider>
  )
};

export default App;`

  return await formatCode(code)
}
