import { get, post, put } from '../utils/HttpClient';
const Login = () => {
  let path = 'v1/admin/login';
  return get(path);
};
export default { Login };
