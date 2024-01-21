import * as Types from '../../../types';

import { gql } from '@apollo/client';
import { TodoItemFragmentDoc } from '../fragments/Todos.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllTodosQueryVariables = Types.Exact<{
  filter?: Types.InputMaybe<Types.TodoFilter>;
}>;


export type GetAllTodosQuery = { __typename?: 'Query', todos?: Array<{ __typename?: 'Todo', id: string, title: string, complited: boolean } | null> | null };


export const GetAllTodosDocument = gql`
    query getAllTodos($filter: TodoFilter) {
  todos: allTodos(filter: $filter, sortField: "id", sortOrder: "desc") {
    ...TodoItem
  }
}
    ${TodoItemFragmentDoc}`;

/**
 * __useGetAllTodosQuery__
 *
 * To run a query within a React component, call `useGetAllTodosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTodosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTodosQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetAllTodosQuery(baseOptions?: Apollo.QueryHookOptions<GetAllTodosQuery, GetAllTodosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllTodosQuery, GetAllTodosQueryVariables>(GetAllTodosDocument, options);
      }
export function useGetAllTodosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllTodosQuery, GetAllTodosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllTodosQuery, GetAllTodosQueryVariables>(GetAllTodosDocument, options);
        }
export function useGetAllTodosSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllTodosQuery, GetAllTodosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllTodosQuery, GetAllTodosQueryVariables>(GetAllTodosDocument, options);
        }
export type GetAllTodosQueryHookResult = ReturnType<typeof useGetAllTodosQuery>;
export type GetAllTodosLazyQueryHookResult = ReturnType<typeof useGetAllTodosLazyQuery>;
export type GetAllTodosSuspenseQueryHookResult = ReturnType<typeof useGetAllTodosSuspenseQuery>;
export type GetAllTodosQueryResult = Apollo.QueryResult<GetAllTodosQuery, GetAllTodosQueryVariables>;