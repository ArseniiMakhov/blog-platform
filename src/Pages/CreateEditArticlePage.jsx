import { useForm, useFieldArray } from 'react-hook-form'
import { Button } from 'antd'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'

import { fetchNewArticle } from '../Store/rootSlice'
import classes from '../Styles/index.module.scss'

const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  body: yup.string().required(),
  tagList: yup.array().of(yup.object().nullable().notRequired()).nullable().required(),
})

export const CreateEditArticlePage = () => {
  const dispatch = useDispatch()
  const rootReducer = useSelector((state) => state.rootReducer)
  const token = rootReducer.user?.token
  const editArticleStatus = rootReducer.editArticleStatus
  const article = rootReducer.article

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: editArticleStatus ? article.title : '',
      description: editArticleStatus ? article.description : '',
      body: editArticleStatus ? article.body : '',
      tagList: editArticleStatus ? article.tagList : [{ value: '' }],
    },
    resolver: yupResolver(schema),
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  })

  const showTagList = () => {
    return fields.map((field, index) => {
      if (index === fields.length - 1) {
        return (
          <li key={field.id}>
            <input
              className={`${classes['form-input']} ${classes['input-tag']}`}
              defaultValue={field.value}
              type="text"
              name={`tagList.${index}.value`}
              {...register(`tagList.${index}.value`)}
              placeholder="Tag"
            />
            <Button danger className={classes['tag-btn']} onClick={() => deleteTag(index)}>
              Delete
            </Button>
            <Button className={`${classes['tag-btn']} ${classes['add-tag']}`} onClick={() => append('')}>
              Add tag
            </Button>
          </li>
        )
      }

      const deleteTag = (index) => {
        if (fields.length > 1) {
          remove(index)
        }
      }

      return (
        <li key={field.id}>
          <input
            className={`${classes['form-input']} ${classes['input-tag']}`}
            defaultValue={field.value}
            type="text"
            name={`tagList.${index}.value`}
            {...register(`tagList.${index}.value`)}
            placeholder="Tag"
          />
          <Button danger className={classes['tag-btn']} onClick={() => deleteTag(index)}>
            Delete
          </Button>
        </li>
      )
    })
  }

  const submitForm = (data) => {
    if (!editArticleStatus) {
      let res
      if (data.tagList.length === 1 && !data.tagList[0].value) {
        const { title, description, body } = data
        res = { title, description, body }
      } else {
        res = { ...data, tagList: data.tagList.map((el) => el.value) }
      }
      dispatch(fetchNewArticle({ res, token }))
    }
  }

  return (
    <form className={`${classes.form} ${classes['form-article']}`} onSubmit={handleSubmit(submitForm)}>
      <h2 className={classes['form-header']}>{editArticleStatus ? 'Edit article' : 'Create new article'}</h2>
      <label className={classes['form-label']}>
        Title
        <input className={classes['form-input']} type="text" name="title" placeholder="Title" {...register('title')} />
        <p className={classes['form-error']}>{errors.title && 'Fill out this field'}</p>
      </label>
      <label className={classes['form-label']}>
        Short description
        <input
          className={classes['form-input']}
          type="text"
          name="description"
          placeholder="Title"
          {...register('description')}
        />
        <p className={classes['form-error']}>{errors.description && 'Fill out this field'}</p>
      </label>
      <label className={classes['form-label']}>
        Text
        <textarea
          className={`${classes['form-input']} ${classes['input-large']}`}
          type="text"
          name="body"
          placeholder="Text"
          {...register('body')}
        />
        <p className={classes['form-error']}>{errors.body && 'Fill out this field'}</p>
      </label>
      <label className={`${classes['form-label']} ${classes['label-tag']}`}>
        Tags
        <ul className={classes['tags-box']}>{showTagList()}</ul>
      </label>
      <Button htmlType="submit" className={`${classes['form-btn']} ${classes['btn-send']}`} type="primary">
        Send
      </Button>
    </form>
  )
}
