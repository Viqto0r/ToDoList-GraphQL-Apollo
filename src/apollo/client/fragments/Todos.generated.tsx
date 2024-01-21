import * as Types from '../../../types';

import { gql } from '@apollo/client';
export type TodoItemFragment = { __typename?: 'Todo', id: string, title: string, complited: boolean };

export const TodoItemFragmentDoc = gql`
    fragment TodoItem on Todo {
  id
  title
  complited
}
    `;