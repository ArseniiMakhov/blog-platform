import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchArticles = createAsyncThunk('rootReducer/fetchArticles', async function (page = 1) {
  const offset = page * 5 - 5
  const response = await fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${offset}`)
  if (!response.ok) {
    throw new Error({ name: 'Loading Error', message: 'Articles loading error' })
  }
  const data = await response.json()
  const { articles, articlesCount } = data
  return { articles, articlesCount, page }
})

export const fetchArticle = createAsyncThunk('rootReducer/fetchArticle', async function (slug) {
  const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`)
  if (!response.ok) {
    throw new Error({ name: 'Loading Error', message: 'Article loading error' })
  }
  const data = await response.json()
  const { article } = data
  return article
})

const rootSlice = createSlice({
  name: 'rootReducer',
  initialState: {
    error: null,
    loading: false,
    articles: [],
    article: {},
    articlesCount: null,
    pageNum: 1,
    redirected: false,
  },
  reducers: {
    onRedirected(state, action) {
      state.redirected = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.articles = action.payload.articles
        state.articlesCount = action.payload.articlesCount
        state.pageNum = action.payload.page
        state.loading = false
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.error = action.payload
      })
      .addCase(fetchArticle.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.article = action.payload
        state.loading = false
      })
      .addCase(fetchArticle.rejected, (state, action) => {
        state.error = action.payload
      })
  },
})

export default rootSlice.reducer
export const { onRedirected } = rootSlice.actions
