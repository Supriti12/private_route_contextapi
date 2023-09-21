import { get, post, put } from '../utils/HttpClient';
const LoginApi = data => {
  let path = 'v1/admin/login';
  return post(path, data);
};
export default { LoginApi };
