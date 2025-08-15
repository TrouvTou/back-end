import { Injectable } from '@nestjs/common';

export interface HttpResponse<T = any> {
  message: string;
  status: number;
  data?: T;
}

@Injectable()
export class HttpResponseApiService {
  async success({ message, status, data }: HttpResponse) {
    return { status: status, message: message, data: data };
  }
  async error({ message, status }: HttpResponse) {
    return { status: status, message: message };
  }
  async notFound({ message, status }: HttpResponse) {
    return { status: status, message: message };
  }
  async unauthorized({ message, status }: HttpResponse) {
    return { status: status, message: message };
  }
  async forbidden({ message, status }: HttpResponse) {
    return { status: status, message: message };
  }
  async badRequest({ message, status }: HttpResponse) {
    return { status: status, message: message };
  }
}
