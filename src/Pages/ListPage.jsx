import { List, Spin } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import { fetchArticles } from '../Store/rootSlice'
import { ArticleCard } from '../Components/ArticleCard'
import classes from '../Styles/index.module.scss'

export const ListPage = () => {
  const dispatch = useDispatch()
  const rootReducer = useSelector((state) => state.rootReducer)
  const { loading, articles, articlesCount, pageNum } = rootReducer

  return (
    <List
      className={classes.list}
      loadingindicator={<Spin />}
      loading={loading}
      bordered={false}
      dataSource={articles}
      pagination={{
        position: 'bottom',
        align: 'center',
        pageSize: 5,
        total: articlesCount,
        showSizeChanger: false,
        showTitle: false,
        current: pageNum,
        onChange: (page) => dispatch(fetchArticles(page)),
      }}
      renderItem={(item) => (
        <List.Item className={classes['list-item']}>
          <ArticleCard item={item} />
        </List.Item>
      )}
    />
  )
}
