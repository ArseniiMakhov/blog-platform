import { Link, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { logOut } from '../Store/rootSlice'
import classes from '../Styles/index.module.scss'

export const Layout = () => {
  const dispatch = useDispatch()
  const rootReducer = useSelector((state) => state.rootReducer)
  const token = rootReducer.user?.token
  const username = rootReducer.user?.username
  const image = rootReducer.user?.image

  return (
    <>
      <header className={classes['app-header']}>
        <div className={classes['header-container']}>
          <Link className={classes['header-title']} to="/articles">
            Realworld Blog
          </Link>
          {token ? (
            <div className={classes['header-navbar']}>
              <Link className={`${classes['navbar-link']} ${classes['new-article']}`} to="/new-article">
                Create article
              </Link>
              <Link className={`${classes['navbar-link']} ${classes['user-info']}`} to="/profile">
                <p className={classes['info-username']}>{username}</p>
                <img
                  className={classes['info-avatar']}
                  src={image ? image : 'https://static.productionready.io/images/smiley-cyrus.jpg'}
                />
              </Link>
              <Link
                className={`${classes['navbar-link']} ${classes['log-out']}`}
                to="/sign-in"
                onClick={() => dispatch(logOut())}
              >
                Log Out
              </Link>
            </div>
          ) : (
            <div className={classes['header-navbar']}>
              <Link className={classes['navbar-link']} to="/sign-in">
                Sign In
              </Link>
              <Link className={`${classes['navbar-link']} ${classes['sign-up']}`} to="/sign-up">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </header>
      <Outlet />
    </>
  )
}
