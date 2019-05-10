import { delay } from 'roadhog-api-doc';
import loginErrorInfo from '../util/loginErrorInfo';


const jsonData = {
  'result': {
    'id': '417454619141211111',
    'role_name': '管理员1',
    'role_introduce': '管理员介绍1',
    'create_date': 1536739520111,
  },
  'error_info': null,
  'is_success': true,
};

const Api = {
  'GET /platform/role/object': (req, res) => {
    const { platform_token } = req.headers;
    if (platform_token && platform_token !== 'null') {
      res.send(JSON.stringify(jsonData));
    } else {
      const loginErrorInfoValue = loginErrorInfo();
      res.send(JSON.stringify(loginErrorInfoValue));
    }

  },
};
export default delay(Api, 500);


