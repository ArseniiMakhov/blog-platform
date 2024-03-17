import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { ListPage } from '../Pages/ListPage'
import { fetchArticles } from '../Store/rootSlice'

import { Layout } from './Layout'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchArticles())
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ListPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
