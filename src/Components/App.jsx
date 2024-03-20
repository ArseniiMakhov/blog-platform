import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ListPage } from '../Pages/ListPage'
import { fetchArticles, onRedirected } from '../Store/rootSlice'
import { ArticlePage } from '../Pages/ArticlePage'
import { SignInPage } from '../Pages/SignInPage'
import { SignUpPage } from '../Pages/SignUpPage'

import { Layout } from './Layout'

const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const rootReducer = useSelector((state) => state.rootReducer)
  const redirected = rootReducer.redirected

  useEffect(() => {
    dispatch(fetchArticles())
  }, [])

  useEffect(() => {
    if (!redirected) {
      navigate('/articles')
      dispatch(onRedirected(true))
    }
  }, [navigate, redirected])

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/articles" element={<ListPage />} />
          <Route path="/articles/:slug" element={<ArticlePage />} />
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
