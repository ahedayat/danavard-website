import axios, { AxiosRequestConfig } from 'axios';

export interface FetchResponse<T> {
  count: number;
  next: string | null;
  results: T[];
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config?: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  };

  get = (id: number | string) => {
    return axiosInstance
      .get<T>(`${this.endpoint}/${id}`)
      .then((res) => res.data);
  };

  post = <TBody>(body: TBody, config?: AxiosRequestConfig) => {
    return axiosInstance
      .post<T>(this.endpoint, body, config)
      .then((res) => res.data);
  };

  patch = <TBody>(
    id: number | string,
    body: TBody,
    config?: AxiosRequestConfig,
  ) => {
    return axiosInstance
      .patch<T>(`${this.endpoint}/${id}`, body, config)
      .then((res) => res.data);
  };

  delete = (id: number | string, config?: AxiosRequestConfig) => {
    return axiosInstance
      .delete(`${this.endpoint}/${id}`, config)
      .then((res) => res.data);
  };
}

export default APIClient;
