const BASE_URL = 'http://13.127.222.180:4051/';
const ALLOW_ORIGIN = 'http://13.127.222.180:4051/';
const USER_TYPE = 'Admin';

function get(endpoint, params) {
  return requestData(endpoint, params);
}

function post(endpoint, params) {
  return requestData(endpoint, params, 'POST');
}

function put(endpoint, params) {
  return requestData(endpoint, params, 'PUT');
}

function deletemethod(endpoint, params) {
  return fetch(endpoint, params, 'DELETE');
}

async function requestData(url, data = {}, method = 'GET') {
  let xhr = new XMLHttpRequest();
  xhr.open(method, BASE_URL + url);
  if (checkingAuth()) xhr.setRequestHeader('authorization', checkingAuth());
  xhr.setRequestHeader('Content-Type', 'application/json');
  // xhr.setRequestHeader('Access-Control-Allow-Origin', ALLOW_ORIGIN);
  xhr.setRequestHeader('userType', USER_TYPE);

  return new Promise((resolve, reject) => {
    // console.log("string mal", JSON.stringify(data));
    if (method == 'GET') {
      xhr.send();
    } else {
      xhr.send(JSON.stringify(data));
    }
    xhr.onload = () => {
      // console.log('xhr.status', xhr.response);
      let response = JSON.parse(xhr.response);
      // console.log(response);

      if (xhr.status === 200 || xhr.status === 400 || xhr.status === 404) {
        resolve(response);
      } else {
        reject(response);
      }
    };
  });
}

async function fileUpload(url, file, callback = () => {}) {
  var xhr = new XMLHttpRequest();
  xhr.upload.onprogress = function (event) {
    // console.log(`Uploaded ${event.loaded} of ${event.total}`);
    let percent = (event.loaded * 100) / event.total;
    callback(percent);
  };

  xhr.onloadend = function () {
    if (xhr.status == 200) {
      console.log('Success');
    } else {
      console.log('error');
    }
  };

  xhr.open('post', BASE_URL + url);
  if (checkingAuth()) xhr.setRequestHeader('Authorization', checkingAuth());
  // xhr.setRequestHeader("Content-Type", "multipart/form-data");
  xhr.setRequestHeader('Access-Control-Allow-Origin', ALLOW_ORIGIN);
  xhr.setRequestHeader('userType', USER_TYPE);
  return new Promise((resolve, reject) => {
    xhr.send(file);
    xhr.onload = () => {
      let response = JSON.parse(xhr.response);
      console.log(response);
      resolve(response);
    };
  });
}

function checkingAuth() {
  let token = localStorage.getItem('token');

  // let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJBdmlzaGVrIiwibGFzdE5hbWUiOiJNYWl0eSIsImVtYWlsIjoiYXZpc2hla0BnbWFpbC5jb20iLCJtb2JpbGVObyI6Ijc5ODA5MjExMzIiLCJkb2IiOiIxNS4wMy4xOTk2IiwicGFzc3dvcmQiOiIxMjM0NTY3OCIsImNvdW50cnkiOiJpbmRpYSIsImlhdCI6MTY4Njk4NzY5NH0.yRHb6gGq6PSnL99jUdHOl7hHoXF5BPcBqe4DLfbu0HE"
  if (token) {
    return token;
  }
  return false;
}

export { requestData, fileUpload, get, post, put, deletemethod, BASE_URL };
