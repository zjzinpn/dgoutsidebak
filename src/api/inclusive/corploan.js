import request from '@/utils/request';

export function saveCorploan(form) {
  return request({
    url: '/api/inclusive/inclusiveCorploan/saveCorploan',
    method: 'post',
    data: form
  });
}


export function deleteCorploan(form) {
  return request({
    url: '/api/inclusive/inclusiveCorploan/deleteCorploan',
    method: 'post',
    data: form
  });
}

