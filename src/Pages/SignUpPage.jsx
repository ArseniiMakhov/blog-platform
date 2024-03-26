import React, { useEffect, useState } from 'react'
import { Checkbox, Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'

import { clearErrors, fetchSignUp } from '../Store/rootSlice'
import classes from '../Styles/index.module.scss'

const schema = yup.object().shape({
  username: yup.string().min(3).max(20).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).max(40).required(),
  passwordRepeat: yup.string().oneOf([yup.ref('password'), null]),
})

export const SignUpPage = () => {
  const rootReducer = useSelector((state) => state.rootReducer)
  const [check, setCheck] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const stateErrors = rootReducer.errors
  const token = rootReducer.user?.token

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const submitForm = (data) => {
    const { username, email, password } = data
    if (check) {
      dispatch(fetchSignUp({ user: { username, email, password } }))
    }
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
      <h2 className={classes['form-header']}>Create new account</h2>
      <label className={classes['form-label']}>
        Username
        <input
          className={`${classes['form-input']} ${(errors?.username || stateErrors?.username) && classes['error']}`}
          type="text"
          name="username"
          placeholder="Username"
          {...register('username')}
        />
        <p className={classes['form-error']}>{errors?.username && errors.username.message}</p>
        <p className={classes['form-error']}>{stateErrors?.username && stateErrors.username}</p>
      </label>
      <label className={classes['form-label']}>
        Email address
        <input
          className={`${classes['form-input']} ${(errors?.email || stateErrors?.email) && classes['error']}`}
          type="email"
          name="email"
          placeholder="Email address"
          {...register('email')}
        />
        <p className={classes['form-error']}>{errors?.email && errors.email.message}</p>
        <p className={classes['form-error']}>{stateErrors?.email && stateErrors.email}</p>
      </label>
      <label className={classes['form-label']}>
        Password
        <input
          className={`${classes['form-input']} ${(errors?.password || stateErrors?.password) && classes['error']}`}
          type="password"
          name="password"
          placeholder="Password"
          {...register('password')}
        />
        <p className={classes['form-error']}>{errors?.password && errors.password.message}</p>
        <p className={classes['form-error']}>{stateErrors?.password && stateErrors.password}</p>
      </label>
      <label className={classes['form-label']}>
        Repeat Password
        <input
          className={`${classes['form-input']} ${errors?.passwordRepeat && classes['error']}`}
          type="password"
          name="passwordRepeat"
          placeholder="Password"
          {...register('passwordRepeat')}
        />
        <p className={classes['form-error']}>{errors?.passwordRepeat && 'Passwords should match'}</p>
      </label>
      <Checkbox
        onChange={() => setCheck((prevCheck) => !prevCheck)}
        checked={check}
        className={classes['form-checkbox']}
      >
        I agree to the processing of my personal information
      </Checkbox>
      <Button htmlType="submit" className={classes['form-btn']} type="primary">
        Create
      </Button>
      <p className={classes['form-addition']}>
        Already have an account?{' '}
        <Link to="/sign-in" className={classes['addition-link']}>
          Sign In
        </Link>
        .
      </p>
    </form>
  )
}
