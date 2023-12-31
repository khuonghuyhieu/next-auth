export const DEBUG = process.env.NODE_ENV === 'development'
export const TEST = process.env.NODE_ENV !== 'production'

export const STALE_TIME = 5000
export const ONE_MB_IN_BYTE = 1024 * 1024

export const DEFAULT_PAGE = 1
export const DEFAULT_PAGE_SIZE = 10
export const DEFAULT_CSV_PAGE_SIZE = 100
