import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { config } from '@/config';

export interface ApiOptionsStruct {
  action: string,
  params?: Record<string, any>,
  data?: Record<string, any>,
  method:
  | 'get' | 'GET'
  | 'post' | 'POST'
}

export class BaseModel {
  private axiosInstance: AxiosInstance;

  constructor(private baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl || config.baseApi,
      timeout: config.timeout,
      headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    });
    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      return config;
    }, (err: any) => {
      console.error('Axios请求配置异常:', err);
    });

    this.axiosInstance.interceptors.response.use((response: AxiosResponse) => {
      const {
        status,
        data: responseData,
        config,
      } = response;
      if (status === 200) {
        const {
          code,
          data,
          message,
          success,
        } = responseData;
        if (code === 0) {
          return responseData;
        } else {
          console.warn('接口业务异常:', responseData);
          return responseData;
        }
      } else {
        console.error('Axios请求异常:', response);
      }
      return response;
    }, (err: any) => {
      console.error('Axios响应异常:', err);
    });
  }

  public send<T>(options: ApiOptionsStruct): Promise<T> {
    if (options.method.toLowerCase() === 'get') {
      return this.axiosInstance.get(options.action, {
        params: options.params,
      });
    } else {
      return this.axiosInstance.post<any, T>(options.action, options.data);
    }
  }
}
