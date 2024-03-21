import React from 'react'
import { Checkbox } from 'antd'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import classes from '../Styles/index.module.scss'

const schema = yup.object().shape({
  username: yup.string().min(3).max(20).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).max(40).required(),
  passwordRepeat: yup.string().oneOf([yup.ref('password'), null]),
})

export const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const submitForm = (data) => {
    console.log(data)
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit(submitForm)}>
      <h2 className={classes['form-header']}>Create new account</h2>
      <label className={classes['form-label']}>
        Username
        <input
          className={`${classes['form-input']} ${errors.username && classes['error']}`}
          type="text"
          name="username"
          placeholder="Username"
          {...register('username')}
        />
        <p className={classes['form-error']}>{errors.username && errors.username.message}</p>
      </label>
      <label className={classes['form-label']}>
        Email address
        <input
          className={`${classes['form-input']} ${errors.username && classes['error']}`}
          type="email"
          name="email"
          placeholder="Email address"
          {...register('email')}
        />
        <p className={classes['form-error']}>{errors.email && errors.email.message}</p>
      </label>
      <label className={classes['form-label']}>
        Password
        <input
          className={`${classes['form-input']} ${errors.username && classes['error']}`}
          type="password"
          name="password"
          placeholder="Password"
          {...register('password')}
        />
        <p className={classes['form-error']}>{errors.password && errors.password.message}</p>
      </label>
      <label className={classes['form-label']}>
        Repeat Password
        <input
          className={`${classes['form-input']} ${errors.username && classes['error']}`}
          type="password"
          name="passwordRepeat"
          placeholder="Password"
          {...register('passwordRepeat')}
        />
        <p className={classes['form-error']}>{errors.passwordRepeat && 'Passwords should match'}</p>
      </label>
      <Checkbox className={classes['form-checkbox']}>I agree to the processing of my personal information</Checkbox>
      <button className={classes['form-btn']} type="submit">
        Create
      </button>
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
