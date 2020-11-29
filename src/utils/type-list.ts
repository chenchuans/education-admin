// 分页器类型定义
export interface PageType {
    page: number
    size: number
    total: number
}


// 返回数据类型定义
export interface ResponseType {
    code: number
    flag: boolean
    message?: string | undefined
    data?: any
}
