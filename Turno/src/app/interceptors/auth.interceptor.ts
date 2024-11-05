import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn) => {
    const token = localStorage.getItem('token');

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Interceptor activo: Token agregado a la solicitud:', token);
    } else {
      console.log('Interceptor activo: No se encontró token');
    }

    return next(request);
  };
