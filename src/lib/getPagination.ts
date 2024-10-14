export function getPagination(query_limit: number, query_page: number){
    const skip: number = Math.abs(query_page) * Math.abs(query_limit)

    return skip
}