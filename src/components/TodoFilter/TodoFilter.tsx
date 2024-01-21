import { FC, useState } from 'react'
import { FilterType } from '../../types/types'
import styles from './TodoFilter.module.scss'

interface ITodoFilterProps {
  onChangeFilter: (filter: FilterType) => void
}
const TodoFilter: FC<ITodoFilterProps> = ({ onChangeFilter }) => {
  const [activeBtn, setActiveBtn] = useState('all')
  const handleSetFilter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target instanceof HTMLElement) {
      let filter: FilterType = { complited: true }

      switch (e.target.dataset.type) {
        case 'uncomplited':
          setActiveBtn('uncomplited')
          filter.complited = false
          break
        case 'all':
          setActiveBtn('all')
          filter = {}
          break
        case 'complited': {
          setActiveBtn('complited')
          break
        }
      }
      onChangeFilter(filter)
    }
  }

  return (
    <div className={styles.container} onClick={handleSetFilter}>
      <button
        className={activeBtn === 'all' ? styles.activeBtn : ''}
        disabled={activeBtn === 'all'}
        data-type='all'
      >
        Все
      </button>
      <button
        className={activeBtn === 'complited' ? styles.activeBtn : ''}
        disabled={activeBtn === 'complited'}
        data-type='complited'
      >
        Завершенные
      </button>
      <button
        className={activeBtn === 'uncomplited' ? styles.activeBtn : ''}
        disabled={activeBtn === 'uncomplited'}
        data-type='uncomplited'
      >
        Незавершенные
      </button>
    </div>
  )
}

export default TodoFilter
