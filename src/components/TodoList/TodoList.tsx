import { FC, memo, useCallback } from 'react'
import TodoItem from '../TodoItem/TodoItem'
import { GetAllTodosQuery } from '../../__generated__/graphql'
import {
  RemoveTodoMutationVariables,
  UpdateTodoMutationVariables,
  useRemoveTodoMutation,
  useUpdateTodoMutation,
} from '../../apollo/client/mutations/Todos.generated'

interface ITodoListProps {
  todos: GetAllTodosQuery['todos']
  handleApplyFilter: () => void
}

const TodoList: FC<ITodoListProps> = ({ todos, handleApplyFilter }) => {
  const [updateTodo] = useUpdateTodoMutation()
  const [removeTodo] = useRemoveTodoMutation({
    update(cache, { data }) {
      cache.modify({
        fields: {
          allTodos(existingTodos = []) {
            return existingTodos.filter(
              (todo: any) => todo.__ref !== `Todo:${data?.removeTodo?.id}`
            )
          },
        },
      })
    },
  })

  const handleUpdateTodo = useCallback(
    (variables: UpdateTodoMutationVariables) => {
      updateTodo({
        variables,
        onCompleted: () => {
          handleApplyFilter()
        },
      })
    },
    [updateTodo, handleApplyFilter]
  )

  const handleRemoveTodo = useCallback(
    (variables: RemoveTodoMutationVariables) => {
      removeTodo({ variables })
    },
    [removeTodo]
  )

  return (
    <ul>
      {todos?.map(
        (todo) =>
          todo && (
            <TodoItem
              key={todo.id}
              {...todo}
              onUpdateTodo={handleUpdateTodo}
              onRemoveTodo={handleRemoveTodo}
            />
          )
      )}
    </ul>
  )
}

export default memo(TodoList)
