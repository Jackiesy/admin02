import { delay } from 'roadhog-api-doc';
import loginErrorInfo from '../util/loginErrorInfo';


const jsonData = {
  'result': {
    'msg': '操作成功',
    'date': 1536768054052,
    'code': 200,
  },
  'error_info': null,
  'is_success': true,
};

const Api = {
  'POST /platform/role/add': (req, res) => {
    const { platform_token } = req.headers;

    if (platform_token && platform_token !== 'null') {
      res.send(JSON.stringify(jsonData));
    } else {
      const loginErrorInfoValue = loginErrorInfo();
      res.send(JSON.stringify(loginErrorInfoValue));
    }
  },


  'POST /platform/role/update': (req, res) => {
    const { platform_token } = req.headers;

    if (platform_token && platform_token !== 'null') {
      res.send(JSON.stringify(jsonData));
    } else {
      const loginErrorInfoValue = loginErrorInfo();
      res.send(JSON.stringify(loginErrorInfoValue));
    }
  },


  'POST /platform/role/delete': (req, res) => {
    const { platform_token } = req.headers;

    if (platform_token && platform_token !== 'null') {
      res.send(JSON.stringify(jsonData));
    } else {
      const loginErrorInfoValue = loginErrorInfo();
      res.send(JSON.stringify(loginErrorInfoValue));
    }
  },


  'POST /platform/role/batch-delete': (req, res) => {
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


