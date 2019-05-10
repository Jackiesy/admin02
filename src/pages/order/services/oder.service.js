import request from '../../../request/request';

export async function getTab(params) {
    console.log(params)
  return request.get('http://192.168.5.92:81/order/order-list',params);
}
export async function getSupplier(params) {
  console.log(params)
  return request.get('http://192.168.5.49:8088/Store/getstorename.html',params);
}

export async function getSelect(params) {
  return request.post(`http://192.168.5.49:8088/store/searchstorename`,params);
}
