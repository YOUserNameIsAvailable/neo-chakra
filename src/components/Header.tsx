import React, { memo, useState } from 'react'
import {
  Box,
  Switch,
  Button,
  Flex,
  Link,
  Stack,
  FormLabel,
  DarkMode,
  FormControl,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  LightMode,
  PopoverFooter,
  Tooltip,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  useToast,
} from '@chakra-ui/react'
import { ExternalLinkIcon, SmallCloseIcon, CheckIcon } from '@chakra-ui/icons'
import { DiGithubBadge } from 'react-icons/di'
import { AiFillThunderbolt } from 'react-icons/ai'
import { SiTypescript } from 'react-icons/si'
import { buildParameters } from '~utils/codesandbox'
import { generateCode } from '~utils/code'
import useDispatch from '~hooks/useDispatch'
import { useSelector } from 'react-redux'
import { getComponents } from '~core/selectors/components'
import { getShowLayout, getShowCode } from '~core/selectors/app'
import HeaderMenu from '~components/headerMenu/HeaderMenu'
import { FaReact } from 'react-icons/fa'
const CodeSandboxButton = ({
  setAllPages,
  singlePageData,
  setSinglePageData,
  setSelectedItem,
}: any) => {
  const components = useSelector(getComponents)
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [code, setCode] = useState<string | undefined>(undefined)
  const [error, setError] = useState(false)
  const [onSaveLoader, setOnSaveLoader] = useState(false)
  const toast = useToast()
  const exportToCodeSandbox = async (isTypeScript: boolean) => {
    setIsLoading(true)
    const code = await generateCode(components)
    let isCurrencyCoverter = false
    if (code?.includes('Currency Converter')) isCurrencyCoverter = true
    setIsLoading(false)
    const parameters = buildParameters(code, isTypeScript, isCurrencyCoverter)
    window.open(
      `https://codesandbox.io/api/v1/sandboxes/define?parameters=${parameters}`,
      '_blank',
    )
  }
  const getCode = async () => {
    const code = await generateCode(components)

    setCode(code)
  }
  const openModal = () => {
    setIsModalOpen(true)
    getCode()
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }
  const handleChange = (e: any) => {
    if (singlePageData?.title) {
      setError(false)
    }
    setSinglePageData((prevState: any) => ({
      ...prevState,
      title: e.target.value,
    }))
  }
  const handleSave = async () => {
    if (!singlePageData?.title) return setError(true)
    setOnSaveLoader(true)
    const jsonString = JSON.stringify(components)

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: singlePageData?.title,
        pageHtml: code,
        component: jsonString,
        // pageId: singlePageData?._id ?? null,
      }),
    }
    try {
      const response = await fetch('/api/page', requestOptions)
      const data = await response.json()
      setOnSaveLoader(false)

      if (data?.message) {
        toast({
          title: 'Success',
          description: data?.message,
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top',
        })
        setAllPages(true)
        setSelectedItem({})
        setSinglePageData({})

        closeModal()
      } else {
        toast({
          title: 'Error',
          description: data?.error,
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'top',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred while saving.',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top',
      })
      setOnSaveLoader(false)
    }
  }
  const handleUpdate = async () => {
    if (!singlePageData?.title) return setError(true)
    setOnSaveLoader(true)
    const jsonString = JSON.stringify(components)

    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: singlePageData?.title,
        pageHtml: code,
        component: jsonString,
      }),
    }
    try {
      const response = await fetch(
        `/api/page?pageId=${singlePageData?._id}`,
        requestOptions,
      )
      const data = await response.json()
      setOnSaveLoader(false)
      if (data?.message) {
        toast({
          title: 'Success',
          description: data?.message,
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top',
        })
        closeModal()
        setSelectedItem({})
        setSinglePageData({})
        setAllPages(true)
      } else {
        toast({
          title: 'Error',
          description: data?.error,
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'top',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred while saving.',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top',
      })
      setOnSaveLoader(false)
    }
  }
  return (
    <Popover>
      {({ onClose }: any) => (
        <>
          <Button
            isLoading={onSaveLoader}
            variant="ghost"
            size="xs"
            onClick={openModal}
            isDisabled={components?.root?.children?.length === 0 ? true : false}
          >
            {Object.keys(singlePageData).length > 0 && singlePageData?._id
              ? 'Update'
              : 'Save'}
          </Button>
          <Modal isOpen={isModalOpen} onClose={closeModal} size="md">
            <ModalOverlay />
            <ModalContent bg="white">
              <ModalHeader>Save Page</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <FormLabel color={'black'}>Page Title</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter a title"
                    value={singlePageData?.title}
                    onChange={e => handleChange(e)}
                    borderColor="blue.300"
                    _focus={{ borderColor: 'blue.300', boxShadow: 'none' }}
                    _hover={{ borderColor: 'blue.300' }}
                  />
                  {error && (
                    <div style={{ color: 'red' }}>
                      Please enter the page title
                    </div>
                  )}{' '}
                  {/* Display error message */}
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={closeModal}>
                  Cancel
                </Button>
                <Button
                  isLoading={onSaveLoader}
                  colorScheme="blue"
                  onClick={() => {
                    singlePageData?._id ? handleUpdate() : handleSave()
                  }}
                  disabled={!singlePageData?.title || onSaveLoader} // Disable the button if no title or in loading state
                >
                  Save
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <PopoverTrigger>
            <Button
              isLoading={isLoading}
              rightIcon={<ExternalLinkIcon path="" />}
              variant="ghost"
              size="xs"
            >
              Export code
            </Button>
          </PopoverTrigger>
          <LightMode>
            <PopoverContent zIndex={100} bg="white">
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Export format</PopoverHeader>
              <PopoverBody fontSize="sm">
                Export the code in CodeSandbox in which format ?
              </PopoverBody>
              <PopoverFooter display="flex" justifyContent="flex-end">
                <Button
                  size="sm"
                  mr={2}
                  variant="ghost"
                  colorScheme="orange"
                  rightIcon={<FaReact />}
                  onClick={async () => {
                    await exportToCodeSandbox(false)
                    if (onClose) {
                      onClose()
                    }
                  }}
                >
                  JSX
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  colorScheme="blue"
                  rightIcon={<SiTypescript />}
                  onClick={async () => {
                    await exportToCodeSandbox(true)
                    if (onClose) {
                      onClose()
                    }
                  }}
                >
                  TSX
                </Button>
              </PopoverFooter>
            </PopoverContent>
          </LightMode>
        </>
      )}
    </Popover>
  )
}
const Header = ({
  setAllPages,
  singlePageData,
  setSinglePageData,
  setSelectedItem,
}: any) => {
  const showLayout = useSelector(getShowLayout)
  const showCode = useSelector(getShowCode)
  const components = useSelector(getComponents)
  const dispatch = useDispatch()
  return (
    <DarkMode>
      <Flex
        justifyContent="space-between"
        bg="#1a202c"
        as="header"
        height="3rem"
        px="1rem"
      >
        <Flex
          width="14rem"
          height="100%"
          backgroundColor="#1a202c"
          color="white"
          as="a"
          fontSize="xl"
          flexDirection="row"
          alignItems="center"
          aria-label="Chakra UI, Back to homepage"
        >
          <Box fontSize="2xl" as={AiFillThunderbolt} mr={1} color="teal.100" />{' '}
          <Box fontWeight="bold">Chakra</Box> Builder
        </Flex>
        <Flex flexGrow={1} justifyContent="space-between" alignItems="center">
          <HStack spacing={4} justify="center" align="center">
            <Box>
              <HeaderMenu />
            </Box>
            <FormControl flexDirection="row" display="flex" alignItems="center">
              <Tooltip
                zIndex={100}
                hasArrow
                bg="yellow.100"
                aria-label="Builder mode help"
                label="Builder mode adds extra padding/borders"
              >
                <FormLabel
                  cursor="help"
                  color="gray.200"
                  fontSize="xs"
                  htmlFor="preview"
                  pb={0}
                  mb={0}
                  mr={2}
                  whiteSpace="nowrap"
                >
                  Builder mode
                </FormLabel>
              </Tooltip>
              <LightMode>
                <Switch
                  isChecked={showLayout}
                  colorScheme="teal"
                  size="sm"
                  onChange={() => dispatch.app.toggleBuilderMode()}
                  id="preview"
                />
              </LightMode>
            </FormControl>
            <FormControl display="flex" flexDirection="row" alignItems="center">
              <FormLabel
                color="gray.200"
                fontSize="xs"
                mr={2}
                mb={0}
                htmlFor="code"
                pb={0}
                whiteSpace="nowrap"
              >
                Code panel
              </FormLabel>
              <LightMode>
                <Switch
                  isChecked={showCode}
                  id="code"
                  colorScheme="teal"
                  onChange={() => dispatch.app.toggleCodePanel()}
                  size="sm"
                />
              </LightMode>
            </FormControl>
          </HStack>
          <Stack direction="row">
            <CodeSandboxButton
              setAllPages={setAllPages}
              singlePageData={singlePageData}
              setSinglePageData={setSinglePageData}
              setSelectedItem={setSelectedItem}
            />
            <Popover>
              {({ onClose }: any) => (
                <>
                  <PopoverTrigger>
                    <Button
                      ml={4}
                      rightIcon={<SmallCloseIcon path="" />}
                      size="xs"
                      variant="ghost"
                    >
                      Clear
                    </Button>
                  </PopoverTrigger>
                  <LightMode>
                    <PopoverContent zIndex={100} bg="white">
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>Are you sure?</PopoverHeader>
                      <PopoverBody fontSize="sm">
                        Do you really want to remove all components on the
                        editor?
                      </PopoverBody>
                      <PopoverFooter display="flex" justifyContent="flex-end">
                        <Button
                          size="sm"
                          variant="ghost"
                          colorScheme="red"
                          rightIcon={<CheckIcon path="" />}
                          onClick={() => {
                            setSelectedItem({})
                            dispatch.components.reset()
                            setSinglePageData({})
                            if (onClose) {
                              onClose()
                            }
                          }}
                        >
                          Yes, clear
                        </Button>
                      </PopoverFooter>
                    </PopoverContent>
                  </LightMode>
                </>
              )}
            </Popover>
          </Stack>
        </Flex>
      </Flex>
    </DarkMode>
  )
}
export default memo(Header)
