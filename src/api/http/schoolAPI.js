import http from "@/api/http/http";

export const SchoolCollege = {
    findAll(){
        return http.GET('/api/school/college/findAll', null)
    },
    search(data){
        return http.POST('/api/school/college/search', data)
    },
    getOne(data){
        return http.GET('/api/school/college/getById?id='+ data)
    },
    deleteOne(id){
        return http.DELETE('/api/school/college/delete?id='+id)
    },
    updateOne(data){
        return http.POST('/api/school/college/updateCollege', data)
    },
    addOne(data){
        return http.POST('/api/school/college/addCollege', data)
    },
}

export const Course = {
    findAll() {
        return http.GET('/api/school/course/findAll', null)
    },
    search(data) {
        return http.POST('/api/school/course/search', data)
    },
    getOne(data) {
        return http.GET('/api/school/course/getById?id=' + data)
    },
    deleteOne(id) {
        return http.POST('/api/school/course/logicDelete', id)
    },
    updateOne(data) {
        return http.POST('/api/school/course/updateCourse', data)
    },
    addOne(data) {
        return http.POST('/api/school/course/addCourse', data)
    },
}

export const Majors = {
    findAll(){
        return http.GET('/api/school/majors/findAll', null)
    },
    search(data){
        return http.POST('/api/school/majors/search', data)
    },
    getOne(data){
        return http.GET('/api/school/majors/getById?id='+ data)
    },
    deleteOne(id){
        return http.POST('/api/school/majors/logicDelete',id)
    },
    updateOne(data){
        return http.POST('/api/school/majors/updateMajor', data)
    },
    addOne(data){
        return http.POST('/api/school/majors/addMajor', data)
    },
}