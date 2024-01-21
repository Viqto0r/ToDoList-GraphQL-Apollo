import { FC, memo, useRef, useState } from 'react'
import {
  RemoveTodoMutationVariables,
  UpdateTodoMutationVariables,
} from '../../apollo/client/mutations/Todos.generated'
import { TodoItemFragment } from '../../apollo/client/fragments/Todos.generated'
import styles from './TodoItem.module.scss'

interface ITodoItem extends TodoItemFragment {
  onUpdateTodo: (variables: UpdateTodoMutationVariables) => void
  onRemoveTodo: (variables: RemoveTodoMutationVariables) => void
}

const TodoItem: FC<ITodoItem> = ({
  id,
  title,
  complited,
  onUpdateTodo,
  onRemoveTodo,
}) => {
  const [text, setText] = useState<string>(title)
  const [editMode, setEditMode] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleToggleTodo = () => {
    onUpdateTodo({ id, complited: !complited })
  }

  const handleEditTodoText = () => {
    onUpdateTodo({ id, title: text })
  }

  const handleEditModeTodo = () => {
    if (!text) {
      inputRef.current?.focus()
      return
    }

    setEditMode((edit) => !edit)
    if (editMode) {
      handleEditTodoText()
    }
  }

  const handleChangeTextTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const handleDeleteTodo = () => {
    onRemoveTodo({ id })
  }

  const editModeBtnText = editMode ? <>&#128190; </> : <>&#9997;</>
  const todoTextOutput = editMode ? (
    <input
      className={styles.input}
      type='text'
      value={text}
      onChange={handleChangeTextTodo}
      ref={inputRef}
      autoFocus
    />
  ) : (
    <span>{text}</span>
  )

  return (
    <li className={styles.container}>
      <label className={styles.label}>
        <input
          className={styles.checkbox}
          type='checkbox'
          checked={complited}
          onChange={handleToggleTodo}
        />
        {todoTextOutput}
      </label>
      <div className={styles.buttons}>
        <button onClick={handleEditModeTodo}>{editModeBtnText}</button>
        <button onClick={handleDeleteTodo}> &#10060;</button>
      </div>
    </li>
  )
}

export default memo(TodoItem)
