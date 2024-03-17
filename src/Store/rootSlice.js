import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchArticles = createAsyncThunk('rootReducer/fetchArticles', async function () {
  const response = await fetch('https://blog.kata.academy/api/articles')
  if (!response.ok) {
    throw new Error({ name: 'Loading Error', message: 'Articles loading error' })
  }
  const data = await response.json()
  const { articles, articlesCount } = data
  return { articles, articlesCount }
})

const rootSlice = createSlice({
  name: 'rootReducer',
  initialState: {
    error: null,
    loading: false,
    articles: [],
    articlesCount: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.articles = action.payload.articles
        state.loading = false
        state.articlesCount = action.payload.articlesCount
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.error = action.payload
      })
  },
})

export default rootSlice.reducer
