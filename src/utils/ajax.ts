/**
 * ajax based axios
 * @author wangheng
 * @since  2020/11/27
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios';

export interface ResponseData {
  code: number
  data?: any
  message: string
  success: boolean
}

class Ajax {
  public request (options: AxiosRequestConfig): AxiosPromise { 
    const instance: AxiosInstance = axios.create();
    options = this.mergeConfig(options);
    this.interceptors(instance, options.url);
    return instance(options);
  }

  private interceptors (instance: AxiosInstance, url?: string) {
    // 请求拦截
    instance.interceptors.request.use((config: AxiosRequestConfig) => {
      config.headers['Token'] = '123456';
      config.headers['Platform'] = 'h5/1.2.3';
      return config;
    }, error => Promise.reject(error));

    // 响应拦截
    instance.interceptors.response.use((res: AxiosResponse<ResponseData>) => {
      const { code, success, message } = res.data.data;
      if (code !== 0 || !success) {
        // 提示 message 错误信息
      }
      return res;
    }, error => {
      // 提示网络错误
      Promise.reject(error)
    });
  }

  private mergeConfig (options: AxiosRequestConfig): AxiosRequestConfig {
    return Object.assign({}, options);
  }
}

export default new Ajax();