import { Button } from 'antd'
import { Link } from 'react-router-dom'

import classes from '../Styles/index.module.scss'

export const SignInPage = () => {
  return (
    <form className={classes.form}>
      <h2 className={classes['form-header']}>Sign In</h2>
      <label className={classes['form-label']}>
        Email address
        <input className={classes['form-input']} type="email" name="email" placeholder="Email address" />
      </label>
      <label className={classes['form-label']}>
        Password
        <input className={classes['form-input']} type="password" name="password" placeholder="Password" />
      </label>
      <Button className={classes['form-btn']} type="primary">
        Login
      </Button>
      <p className={classes['form-addition']}>
        Don’t have an account?{' '}
        <Link to="/sign-in" className={classes['addition-link']}>
          Sign Up
        </Link>
        .
      </p>
    </form>
  )
}
