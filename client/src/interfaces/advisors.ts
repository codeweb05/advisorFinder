import { MouseEvent } from 'react'

export interface Data {
  id: number
  name: string
  language: string
  status: string
  reviews: number
}

export type Order = 'asc' | 'desc'

export interface AdvisorsTableProps {
  advisors: Data[]
  onFetchData: (searchValue: string, shouldShowOnline: boolean) => void
  order: Order
  setOrder: (order: Order) => void
  orderBy: keyof Data
  setOrderBy: (orderBy: keyof Data) => void
  shouldShowOnline: boolean
  setShouldShowOnline: (shouldShowOnline: boolean) => void
  searchValue: string
  setSearchValue: (searchValue: string) => void
  refetch: (variables?: Object) => Promise<any>
}

export interface EnhancedTableProps {
  onRequestSort: (event: MouseEvent<unknown>, property: keyof Data) => void
  order: Order
  orderBy: string
}

export interface HeadCell {
  id: keyof Data
  label: string
  numeric: boolean
}

export interface Filters {
  searchValue: string
  shouldShowOnline: boolean
}
