import { List, Spin } from 'antd'
import { useSelector } from 'react-redux'

import { Article } from '../Components/Article'
import classes from '../Styles/index.module.scss'

export const ListPage = () => {
  const rootReducer = useSelector((state) => state.rootReducer)
  const { loading, articles } = rootReducer

  return (
    <List
      className={classes.list}
      loadingindicator={<Spin />}
      loading={loading}
      bordered={false}
      dataSource={articles}
      renderItem={(item) => (
        <List.Item className={classes['list-item']}>
          <Article item={item} />
        </List.Item>
      )}
    />
  )
}
