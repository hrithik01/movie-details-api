import axios from 'axios'

export class ResponseBody {
    constructor (statusCode, message, data) {
      this.statusCode = statusCode
      this.message = message
      this.data = data
    }
  }

export async function searchMovieDB (request, response) {
    const { query: { title } } = await request
    const options = {
      method: 'GET',
      url: process.env.REQ_URL,
      params: {s: title, page: '1', r: 'json'},
      headers: {
        'x-rapidapi-host': process.env.API_HOST,
        'x-rapidapi-key': process.env.API_KEY
      }
    }
    const { data } = await axios(options)
    if (data.Error) {
      const errorBody = new ResponseBody(404, 'No data found', data)
      console.log(errorBody.message + ' for ' + title)
      response.status(404).json(errorBody)
    } else {
      const responseBody = new ResponseBody(200, 'OK Found', data)
      console.log(responseBody.message + ' for ' + title)
      response.status(200).json(responseBody)
    }
}

export async function searchTitleDB (request, response) {
  const { id } = await request.params
  const options = {
    method: 'GET',
    url: process.env.REQ_URL,
    params: {i: id, r: 'json'},
    headers: {
      'x-rapidapi-host': process.env.API_HOST,
      'x-rapidapi-key': process.env.API_KEY
    }
  }
  const { data } = await axios(options)
  if (data.Error) {
    const errorBody = new ResponseBody(404, 'No data found', data)
    console.log(errorBody.message + ' for ' + id)
    response.status(404).json(errorBody)
  } else {
    const responseBody = new ResponseBody(200, 'OK Found', data)
    console.log(responseBody.message + ' for ' + id)
    response.status(200).json(responseBody)
  }
}