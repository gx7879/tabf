import request from '@/utils/service'

export function activityData(id = '1a54d612-398e-422a-9187-5dd5c3896d69') {
  return request({
    method: 'get',
    url: `/api/activity/data/${id}`
  })
}

export function activity(id) {
  return request({
    method: 'get',
    url: `/api/activity/member/dashboard/${id}`
  })
}

export function submitAnswer(id, data) {
  return request({
    method: 'post',
    url: `/api/activity/task/answer/${id}`,
    data
  })
}

export function getHint(id) {
  return request({
    method: 'get',
    url: `/api/activity/task/hint/${id}`
  })
}
