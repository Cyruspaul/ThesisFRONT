import http from "@/api/http/http";
import axios from "axios";

export const College = {
    findAll(){
        return http.GET('/api/admin/college/findAll', null)
    },
    search(data){
        return http.POST('/api/admin/college/search', data)
    },
    getOne(data){
        return http.GET('/api/admin/college/getById?id='+ data)
    },
    deleteOne(id){
        return http.DELETE('/api/admin/college/delete?id='+id)
    },
    updateOne(data){
        return http.POST('/api/admin/college/updateCollege', data)
    },
    addOne(data){
        return http.POST('/api/admin/college/addCollege', data)
    },
}

export const Course = {
    findAll() {
        return http.GET('/api/admin/course/findAll', null)
    },
    search(data) {
        return http.POST('/api/admin/course/search', data)
    },
    getOne(data) {
        return http.GET('/api/admin/course/getById?id=' + data)
    },
    deleteOne(id) {
        return http.POST('/api/admin/course/logicDelete', id)
    },
    updateOne(data) {
        return http.POST('/api/admin/course/updateCourse', data)
    },
    addOne(data) {
        return http.POST('/api/admin/course/addCourse', data)
    },
}

export const Majors = {
    findAll(){
        return http.GET('/api/admin/majors/findAll', null)
    },
    search(data){
        return http.POST('/api/admin/majors/search', data)
    },
    getOne(data){
        return http.GET('/api/admin/majors/getById?id='+ data)
    },
    deleteOne(id){
        return http.POST('/api/admin/majors/logicDelete',id)
    },
    updateOne(data){
        return http.POST('/api/admin/majors/updateMajor', data)
    },
    addOne(data){
        return http.POST('/api/admin/majors/addMajor', data)
    },
}

export const Curriculum = {
    findAll(){
        return http.GET('/api/admin/teachplan/findAll', null)
    },
    search(data){
        return http.POST('/api/admin/majors/search', data)
    },
    getOne(data){
        return http.POST('/api/admin/teachplan/getById', data)
    },
    deleteOne(id){
        return http.POST('/api/admin/teachplan/logicDelete',id)
    },
    updateOne(data){
        return http.POST('/api/admin/teachplan/updateCourse', data)
    },
    addOne(data){
        return http.POST('/api/admin/teachplan/createTeachPlan', data)
    },
}

export const Teacher = {
    findAll(){
        return http.GET('/api/admin/teacher/findAll', null)
    },
    search(data){
        return http.POST('/api/admin/teacher/search', data)
    },
    getOne(data){
        return http.POST('/api/admin/teacher/getById', data)
    },
    deleteOne(id){
        return http.POST('/api/admin/teacher/logicDelete',id)
    },
    updateOne(data){
        return http.POST('/api/admin/teacher/updateTeacher', data)
    },
    addOne(data){
        return http.POST('/api/admin/teacher/addTeacher', data)
    },
}

export const STUDENT = {
    findAll(){
        return http.GET('/api/admin/student/findAll', null)
    },
    search(data){
        return http.POST('/api/admin/student/search', data)
    },
    getOne(data){
        return http.POST('/api/admin/student/getById/'+data)
    },
    deleteOne(id){
        return http.POST('/api/admin/student/logicDelete',id)
    },
    updateOne(data){
        return http.POST('/api/admin/student/updateStudent', data)
    },
    addOne(data){
        return http.POST('/api/admin/student/add', data)
    },
}

export const ACCOUNT = {
    findAll(){
        return http.GET('/api/admin/account/findAll', null)
    },
    search(data){
        return http.POST('/api/admin/account/search', data)
    },
    getOne(data){
        return http.POST('/api/admin/account/getById', data)
    },
    deleteOne(id){
        return http.DELETE('/api/admin/account/logicDelete/'+id.id,id.id)
    },
    updateOne(data){
        return http.POST('/api/admin/account/update', data)
    },

}

export const TEACHER = {
    findAll(){
        return http.GET('/api/admin/teacher/findAll', null)
    },
    search(data){
        return http.POST('/api/admin/teacher/search', data)
    },
    getOne(data){
        return http.POST('/api/admin/teacher/getById', data)
    },
    deleteOne(id){
        return http.POST('/api/admin/teacher/logicDelete',id)
    },
    updateOne(data){
        return http.POST('/api/admin/teacher/updateCourse', data)
    },

}

export const PUBLICATIONS = {
    recent(){
        return http.GET('/api/admin/announcements/recent', null)
    },
    findAll(){
        return http.GET('/api/admin/announcements/list', null)
    },
    search(data){
        return http.POST('/api/admin/announcements/search', data)
    },
    getOne(data){
        return http.POST('/api/admin/announcements/details', data)
    },
    deleteOne(id){
        return http.POST('/api/admin/announcements/delete',id)
    },
    updateOne(data){
        return http.POST('/api/admin/announcements/update', data)
    },
    create(data){
        return http.POST('/api/admin/announcements/add', data)
    },

}

export const APPLICATION = {
    findAll(){
        return http.GET('/api/admin/application/findAll', null)
    },
    getOne(data){
        return http.POST('/api/admin/application/getOne/'+data)
    },
    accept(data){
        return http.POST('/api/admin/application/accept/'+data)
    },
    refuse(data){
        return http.POST('/api/admin/application/refuse/'+data)
    },
    deleteOne(id){
        return http.DELETE('/api/admin/application/logicDelete/'+id)
    },
}

export const COMMENTS = {

    findAll(data){
        return http.POST('/api/admin/announcements/comment/list', data)
    },

    deleteOne(id){
        return http.POST('/api/admin/announcements/comment/delete',id)
    },

    create(data){
        return http.POST('/api/admin/announcements/comment/add', data)
    },

}


export const CLASS = {
    findAll(){
        return http.GET('/api/admin/class/findAll', null)
    },
    find(){
        return http.GET('/api/admin/class/find', null)
    },
    getById(id){
        return http.GET('/api/admin/class/getById/'+id)
    },
    create(data){
        return http.POST('/api/admin/class/create',data)
    },
    search(data){
        return http.POST('/api/admin/class/search',data)
    },
    update(form) {
        return http.POST('/api/admin/class/update',form)
    }
}


export const SCORE = {
    getByClass(id){
        return http.GET('/api/admin/score/getByClass/'+id)
    },
    find(){
        return http.GET('/api/admin/score/find', null)
    },
    create(data){
        return http.POST('/api/admin/score/create',data)
    },
    search(data){
        return http.POST('/api/admin/score/search',data)
    },
    update(form) {
        return http.POST('/api/admin/score/update',form)
    }
}
export const DOCUMENT = {
    create(data){
        return http.POSTFILE('/api/oss/file/send', data)
    },
}
