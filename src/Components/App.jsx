import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { ListPage } from '../Pages/ListPage'
import { fetchArticles } from '../Store/rootSlice'
import { ArticlePage } from '../Pages/ArticlePage'

import { Layout } from './Layout'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchArticles())
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/articles" replace />} />
        <Route path="/articles" element={<Layout />}>
          <Route index path="/articles" element={<ListPage />} />
          <Route path="/articles/:slug" element={<ArticlePage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
