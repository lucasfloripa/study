import { GetRequestError } from '@/errors/get-request-error';
import { PatchRequestError } from '@/errors/patch-request-error';

export class ApiService {
  private static BASE_URL = import.meta.env.VITE_API_BASE_URL;

  static async get<T = any>(path: string) {
    const response = await fetch(`${ApiService.BASE_URL}${path || ''}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status >= 400 && response.status) {
      throw new GetRequestError('Get request failed', response.status);
    }

    const json = (await response.json()) as T;
    return json;
  }

  static async patch<T = any>(path: string, data: any) {
    const response = await fetch(`${ApiService.BASE_URL}${path}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'Application/json',
      },
    });

    if (response.status >= 400 && response.status) {
      throw new PatchRequestError('PATCH Request failed', response.status);
    }

    const json = (await response.json()) as T;
    return json;
  }
}
