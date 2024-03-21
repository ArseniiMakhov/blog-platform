import { Checkbox, Button } from 'antd'
import { Link } from 'react-router-dom'

import classes from '../Styles/index.module.scss'

export const SignUpPage = () => {
  return (
    <form className={classes.form}>
      <h2 className={classes['form-header']}>Create new account</h2>
      <label className={classes['form-label']}>
        Username
        <input className={classes['form-input']} type="text" name="username" placeholder="Username" />
      </label>
      <label className={classes['form-label']}>
        Email address
        <input className={classes['form-input']} type="email" name="email" placeholder="Email address" />
      </label>
      <label className={classes['form-label']}>
        Password
        <input className={classes['form-input']} type="password" name="password" placeholder="Password" />
      </label>
      <label className={classes['form-label']}>
        Repeat Password
        <input className={classes['form-input']} type="password" name="passwordRepeat" placeholder="Password" />
      </label>
      <Checkbox className={classes['form-checkbox']}>I agree to the processing of my personal information</Checkbox>
      <Button className={classes['form-btn']} type="primary">
        Create
      </Button>
      <p className={classes['form-signin']}>
        Already have an account?{' '}
        <Link to="/sign-in" className={classes['signin-link']}>
          Sign In
        </Link>
        .
      </p>
    </form>
  )
}
