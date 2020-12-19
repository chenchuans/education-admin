import ajax from '@/utils/ajax';
import { ResponseType } from '@/utils/type-list.ts';
import { AxiosPromise } from 'axios';
const { VUE_APP_PARTNER_HOST } = process.env;

// 学期添加
export const saveSemester = (data: any): AxiosPromise<ResponseType> => {
    return ajax.request({
        url: VUE_APP_PARTNER_HOST + '/manage/semester/add',
        data,
        method: 'post'
    })
}

// 学期下拉列表
export const getCourseSelect = (data: any): AxiosPromise<ResponseType> => {
    return ajax.request({
        url: VUE_APP_PARTNER_HOST + '/manage/semester/course/list',
        data,
        method: 'get'
    })
}

// 删除学期
export const delSemester = (data: any): AxiosPromise<ResponseType> => {
    return ajax.request({
        url: VUE_APP_PARTNER_HOST + '/manage/semester/del',
        data,
        method: 'post'
    })
}

// 学期列表
export const getSemesterList = (data: any): AxiosPromise<ResponseType> => {
    return ajax.request({
        url: VUE_APP_PARTNER_HOST + '/manage/semester/list',
        data,
        method: 'post'
    })
}

// 学期老师下拉列表
export const getTeacherSelect = (data: any): AxiosPromise<ResponseType> => {
    return ajax.request({
        url: VUE_APP_PARTNER_HOST + '/manage/semester/teacher/list',
        data,
        method: 'get'
    })
}

// 添加老师
export const saveTeacher = (data: any): AxiosPromise<ResponseType> => {
    return ajax.request({
        url: VUE_APP_PARTNER_HOST + '/manage/user/add',
        data,
        method: 'post'
    })
}

// 删除老师
export const delTeacher = (data: any): AxiosPromise<ResponseType> => {
    return ajax.request({
        url: VUE_APP_PARTNER_HOST + '/manage/user/del',
        data,
        method: 'post'
    })
}

// 获取老师
export const getTeacher = (data: any): AxiosPromise<ResponseType> => {
    return ajax.request({
        url: VUE_APP_PARTNER_HOST + '/manage/user/list',
        data,
        method: 'post'
    })
}
