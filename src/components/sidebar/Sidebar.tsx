import React, { useState, useEffect, ChangeEvent, memo } from 'react'
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  DarkMode,
  IconButton,
  Select,
  FormControl,
  Text,
} from '@chakra-ui/react'
import { CloseIcon, SearchIcon } from '@chakra-ui/icons'
import { TiTickOutline } from 'react-icons/ti'
import {
  proComponentItems,
  applicationItems,
  ecommerceItems,
  marketingItems,
  menuItems,
} from '~componentsList'
import DragItem from './DragItem'
import useDispatch from '~hooks/useDispatch'
const Menu = ({
  filteredItems,
  setPagesArray,
  setSinglePageCode,
  setSinglePageData,
  selectedItem,
  setSelectedItem,
}: any) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const categoryOptions = [
    'Basic',
    'Pro-Components',
    'Application',
    'E-Commerce',
    'Marketing',
  ]
  const dispatch = useDispatch()
  const parentOptions: JSX.Element[] = []
  for (const itemName in menuItems) {
    parentOptions.push(
      <option
        value={itemName}
        key={itemName}
        style={{
          color: 'white',
        }}
      >
        {itemName}
      </option>,
    )
  }

  const fetchData = async (data: any) => {
    try {
      setLoading(true)
      setSelectedItem(data)
      setSinglePageData(data)
      const response = await fetch(`/api/page?pageId=${data?._id}`)
      const result = await response.json()
      const component = JSON.parse(result?.component)
      dispatch.components.reset(component)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.error(err)
    }
  }

  useEffect(() => {
    const filtered = filteredItems?.filter((item: any) =>
      item?.title?.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setPagesArray(filtered)
  }, [searchTerm])
  return (
    <DarkMode>
      <div>
        {loading && (
          <div className="loader-overlay">
            <div className="loader"></div>
          </div>
        )}
      </div>
      <Box
        className="dev-box"
        maxH="calc(100vh - 3rem)"
        overflowY="auto"
        overflowX="visible"
        boxShadow="xl"
        flex="0 0 16rem"
        m={0}
        as="menu"
        backgroundColor="white"
        width="100rem"
      >
        <Box>
          <Text fontWeight="bold">Pages</Text>
          <InputGroup size="sm" mb={4} mt={4} backgroundColor="white">
            <Input
              value={searchTerm}
              color="gray.600"
              placeholder="Search"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(event.target.value)
              }
              borderColor="gray.400" // Set the border color to gray (e.g., gray.400)
              bg="rgba(255, 255, 255, 0.06)"
              _hover={{
                borderColor: 'gray.500', // Change border color on hover (e.g., gray.500)
              }}
              zIndex={0}
              _placeholder={{
                color: 'gray.400', // Set the placeholder color to gray
              }}
            />
            <InputRightElement zIndex={1}>
              {searchTerm ? (
                <IconButton
                  color="gray.300"
                  aria-label="clear"
                  icon={<CloseIcon path="" />}
                  size="xs"
                  onClick={() => setSearchTerm('')}
                />
              ) : (
                <SearchIcon path="" color="gray.300" />
              )}
            </InputRightElement>
          </InputGroup>
          <div className="api-scroll custom-scrollbar">
            {filteredItems?.map((item: any) => (
              <ul className="main-menu">
                <li
                  title={selectedItem?.title}
                  key={item}
                  className={selectedItem?._id === item?._id ? 'bold-text' : ''}
                  onClick={() => fetchData(item)}
                >
                  <TiTickOutline />{' '}
                  {item?.title?.length > 18
                    ? item?.title.slice(0, 15) + '...'
                    : item?.title}
                </li>
              </ul>
            ))}
          </div>
        </Box>
      </Box>
      <Box
        maxH="calc(100vh - 3rem)"
        overflowY="auto"
        overflowX="visible"
        boxShadow="xl"
        flex="0 0 16rem"
        m={0}
        p={0}
        as="menu"
        backgroundColor="#2e3748"
        width="15rem"
      >
        <Box p={5} pt={5}>
          <FormControl>
            <Select
              className="select-main"
              placeholder="Select a category"
              size="sm"
              onChange={event => setSelectedCategory(event.target.value)}
              value={selectedCategory}
              color="black"
              bg="white"
            >
              {categoryOptions.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
            {/* <Select
              className="select-main"
              placeholder="Select an item"
              size="sm"
              onChange={handleSelectChange}
              value={selectedParent || ''}
              color="black"
              bg="white"
              // style={{
              //   menuList: {
              //     background: 'white', // Set background color of dropdown menu to white
              //   },
              // }}
            >
              {parentOptions}
            </Select> */}
          </FormControl>
          <Box pt={5}>
            {selectedCategory === 'Basic'
              ? Object.keys(menuItems).map((parent: string) => (
                  <div key={parent}>
                    <DragItem
                      label={parent}
                      type={parent}
                      id={parent}
                      rootParentType={
                        menuItems[parent]?.rootParentType || parent
                      }
                    >
                      {parent}
                    </DragItem>
                    <div style={{ marginLeft: '20px' }}>
                      {Object.keys(menuItems[parent]?.children || {}).map(
                        (child: string) => (
                          <DragItem
                            key={child}
                            label={child}
                            type={child}
                            id={child}
                            rootParentType={
                              menuItems[child]?.rootParentType || child
                            }
                          >
                            {child}
                          </DragItem>
                        ),
                      )}
                    </div>
                  </div>
                ))
              : selectedCategory === 'Pro-Components'
              ? Object.keys(proComponentItems).map((child: string) => (
                  <DragItem
                    key={child}
                    label={child}
                    type={child}
                    id={child}
                    rootParentType={
                      proComponentItems[child]?.rootParentType || child
                    }
                  >
                    {child}
                  </DragItem>
                ))
              : selectedCategory === 'Application'
              ? Object.keys(applicationItems).map((child: string) => (
                  <DragItem
                    key={child}
                    label={child}
                    type={child}
                    id={child}
                    rootParentType={
                      applicationItems[child]?.rootParentType || child
                    }
                  >
                    {child}
                  </DragItem>
                ))
              : selectedCategory === 'E-Commerce'
              ? Object.keys(ecommerceItems).map((child: string) => (
                  <DragItem
                    key={child}
                    label={child}
                    type={child}
                    id={child}
                    rootParentType={
                      ecommerceItems[child]?.rootParentType || child
                    }
                  >
                    {child}
                  </DragItem>
                ))
              : selectedCategory === 'Marketing'
              ? Object.keys(marketingItems).map((child: string) => (
                  <DragItem
                    key={child}
                    label={child}
                    type={child}
                    id={child}
                    rootParentType={
                      marketingItems[child]?.rootParentType || child
                    }
                  >
                    {child}
                  </DragItem>
                ))
              : null}
          </Box>

          {/* <Box pt={5}>
            {Object.keys(menuItems[selectedParent]?.children || {}).map(
              (child: string) => (
                <DragItem
                  key={child}
                  label={child}
                  type={child}
                  id={child}
                  rootParentType={menuItems[child]?.rootParentType || child}
                >
                  {child}
                </DragItem>
              ),
            )}
          </Box> */}
        </Box>
      </Box>
    </DarkMode>
  )
}
export default memo(Menu)
