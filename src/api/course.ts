import ajax from '@/utils/ajax';
import { ResponseType } from '@/utils/type-list';
import { AxiosPromise } from 'axios';
const { VUE_APP_PARTNER_HOST } = process.env;

export const catalogUpdate = (data: any): AxiosPromise<ResponseType> => {
    return ajax.request({
        url: VUE_APP_PARTNER_HOST + '/course/catalog/addOrUpdateCourseCatalog',
        data,
        method: 'post'
    })
}

export const catalogDel = (data: any): AxiosPromise<ResponseType> => {
    return ajax.request({
        url: VUE_APP_PARTNER_HOST + '/course/catalog/delOrUpdateCourseCatalog',
        data,
        method: 'post'
    })
}

export const catalogList = (data: any): AxiosPromise<ResponseType> => {
    return ajax.request({
        url: VUE_APP_PARTNER_HOST + 'course/catalog/listOrUpdateCourseCatalog',
        data,
        method: 'post'
    })
}

export const chapterUpdate = (data: any): AxiosPromise<ResponseType> => {
    return ajax.request({
        url: VUE_APP_PARTNER_HOST + '/course/chapter/addOrUpdateCourseChapter',
        data,
        method: 'post'
    })
}

export const chapterDel = (data: any): AxiosPromise<ResponseType> => {
    return ajax.request({
        url: VUE_APP_PARTNER_HOST + '/course/chapter/delOrUpdateCourseChapter',
        data,
        method: 'post'
    })
}

export const chapterList = (data: any): AxiosPromise<ResponseType> => {
    return ajax.request({
        url: VUE_APP_PARTNER_HOST + '/course/chapter/listOrUpdateCourseChapter',
        data,
        method: 'post'
    })
}

export const contentUpdate = (data: any): AxiosPromise<ResponseType> => {
    return ajax.request({
        url: VUE_APP_PARTNER_HOST + '/course/content/addOrUpdateCourseContent',
        data,
        method: 'post'
    })
}

export const contentDel = (data: any): AxiosPromise<ResponseType> => {
    return ajax.request({
        url: VUE_APP_PARTNER_HOST + '/course/content/delOrUpdateCourseContent',
        data,
        method: 'post'
    })
}

export const contentList = (data: any): AxiosPromise<ResponseType> => {
    return ajax.request({
        url: VUE_APP_PARTNER_HOST + '/course/content/listOrUpdateCourseContent',
        data,
        method: 'post'
    })
}

export const courseUpdate = (data: any): AxiosPromise<ResponseType> => {
    return ajax.request({
        url: VUE_APP_PARTNER_HOST + '/course/course/addOrUpdateCourse',
        data,
        method: 'post'
    })
}

export const courseDel = (data: any): AxiosPromise<ResponseType> => {
    return ajax.request({
        url: VUE_APP_PARTNER_HOST + '/course/course/delCourse',
        data,
        method: 'post'
    })
}

export const courseList = (data: any): AxiosPromise<ResponseType> => {
    return ajax.request({
        url: VUE_APP_PARTNER_HOST + '/course/course/listCourse',
        data,
        method: 'post'
    })
}


