import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useEffect } from 'react'

import { clearErrors, fetchLogin } from '../Store/rootSlice'
import classes from '../Styles/index.module.scss'

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

export const SignInPage = () => {
  const rootReducer = useSelector((state) => state.rootReducer)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const stateErrors = rootReducer.errors
  const { token } = rootReducer

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const submitForm = (data) => {
    dispatch(fetchLogin({ user: data }))
  }

  useEffect(() => {
    if (token) {
      navigate('/articles')
    }
  }, [token])

  useEffect(() => {
    dispatch(clearErrors())
  }, [])

  return (
    <form className={classes.form} onSubmit={handleSubmit(submitForm)}>
      <h2 className={classes['form-header']}>Sign In</h2>
      <label className={classes['form-label']}>
        Email address
        <input
          className={`${classes['form-input']} ${errors.email && classes['error']}`}
          type="email"
          name="email"
          placeholder="Email address"
          {...register('email')}
        />
      </label>
      <label className={classes['form-label']}>
        Password
        <input
          className={`${classes['form-input']} ${errors.password && classes['error']}`}
          type="password"
          name="password"
          placeholder="Password"
          {...register('password')}
        />
        <p className={classes['form-error']}>{stateErrors && 'Email or Password is invalid'}</p>
      </label>
      <Button htmlType="submit" className={classes['form-btn']} type="primary">
        Login
      </Button>
      <p className={classes['form-addition']}>
        Don’t have an account?{' '}
        <Link to="/sign-up" className={classes['addition-link']}>
          Sign Up
        </Link>
        .
      </p>
    </form>
  )
}
