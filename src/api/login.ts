import ajax from '@/utils/ajax';
import { ResponseType } from '@/utils/type-list';
import { AxiosPromise } from 'axios';
const { VUE_APP_PARTNER_HOST } = process.env;

export const login = (data: any): AxiosPromise<ResponseType> => {
    return ajax.request({
        url: VUE_APP_PARTNER_HOST + '/user/adminLogin',
        data,
        method: 'post'
    })
}

// export const getUserInfo = (token: string): AxiosPromise<ResponseType> => {
//   return ajax.request({
//     url: VUE_APP_PARTNER_HOST + '/getUserInfo',
//     params: {
//       token
//     },
//     method: 'get'
//   })
// }
