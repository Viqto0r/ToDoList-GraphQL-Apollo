import { FC, memo, useState } from 'react'
import { TodoItemFragmentDoc } from '../../apollo/client/fragments/Todos.generated'
import { useCreateTodoMutation } from '../../apollo/client/mutations/Todos.generated'
import styles from './CreateTodo.module.scss'

interface ICreateTodoProps {
  handleApplyFilter: () => void
}

const CreateTodo: FC<ICreateTodoProps> = ({ handleApplyFilter }) => {
  const [text, setText] = useState<string>('')
  const [createTodo] = useCreateTodoMutation({
    update(cache, { data }) {
      cache.modify({
        fields: {
          allTodos(existingTodos = []) {
            const newTodo = cache.writeFragment({
              data: data?.createTodo,
              fragment: TodoItemFragmentDoc,
            })

            return [newTodo, ...existingTodos]
          },
        },
      })
    },
    onCompleted() {
      handleApplyFilter()
    },
    //---------------Alternative cache update method------------------
    //update(cache, { data }) {
    //  const cachedTodos = cache.readQuery<GetAllTodosQuery>({
    //    query: GetAllTodosDocument,
    //  })

    //  cache.writeQuery({
    //    query: GetAllTodosDocument,
    //    data: { todos: [data?.createTodo, ...(cachedTodos?.todos || [])] },
    //  })
    //},
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const onCreateTodo = () => {
    if (!text) return
    createTodo({ variables: { title: text, complited: false } })
    setText('')
  }

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type='text'
        value={text}
        onChange={handleChange}
      />
      <button className={styles.button} onClick={onCreateTodo}>
        Добавить
      </button>
    </div>
  )
}

export default memo(CreateTodo)
