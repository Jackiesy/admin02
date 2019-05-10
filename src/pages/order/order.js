import React, { Component } from 'react';
import { Card, Divider, Modal, Popconfirm, Row, Tag } from 'antd';
import moment from 'moment';
import Table from '../../component/Table';
import { NewForm } from '../../component/NewForm';
import Search from '../../component/Search';

import { connect } from 'dva';

const modelFindPage = 'orderMessage/findPage';

@connect(({orderMessage, loading}) => ({
  orderMessage,
  pageLoading: loading.effects[modelFindPage],
}))
class Order extends Component {

  constructor(props) {
    super(props);
    this.state={
      Open:false,
      detail:[],
      order_data:{},
      page:1
    }
  }
  getTable = (dispatch) => {
    dispatch({
      type: 'orderMessage/getTable', payload: {},
    });
  };

  componentDidMount() {
    const { dispatch } = this.props;
    this.getTable(dispatch)
  }

  eventOpenDetail=(e)=>{
    this.setState({Open:true,detail:e})
  }
  handleOk = (e) => {
    this.setState({Open:false})
  }

  handleCancel = (e) => {
    this.setState({Open:false})
  }

  xxx = (value) => {
    this.setState({page:value})
      this.props.dispatch({
        type: 'orderMessage/getTable', payload: {page:value},
      });
  }

  render() {

    const { orderMessage:{order_data}, pageLoading } = this.props;
    const columns = [
      { title: '订单号', dataIndex: 'order_no' },
      { title: '供应商', dataIndex: 'supplier' },
      { title: '用户名', dataIndex: 'customer_name' },
      {
        title: '下单时间', dataIndex: 'created_at', render: (text) => (
          moment(text).format('YYYY-MM-DD HH:mm:ss')
        ),
      },
      { title: '订单总额', dataIndex: 'grand_total' },
      { title: '订单状态', dataIndex: 'order_status',render:(text)=>{switch(text){
          case "0":return <Tag color="red">未支付</Tag>; break;
          case "1":return <Tag color="blue">已支付</Tag>; break;
          case "2":return <Tag color="#87d068">已完成</Tag>; break;}}},
      { title: '付款方式', dataIndex: 'payment_method',render:(text)=>text==1?<span>微信</span>:<span>支付宝</span> },
      { title: '更新时间', dataIndex: 'd', render: (text) => (
          moment(text).format('YYYY-MM-DD HH:mm:ss')
        ), },
      {
        title: '操作', width: 180, dataIndex: 'cz', render: (text, record) => (
          <span>
            {/* <Popconfirm title={'您确认作废吗'} okText='确认' cancelText='取消' onConfirm={() => this.serviceBatchDelete(record.id)}>
            <a>作废</a>
          </Popconfirm>
            <Divider type='vertical'/>*/}
        {/*  <a onClick={() => this.eventOpenDetailByEdit(record.id)}>已审核</a>
          <Divider type='vertical'/>*/}
          <a onClick={() => this.eventOpenDetail(record.product_list)}>查看详情</a>
         {/* <Divider type='vertical'/>*/}

        </span>
        ),
      },
    ];

    const detail_list =[  { title: 'id', dataIndex: 'item_id' },
      { title: '产品图片', dataIndex: 'img', render: (text) => <img style={{width: 100}} src={text}/> },
      { title: '名称', dataIndex: 'name' },
      { title: '产品id', dataIndex: 'product_id' },
      { title: '商店id', dataIndex: 'store_id' },]


    return (
      <div style={{ margin: 20 }}>
        <NewForm
          options={[
            {
              rule: { required: true, whitespace: true, max: 10, min: 2 },
              name: '角色名称',
              id: 'role_name',
              type: 'input',
            },
            { rule: { required: false }, name: '角色描述', id: 'role_introduce', type: 'textarea' },
          ]}
        />

        <Card>
          <Search
            row={5}
            getSearchValue={this.eventSearchValue}
            searchLoading={pageLoading}
            options={[
              { key: '1', id: 'order_no', type: 'input', name: '订单号' },
              { key: '2', id: 'order_status', type: 'select', name: '订单状态', options: [{key:'0',value:'未支付'},{key:'1',value:'已支付'},{key:'2',value:'已完成'}]},
              { key: '3', id: 'start_time', type: 'date', name: '开始日期', format: 'YYYY-MM-DD' },
              { key: '4', id: 'end_time',  type: 'date',name: '结束日期', format: 'YYYY-MM-DD' },
              { key: '5', id: 'customer_name', type: 'input', name: '用户名' },
              { key: '6', id: 'store_id', type: 'selectInput', name: '供应商' },
            ]}
          />
        </Card>

        <Card style={{ marginTop: 20 }}>
          <Row style={{ marginTop: 5, minHeight: '100%' }}>
            <Table
              bordered
              size='default'
              onShowSizeChange={this.eventShowSizeChange}
              pageChange={this.eventPageChange}
              rowKey={record =>record.id}
              columns={columns}
              loading={pageLoading}
              dataSource={order_data.list}
              pagination={{total:order_data.count,onChange:(value)=>{this.xxx(value)},current:this.state.page}}
            />

          </Row>
        </Card>
        <Modal width={500}
               title="订单详情"
               visible={this.state.Open}
               onOk={this.handleOk}
               onCancel={this.handleCancel}
               cancelText='取消'
               okText='确认'
               footer={null}
        >

          <Table
            bordered
            size='default'
            rowKey={record =>record.id}
            columns={detail_list}
            dataSource={this.state.detail}
            pagination={false}
          />
        </Modal>

      </div>
    );
  }


}

Order.propTypes = {};
export default Order;
