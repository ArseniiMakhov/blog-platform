import { Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useEffect } from 'react'

import { clearErrors, fetchProfile } from '../Store/rootSlice'
import classes from '../Styles/index.module.scss'

const schema = yup.object().shape(
  {
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup
      .string()
      .nullable()
      .notRequired()
      .when('password', {
        is: (value) => value?.length,
        then: (rule) => rule.min(6).max(40),
      }),
    image: yup
      .string()
      .nullable()
      .notRequired()
      .when('image', {
        is: (value) => value?.length,
        then: (rule) => rule.matches(/\.(jpg|jpeg|png|gif|bmp)$/, 'invalid image URL'),
      }),
  },
  [
    ['password', 'password'],
    ['image', 'image'],
  ]
)

export const ProfilePage = () => {
  const dispatch = useDispatch()
  const rootReducer = useSelector((state) => state.rootReducer)
  const stateErrors = rootReducer.errors
  const { username, email, image, token } = rootReducer.user
  const { editProfileStatus } = rootReducer

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const submitForm = (data) => {
    if (!data.password) {
      data = { ...data, password: undefined }
    }
    if (!data.image) {
      data = { ...data, image: undefined }
    }
    dispatch(fetchProfile({ data, token }))
  }

  useEffect(() => {
    dispatch(clearErrors())
  }, [])

  return (
    <form className={classes.form} onSubmit={handleSubmit(submitForm)}>
      <h2 className={classes['form-header']}>Edit Profile</h2>
      {editProfileStatus && <p className={classes['form-success']}>Success!</p>}
      <label className={classes['form-label']}>
        Username
        <input
          className={`${classes['form-input']} ${(errors?.username || stateErrors?.username) && classes['error']}`}
          type="text"
          name="username"
          defaultValue={username}
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
          defaultValue={email}
          {...register('email')}
        />
        <p className={classes['form-error']}>{errors?.email && errors.email.message}</p>
        <p className={classes['form-error']}>{stateErrors?.email && stateErrors.email}</p>
      </label>
      <label className={classes['form-label']}>
        New password
        <input
          className={`${classes['form-input']} ${errors?.password && classes['error']}`}
          type="password"
          name="password"
          placeholder="New password"
          {...register('password')}
        />
        <p className={classes['form-error']}>{errors?.password && errors.password.message}</p>
      </label>
      <label className={classes['form-label']}>
        Avatar image (url)
        <input
          className={`${classes['form-input']} ${errors?.image && classes['error']}`}
          type="text"
          name="image"
          defaultValue={image}
          placeholder="Avatar image"
          {...register('image')}
        />
        <p className={classes['form-error']}>{errors?.image && errors.image.message}</p>
      </label>
      <Button htmlType="submit" className={classes['form-btn']} type="primary">
        Save
      </Button>
    </form>
  )
}
