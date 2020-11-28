import ajax, { ResponseData } from '@/utils/ajax';
import { AxiosPromise } from 'axios';
const { VUE_APP_PARTNER_HOST } = process.env;

export const uploadFile = (data: any): AxiosPromise<ResponseData> => {
    return ajax.request({
        url: VUE_APP_PARTNER_HOST + '/common/upload',
        data,
        method: 'post'
    })
}
