import request from '@/utils/request';

export function listHousename() {
  return request({
    url: '/api/inclusive/inclusiveHousename/listHousename',
    method: 'post'
  });
}
