import { getTab, getSupplier, getSelect } from '../services/oder.service';
import { message } from 'antd';


export default {
  namespace: 'orderMessage',
  state: {
    order_data: {},
    supplier: {},
    select: {},
  },
  subscriptions: {},
  effects: {
    * getTable({ payload }, { call, put }) {
      let tableList = yield call(getTab, payload);
      if (tableList.err_code&&tableList.err_code == 401) {
        message.error('没有登录,禁止访问,请登录！！！', 3);
        window.location.href = '/admin.php?s=/Public/login.html';
        /*没有登录*/

      } else {
        const ids = tableList.data && tableList.data.list.map((v) => v.product_list[0].store_id);
        if (ids) {
          const response = yield call(getSupplier, { ids: ids.join(',') });
          const newResponse = tableList.data.list.map(item => {
            let key = `id_${item.product_list[0].store_id}`;
            item['supplier'] = response[key] || '';
            return item;
          });
          tableList.data.list = newResponse;
          yield put({ type: 'putAll', payload: tableList.data });

        }
      }

      //console.log(response,'结果',payload)


    },
    * selectMessage({ payload }, { call, put }) {
      const str = `store_name=${payload}`
      let List = yield call(getSelect,str);
      yield put({ type: 'suppliers', payload: List });
    },


  },
  reducers: {
    putAll(state, action) {
      return {
        ...state,
        order_data: action.payload,
      };
    },
    suppliers(state, action) {
      return {
        ...state,
        select: action.payload,
      };
    },
  },
};

