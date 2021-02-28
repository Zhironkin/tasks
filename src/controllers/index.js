const axios = require('axios');

export class Controller {
  static get(url, page, sort_field = 'name', sort_direction = 'asc') {
    return axios(url, {
      params: {
         page: page,
         sort_field: sort_field,
         sort_direction: sort_direction
      }
    })
  }

  static post(url, data) {
    return axios(url, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      method: 'post',
      data: data
    })
  }
}
