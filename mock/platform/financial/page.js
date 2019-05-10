import { delay } from 'roadhog-api-doc';
import loginErrorInfo from '../util/loginErrorInfo';

const jsonData = {
  'result': {
    'items': [
      {
        'order': 417454619141211111,
        'supplier': '雷霆应急',
        'account': '622812345',
        'method':'支付宝',
        'total': 1000,
        'order_status': '已结算',
        'timeout': 1536739520111,
        'timefrom': 1536739520111,
      },
      {
        'order': 417454619141211111,
        'supplier': '雷霆应急',
        'account': '622812345',
        'method':'支付宝',
        'total': 1000,
        'order_status': '已结算',
        'timeout': 1536739520111,
        'timefrom': 1536739520111,
      },
    ],
    'total_count': 2,
    'page_index': 1,
    'page_size': 10,
  },
  'error_info': null,
  'is_success': true,
};


const Api = {
  'GET /platform/financial/page': (req, res) => {

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


