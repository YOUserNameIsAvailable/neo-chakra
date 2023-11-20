import React, { useState, useEffect } from 'react'
import { Flex, Box, useToast } from '@chakra-ui/react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Global } from '@emotion/react'
import Metadata from '~components/Metadata'
import useShortcuts from '~hooks/useShortcuts'
import Header from '~components/Header'
import Sidebar from '~components/sidebar/Sidebar'
import EditorErrorBoundary from '~components/errorBoundaries/EditorErrorBoundary'
import Editor from '~components/editor/Editor'
import { InspectorProvider } from '~contexts/inspector-context'
import Inspector from '~components/inspector/Inspector'
import useDispatch from '~hooks/useDispatch'
const App = () => {
  const [loading, setLoading] = useState(true)
  const [filteredItems, setFilteredItems] = useState<string[]>([])
  const [pagesArray, setPagesArray] = useState<string[]>([])
  const [getAllPages, setAllPages] = useState(false)
  const [singlePageData, setSinglePageData] = useState({})
  const [selectedItem, setSelectedItem] = useState({})
  const toast = useToast()
  const dispatch = useDispatch()

  useShortcuts()
  const fetchData = async () => {
    try {
      const response = await fetch('/api/page')
      const result = await response.json()
      setPagesArray(result)
      setFilteredItems(result)

      setLoading(false)
      if (!getAllPages) dispatch.components.reset()
      setAllPages(false)
    } catch (err) {
      setAllPages(false)
      setLoading(false)
      toast({
        title: 'Error',
        description: 'Something went wrong',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top',
      })
      console.error(err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [getAllPages])

  return (
    <>
      <div>
        {loading && (
          <div className="loader-overlay">
            <div className="loader"></div>
          </div>
        )}
      </div>
      <Global
        styles={() => ({
          html: { minWidth: '860px', backgroundColor: '#1A202C' },
        })}
      />
      <Metadata />
      <Header
        setAllPages={setAllPages}
        singlePageData={singlePageData}
        setSinglePageData={setSinglePageData}
        setSelectedItem={setSelectedItem}
      />
      <DndProvider backend={HTML5Backend}>
        <Flex h="calc(100vh - 3rem)">
          <Sidebar
            filteredItems={filteredItems}
            setPagesArray={setPagesArray}
            setSinglePageData={setSinglePageData}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
          <EditorErrorBoundary>
            <Box bg="white" flex={1} position="relative">
              <Editor />
            </Box>
          </EditorErrorBoundary>
          <Box
            maxH="calc(100vh - 3rem)"
            flex="0 0 15rem"
            bg="#f7fafc"
            overflowY="auto"
            overflowX="visible"
            borderLeft="1px solid #cad5de"
          >
            <InspectorProvider>
              <Inspector />
            </InspectorProvider>
          </Box>
        </Flex>
      </DndProvider>
    </>
  )
}
export default App
