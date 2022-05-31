export type UnPromise<T extends Promise<any>> = T extends Promise<infer U> ? U : never

export type Brand<K, T> = K & { __brand: T }

export type List<T> = [T[], number]

export interface Pagination {
	page?: number
	perPage?: number
}
