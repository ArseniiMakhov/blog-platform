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
    </form>
  )
}
