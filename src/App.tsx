import { memo, useCallback, useState } from 'react'
import { useGetAllTodosQuery } from './apollo/client/queries/Todos.generated'
import { FilterType } from './types/types'
import TodoList from './components/TodoList/TodoList'
import CreateTodo from './components/CreateTodo/CreateTodo'
import TodoFilter from './components/TodoFilter/TodoFilter'
import TodoCount from './components/TodoCount/TodoCount'
import styles from './App.module.scss'
import './styles/GlobalStyles.module.scss'

function App() {
  const { data, loading, error, refetch } = useGetAllTodosQuery()
  const [filter, setFilter] = useState<FilterType>({ complited: true })

  const handleChangeFilter = useCallback(
    (filter: FilterType) => {
      setFilter(filter)
      refetch({ filter })
    },
    [refetch, filter]
  )

  const handleApplyFilter = useCallback(() => {
    refetch({ filter })
  }, [filter, refetch])

  if (loading) return <h2>Loading...</h2>
  if (error) return <h2>Error...</h2>

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>TodoList</h1>
      <CreateTodo handleApplyFilter={handleApplyFilter} />
      <div className={styles.controls}>
        <TodoCount />
        <TodoFilter onChangeFilter={handleChangeFilter} />
      </div>

      <TodoList todos={data?.todos} handleApplyFilter={handleApplyFilter} />
    </div>
  )
}

export default memo(App)
