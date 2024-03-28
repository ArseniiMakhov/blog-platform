import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchArticles = createAsyncThunk('rootReducer/fetchArticles', async function (page = 1) {
  const offset = page * 5 - 5
  const response = await fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${offset}`)
  const data = await response.json()
  const { articles, articlesCount } = data
  return { articles, articlesCount, page }
})

export const fetchArticle = createAsyncThunk('rootReducer/fetchArticle', async function (slug) {
  const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`)
  const data = await response.json()
  const { article } = data
  return article
})

export const fetchSignUp = createAsyncThunk('rootReducer/fetchSignUp', async function (user) {
  const response = await fetch('https://blog.kata.academy/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
  const data = await response.json()
  return data
})

export const fetchLogin = createAsyncThunk('rootReducer/fetchLogin', async function (user) {
  const response = await fetch('https://blog.kata.academy/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
  const data = await response.json()
  return data
})

export const fetchProfile = createAsyncThunk('rootReducer/fetchProfile', async function (data) {
  const response = await fetch('https://blog.kata.academy/api/user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${data.token}`,
    },
    body: JSON.stringify({ user: data.data }),
  })
  const res = await response.json()
  return res
})

export const fetchCurrentUser = createAsyncThunk('rootReducer/fetchCurrentUser', async function (token) {
  const response = await fetch('https://blog.kata.academy/api/user', {
    headers: {
      Authorization: `Token ${token}`,
    },
  })
  const data = await response.json()
  return data
})

export const fetchNewArticle = createAsyncThunk('rootReducer/fetchNewArticle', async function (data) {
  const response = await fetch('https://blog.kata.academy/api/articles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${data.token}`,
    },
    body: JSON.stringify({ article: data.res }),
  })
  const res = await response.json()
  return res
})

const rootSlice = createSlice({
  name: 'rootReducer',
  initialState: {
    user: {
      username: null,
      email: null,
      token: null,
      image: null,
    },
    errors: null,
    loading: false,
    articles: [],
    article: {},
    articlesCount: null,
    pageNum: 1,
    redirected: false,
    editProfileStatus: false,
    editArticleStatus: false,
  },
  reducers: {
    onRedirected(state, action) {
      state.redirected = action.payload
    },
    clearErrors(state) {
      state.errors = null
      state.editProfileStatus = false
    },
    logOut(state) {
      state.user = null
      localStorage.clear()
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
        state.errors = action.error
      })
      .addCase(fetchArticle.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.article = action.payload
        state.loading = false
      })
      .addCase(fetchArticle.rejected, (state, action) => {
        state.errors = action.error
      })
      .addCase(fetchSignUp.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchSignUp.fulfilled, (state, action) => {
        state.errors = action.payload.errors
        state.user = action.payload.user
        state.loading = false
        localStorage.setItem('token', action.payload.user?.token)
      })
      .addCase(fetchSignUp.rejected, (state, action) => {
        state.errors = action.error
      })
      .addCase(fetchLogin.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.errors = action.payload.errors
        state.user = action.payload.user
        state.loading = false
        localStorage.setItem('token', action.payload.user?.token)
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.errors = action.error
      })
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true
        state.editProfileStatus = false
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.errors = action.payload.errors
        state.user = action.payload.user
        state.loading = false
        state.editProfileStatus = true
        localStorage.setItem('token', action.payload.user?.token)
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.errors = action.error
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.errors = action.payload.errors
        state.user = action.payload.user
        state.loading = false
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.errors = action.error
      })
      .addCase(fetchNewArticle.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchNewArticle.fulfilled, (state, action) => {
        console.log(action.payload)
        state.loading = false
      })
      .addCase(fetchNewArticle.rejected, (state, action) => {
        state.errors = action.error
      })
  },
})

export default rootSlice.reducer
export const { onRedirected, clearErrors, logOut } = rootSlice.actions
