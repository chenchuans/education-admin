/**
 * ajax based axios
 * @author wangheng
 * @since  2020/11/27
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios';
import { getUid, getToken } from '@/utils/session';
import { Message } from 'element-ui';

class Ajax {
    public request(options: AxiosRequestConfig): AxiosPromise {
        const instance: AxiosInstance = axios.create();
        options = this.mergeConfig(options);
        this.interceptors(instance, options.url);
        return instance(options);
    }

    private interceptors(instance: AxiosInstance, url?: string) {
        // 请求拦截
        instance.interceptors.request.use((config: AxiosRequestConfig) => {
            if (!(url as string).includes('user/adminLogin')) {
                config.headers['Token'] = getToken();
                config.headers['Id'] = getUid();
            }
            return config;
        }, error => Promise.reject(error));

        // 响应拦截
        instance.interceptors.response.use((res: AxiosResponse<any>) => {
            const { code, message } = res.data;

            if (code !== 200) {
                // 提示 message 错误信息
                Message({
                    message,
                    type: 'warning'
                });
            }
            return res.data;
        }, (error: string) => {
            // 提示网络错误
            Message.error(error);
            Promise.reject(error)
        });
    }

    private mergeConfig(options: AxiosRequestConfig): AxiosRequestConfig {
        return Object.assign({}, options);
    }
}

export default new Ajax();
