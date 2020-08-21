import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vue-element-admin/advertiset/list',
    method: 'get',
    params: query
  })
}

export function fetchadvertiset(id) {
  return request({
    url: '/vue-element-admin/advertiset/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/advertiset/pv',
    method: 'get',
    params: { pv }
  })
}

export function createadvertiset(data) {
  return request({
    url: '/vue-element-admin/advertiset/create',
    method: 'post',
    data
  })
}

export function updateadvertiset(data) {
  return request({
    url: '/vue-element-admin/advertiset/update',
    method: 'post',
    data
  })
}
