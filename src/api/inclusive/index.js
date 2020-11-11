import request from '@/utils/request';

export function countInclusive(form) {
  return request({
    url: '/api/inclusive/countInclusive',
    method: 'post',
    data: form
  });
}

export function getEquickloanPage(form) {
  return request({
    url: '/api/inclusive/getEquickloanPage',
    method: 'post',
    data: form
  });
}

export function getEquickloanAll(form) {
  return request({
    url: '/api/inclusive/getEquickloanAll',
    method: 'post',
    data: form
  });
}

export function getCorploanPage(form) {
  return request({
    url: '/api/inclusive/getCorploanPage',
    method: 'post',
    data: form
  });
}

export function getCorploanAll(form) {
  return request({
    url: '/api/inclusive/getCorploanAll',
    method: 'post',
    data: form
  });
}
