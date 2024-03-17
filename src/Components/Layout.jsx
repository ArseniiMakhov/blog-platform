import { Link, Outlet } from 'react-router-dom'

import classes from '../Styles/index.module.scss'

export const Layout = () => {
  return (
    <>
      <header className={classes['app-header']}>
        <div className={classes['header-container']}>
          <Link className={classes['header-title']} to="/">
            Realworld Blog
          </Link>
          <div className={classes['header-navbar']}>
            <Link className={classes['navbar-link']} to="/SignIn">
              Sign In
            </Link>
            <Link className={`${classes['navbar-link']} ${classes['sign-up']}`} to="/SignUp">
              Sign Up
            </Link>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  )
}
