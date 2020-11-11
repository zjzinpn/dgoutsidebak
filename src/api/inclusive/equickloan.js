import request from '@/utils/request';

export function saveEquickloan(form) {
  return request({
    url: '/api/inclusive/inclusiveEquickloan/saveEquickloan',
    method: 'post',
    data: form
  });
}

export function deleteEquickloan(form) {
  return request({
    url: '/api/inclusive/inclusiveEquickloan/deleteEquickloan',
    method: 'post',
    data: form
  });
}
