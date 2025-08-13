
require('dotenv').config();
const { request, expect } = require('@playwright/test');
let AUTH_TOKEN = `Bearer ${process.env.AUTH_TOKEN}`;

/**
 * Builds default headers with the latest token.
 */
async function buildDefaultHeaders() {
  const token = await getAuthToken(); // Always get fresh token
  return {
    authorization: `${token}`,
    'content-type': 'application/json',
    'accept-language': 'en-US,en;q=0.9',
  };
}

/**
 * GET Request
 */
async function getData(request, endpoint, headers = {}) {

  const defaultHeaders = await buildDefaultHeaders();
   const response = await request.get(endpoint, {
    headers: { ...defaultHeaders, ...headers }
  });
  console.log(`GET ${endpoint} ➡ Status: ${response.status()}`);
  return response;
}

async function getData2(endpoint, headers = {}) {
  const reqContext = await request.newContext();
  const defaultHeaders = await buildDefaultHeaders();
  const response = await reqContext.get(`${process.env.baseUrl}${endpoint}`, {
     headers: { ...defaultHeaders, ...headers }
   });
  console.log(`GET ${endpoint} ➡ Status: ${response.status()}`);
  return response;
}

/**
 * POST Request
 */
async function postData(endpoint, body, headers = {}) {
  const reqContext = await request.newContext();
  const defaultHeaders = await buildDefaultHeaders();

  const response = await reqContext.post(endpoint, {
    data: body,
    headers: { ...defaultHeaders, ...headers }
  });

  console.log(`POST ${endpoint} ➡ Status: ${response.status()}`);

  return response;
}

/**
 * PUT Request
 */
async function updateData(request, endpoint, body, headers = {}) {

  const defaultHeaders = await buildDefaultHeaders();
  const response = await request.put(endpoint, {
    data: body,
    headers: { ...defaultHeaders, ...headers }
  });
  console.log(`PUT ${endpoint} ➡ Status: ${response.status()}`);
  return response;
}

/**
 * DELETE Request
 */
async function deleteData(request, endpoint, headers = {}) {

  const defaultHeaders = await buildDefaultHeaders();
  const response = await request.delete(endpoint, {
    headers: { ...defaultHeaders, ...headers }
  });
  console.log(`DELETE ${endpoint} ➡ Status: ${response.status()}`);
  return response;
}

module.exports = {
  getData,
  postData,
  updateData,
  deleteData,
  getData2
};

async function getAuthToken() {
  const reqContext = await request.newContext();

 const response = await reqContext.post('https://authtest.amplifyplatform.com/connect/token', {
     multipart: {
       grant_type: 'password',
       client_id: 'AmplifyApi',
       client_secret: '2EBE1E4D268FD918BBCE6527E405230F54DD1AA076F79AB0A4064D308A4AC047',
       username: process.env.API_USERNAME,
       password: process.env.API_PASSWORD
     },
     headers: {
       'Cookie': 'ARRAffinity=2b1b272b3a3c6bd3eb4e2db073f44ea75a5b89a412a706f9e954593c51a9bb15; ARRAffinitySameSite=2b1b272b3a3c6bd3eb4e2db073f44ea75a5b89a412a706f9e954593c51a9bb15'
     }
   });

   console.log(await response.text()); // Debug output
   expect(response.status()).toBe(200);

  expect(response.status()).toBe(200);

  const json = await response.json();
  AUTH_TOKEN = `Bearer ${json.access_token}`;

  await reqContext.dispose();
  return AUTH_TOKEN;
}

