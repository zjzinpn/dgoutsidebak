import request from '@/utils/request';

export function batchHousename(query) {
  return request({
    url: '/api/inclusive/batchHousename',
    method: 'post',
    data: query
  });
}

export function batchManager(query) {
  return request({
    url: '/api/inclusive/batchManager',
    method: 'post',
    data: query
  });
}
