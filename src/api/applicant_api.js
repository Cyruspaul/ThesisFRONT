import http from './http/http'

export const applicant_login = (data) => http.POST('/api/user/applicant/login', data)

export const applicant_register = (data) => http.POST('/api/user/applicant/register_new', data)

export const applicant_infos = (data) => http.POST('/api/user/applicant/getInfo/'+data)

export const applicant_saveChanges = (data) => http.POST('/api/user/applicant/saveChange', data)

export const applicant_getMAjors= (data) => http.POST('/api/auth/register', data)
