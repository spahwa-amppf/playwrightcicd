require('dotenv').config();
const AUTH_TOKEN = `Bearer ${process.env.AUTH_TOKEN}`;

const defaultHeaders = {
  authorization: AUTH_TOKEN,
  'content-type': 'application/json',
  'accept-language': 'en-US,en;q=0.9',
};

/**
 * GET Request
 */
async function getData(request, endpoint, headers = {}) {
  const response = await request.get(endpoint, {
    headers: { ...defaultHeaders, ...headers }
  });

  return response;
}

/**
 * POST Request
 */
async function postData(request, endpoint, body, headers = {}) {
  const response = await request.post(endpoint, {
    data: body,
    headers: { ...defaultHeaders, ...headers }
  });

  return response;
}

/**
 * PUT Request
 */
async function updateData(request, endpoint, body, headers = {}) {
  const response = await request.put(endpoint, {
    data: body,
    headers: { ...defaultHeaders, ...headers }
  });

  return response;
}

/**
 * DELETE Request
 */
async function deleteData(request, endpoint, headers = {}) {
  const response = await request.delete(endpoint, {
    headers: { ...defaultHeaders, ...headers }
  });

  return response;
}

module.exports = {
  getData,
  postData,
  updateData,
  deleteData
};
