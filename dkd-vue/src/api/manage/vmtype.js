import request from '@/utils/request'

// 查询设备类型管理列表
export function listVmtype(query) {
  return request({
    url: '/manage/vmtype/list',
    method: 'get',
    params: query
  })
}

// 查询设备类型管理详细
export function getVmtype(id) {
  return request({
    url: '/manage/vmtype/' + id,
    method: 'get'
  })
}

// 新增设备类型管理
export function addVmtype(data) {
  return request({
    url: '/manage/vmtype',
    method: 'post',
    data: data
  })
}

// 修改设备类型管理
export function updateVmtype(data) {
  return request({
    url: '/manage/vmtype',
    method: 'put',
    data: data
  })
}

// 删除设备类型管理
export function delVmtype(id) {
  return request({
    url: '/manage/vmtype/' + id,
    method: 'delete'
  })
}
