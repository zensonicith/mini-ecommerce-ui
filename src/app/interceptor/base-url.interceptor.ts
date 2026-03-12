import { HttpInterceptorFn } from '@angular/common/http';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = "http://localhost:5291/";

  if (!baseUrl) {
    return next(req);
  }

  if (req.url.startsWith('http') || req.url.startsWith('https')) {
    return next(req);
  }

  const apiReq = req.clone({ 
    url: `${baseUrl}${req.url}` 
  });

  return next(apiReq);
};
