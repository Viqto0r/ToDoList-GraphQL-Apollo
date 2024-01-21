import { FC } from 'react'
import { useGetAllTodosQuery } from '../../apollo/client/queries/Todos.generated'
import styles from './TodoCount.module.scss'

const TodoCount: FC = () => {
  const { data } = useGetAllTodosQuery()
  const output = data?.todos?.reduce(
    (acc, todo) => {
      todo?.complited ? acc.complited++ : acc.uncomplited++
      return acc
    },
    { complited: 0, uncomplited: 0, all: data?.todos.length }
  )

  return (
    <div className={styles.container}>
      <span>Завершено: {output?.complited}</span>
      <span>Не завершено: {output?.uncomplited}</span>
      <span>Всего: {output?.all}</span>
    </div>
  )
}

export default TodoCount
