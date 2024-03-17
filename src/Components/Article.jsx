import { Card } from 'antd'

import classes from '../Styles/index.module.scss'

const { Meta } = Card

export const Article = ({ item }) => {
  const tags = item.tagList ? (
    item.tagList.map((el) => {
      return (
        <span key={item.slug} className={classes['header-tag']}>
          {el}
        </span>
      )
    })
  ) : (
    <span className={classes['header-tag']}>---</span>
  )

  return (
    <Card className={classes.article} bordered={false}>
      <Meta
        title={
          <div className={classes['article-header']}>
            <div className={classes['header-left']}>
              <div className={classes['left-box']}>
                <h2 className={classes['header-title']}>{item.title}</h2>
                <p className={classes['header-likes']}>
                  <img src="../Styles/heart1.svg" />
                  {item.favoritesCount}
                </p>
              </div>
              {tags}
            </div>
            <div className={classes['header-right']}>
              <div className={classes['right-box']}>
                <p className={classes['header-username']}>{item.author.username}</p>
                <p className={classes['header-created']}>{item.createdAt}</p>
              </div>
              <img className={classes['header-img']} src={item.author.image} />
            </div>
          </div>
        }
        description={<div className={classes['article-description']}>{item.description}</div>}
      />
    </Card>
  )
}
