// Types for Errors
type ErrorName =
  | 'MODEL_NOT_FOUND_ERROR'
  | 'NOT_FOUND_ERROR'
  | 'CONNECTION_ERROR'
  | 'METHOD_NOT_IMPLEMENTED'
  | 'FILTER_BY_ERROR'
  | 'REFERENCE_ERROR'
  | 'INVALID_DATA_ERROR'

type ErrorCode =
  | 'ERR_MNF'
  | 'ERR_NF'
  | 'ERR_REMOTE'
  | 'NOT_IMPL'
  | 'ERR_VALID'
  | 'ERR_FTB'
  | 'ERR_REF'
  | 'ERR_ID'

type ValidationError = {
  error: {
    message: string
    code: ErrorCode
    errors: Array<{ message: string }>
  }
}

// Paged
interface PagedStationsParams {
  id: string
  limit?: number
  page?: number
}

interface PaginationResult<T> {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}
