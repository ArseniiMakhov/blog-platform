import { Button } from 'antd'
import { useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
// import { useSelector } from 'react-redux'

import classes from '../Styles/index.module.scss'

const schema = yup.object().shape({
  title: yup.string().required(),
  shortDescription: yup.string().required(),
  text: yup.string().required(),
  tags: yup.array().of(yup.string()).nullable().notRequired(),
})

export const CreateArticlePage = () => {
  // const dispatch = useDispatch()
  // const rootReducer = useSelector((state) => state.rootReducer)
  // const item = rootReducer.article
  // const token = rootReducer.user?.token

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      shortDescription: '',
      text: '',
      tags: [{ value: '' }],
    },
    resolver: yupResolver(schema),
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  })

  const submitForm = (data) => {
    console.log(data)
  }

  const deleteTag = (index) => {
    if (fields.length > 1) {
      remove(index)
    }
  }

  const showTagList = () => {
    return fields.map((field, index) => {
      if (index === fields.length - 1) {
        return (
          <li key={field.id}>
            <input
              className={`${classes['form-input']} ${classes['input-tag']}`}
              defaultValue={field.value}
              type="text"
              name={`tags.${index}.value`}
              {...register(`tags.${index}.value`)}
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
      return (
        <li key={field.id}>
          <input
            className={`${classes['form-input']} ${classes['input-tag']}`}
            defaultValue={field.value}
            type="text"
            name={`tags.${index}.value`}
            {...register(`tags.${index}.value`)}
            placeholder="Tag"
          />
          <Button danger className={classes['tag-btn']} onClick={() => deleteTag(index)}>
            Delete
          </Button>
        </li>
      )
    })
  }

  return (
    <form className={`${classes.form} ${classes['form-article']}`} onSubmit={handleSubmit(submitForm)}>
      <h2 className={classes['form-header']}>Create new article</h2>
      <label className={classes['form-label']}>
        Title
        <input className={classes['form-input']} type="text" name="title" placeholder="Title" {...register('title')} />
        <p className={classes['form-error']}>{errors.title && errors.title.message}</p>
      </label>
      <label className={classes['form-label']}>
        Short description
        <input
          className={classes['form-input']}
          type="text"
          name="shortDescription"
          placeholder="Title"
          {...register('shortDescription')}
        />
        <p className={classes['form-error']}>{errors.shortDescription && errors.shortDescription.message}</p>
      </label>
      <label className={classes['form-label']}>
        Text
        <textarea
          className={`${classes['form-input']} ${classes['input-large']}`}
          type="text"
          name="text"
          placeholder="Text"
          {...register('text')}
        />
        <p className={classes['form-error']}>{errors.text && errors.text.message}</p>
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
