import axios from 'axios'

export class ResponseBody {
    constructor (statusCode, message, data) {
      this.statusCode = statusCode
      this.message = message
      this.data = data
    }
  }

const headers = {
  'x-rapidapi-host': process.env.API_HOST,
  'x-rapidapi-key': process.env.API_KEY
}
const URL = process.env.REQ_URL

export async function searchMovieDB (request, response) {
    const { query: { title } } = await request
    const options = {
      params: {s: title, page: '1', r: 'json'},
      headers: headers
    }
    const { data } = await axios.get(URL, options)
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
    params: {i: id, r: 'json'},
    headers: headers
  }
  const { data } = await axios.get(URL, options)
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