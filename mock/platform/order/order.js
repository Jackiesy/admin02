import { delay } from 'roadhog-api-doc';



const jsonData = {
  'result': {
    'items': [
      {
        'id': '417454619141211111',
        'name': '雷霆应急',
        'user': '管理员aa',
        'create_date': 1536739520111,
        'a': 100,
        'b': '待支付',
        'c': '支付宝',
        d:1536739520133
      },

    ],
    'total_count': 2,
    'page_index': 1,
    'page_size': 10,
  },

};


const Api = {
  'GET /platform/order': (req, res) => {

    const { platform_token } = req.headers;
    console.log(platform_token)
    if (platform_token && platform_token !== 'null') {
      res.send(JSON.stringify(jsonData));
    }

  },
};
export default delay(Api, 10);


