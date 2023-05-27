import http from './http/http'

export const user_login = (data) => http.POST('/api/auth/login', data)

export const getAllmajors = () => http.GET('/api/school/majors/findAll', null)
