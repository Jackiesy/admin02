import { delay } from 'roadhog-api-doc';
import loginErrorInfo from './util/loginErrorInfo';

const jsonData = {
  'result': [
    {
      'name': '订单管理',
      /*'path': '/order/order',*/
      'path': '/',
      'icon': 'home',
      'children': null,
    },
    /*{
      'name': '财务管理',
      'path': null,
      'icon': 'star',
      'children': [
        {
          'name': '转账管理',
          'path': '/financial',
          'icon': null,
          'children': null,
        },
      ],
    },
    {
      'name': '支付管理',
      'path': null,
      'icon': 'line-chart',
      'children': [
        {
          'name': '支付日志',
          'path': '/pay',
          'icon': null,
          'children': null,
        },
      ],
    },
    {
      'name': '权限管理',
      'path': '/right',
      'icon': 'setting',
      'children': null,
    },*/
  ],
  'error_info': null,
  'is_success': true,
};

const Api = {
  'POST /platform/menu/list': (req, res) => {
    /*const { platform_token } = req.headers;*/
    res.send(JSON.stringify(jsonData));
  /*  if (platform_token && platform_token !== 'null') {
      res.send(JSON.stringify(jsonData));
    } else {
      const loginErrorInfoValue = loginErrorInfo();
      res.send(JSON.stringify(loginErrorInfoValue));
    }*/

  },
};

export default delay(Api, 200);
