import React, { Component } from 'react';
import { Table, LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

export default class HehTable extends Component {
  constructor() {
    super();
    this.state = {
      selectedRowKeys: [],
    };
  }

  componentDidMount() {
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });

    if (this.props.selectedRowKeys) {
      this.props.selectedRowKeys(selectedRowKeys);
    }
  };

  render() {
    const { dataSource, columns, onShowSizeChange, pageChange, loading, size, bordered,pagination,current} = this.props;
    // const _pagination = pagination ? {
    //   ...pagination,
    //   onChange: pageChange,
    //   onShowSizeChange,
    //   current: dataSource && dataSource['page_index'],
    //   hideOnSinglePage: false,
    //   style: { margin: 15 },
    //   size: 'default'
    // } : pagination
    const newXX = {
        onChange: pageChange,
        onShowSizeChange,
        current: current,
        hideOnSinglePage: false,
        style: { margin: 15 },
        size: 'default'
      }
    const _pagination = pagination ? Object.assign(newXX,pagination) : pagination
    // {
    //   onChange: pageChange,
    //     total:total,
    //   onShowSizeChange,
    //   current: dataSource && dataSource['page_index'],
    //   hideOnSinglePage: false,
    //   /*  showSizeChanger: true,*/
    //   /*   showQuickJumper: true,*/
    //   style: { margin: 15 },
    //   size: 'default',
    //   /* showTotal: (total => `共 ${total} 条`),*/
    // }

    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <LocaleProvider locale={zhCN}>
        <Table
          style={{ background: '#FFF' }}
          size={size}
          bordered={bordered}
          dataSource={dataSource }
          columns={columns}
          rowSelection={rowSelection}
          pagination = {_pagination}
          loading={loading}
          rowKey='id'
        />
      </LocaleProvider>
    );
  }
}
