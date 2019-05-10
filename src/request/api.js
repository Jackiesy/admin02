import axios from 'axios';

export default {


  // 本地开发 mock 的时候配置
  target: '',

  // 本地开发，调用本地后端的时候配置

  /*axios.defaults.baseURL = '/';//其他地方请求地址可以省略域名*/

  platformMenuList: '/platform/menu/list',


  platformFinancialPage: '/platform/financial/page',
  platformFinancialObject: '/platform/financial/object',
  platformFinancialAdd: '/platform/financial/add',
  platformFinancialUpdate: '/platform/financial/update',
  platformFinancialBatchDelete: '/platform/financial/batch-delete',


  platformLogin: '/platform/login',
  platformLogout: '/platform/logout',

  // 获取全部权限
  allAuthority: '/platform/authority/allAuthority',
  order:'/platform/order',
  pay:'/platform/pay'

};
