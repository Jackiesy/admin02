import React, { Component } from 'react';
import { Row, Col, Form, Select, Button, DatePicker } from 'antd';
import { ItemInput, ItemSelect } from '../../component/FormItemComponent';
import moment from 'moment';
import 'moment/locale/zh-cn';
import styles from './search.less';
import { connect } from 'dva';
import { logicalExpression } from '@babel/types';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;

@connect(({ orderMessage }) => ({
  orderMessage,

}))
class HehTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false,
      reset: false,
      val: '',
      arr: [],
      index: -1,
      currentId:''
    };
  }

  submit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const newValue = Object.assign({},values,{
        store_id: this.state.currentId.slice(3)
      })
      this.props.dispatch({
        type: 'orderMessage/getTable', payload: newValue,
      });
      if (!err) {
        const options = this.props.options;
        options && options.forEach(item => {
          switch (item.type) {
            case 'date' :
              if (values[`${item.id}`]) {
                values[`${item.id}`] = values[`${item.id}`].format(item.format || 'YYYY-MM-DD HH:mm:ss');
              }
              break;
            case 'rangeDate' :
              /*  if (values[item.id]) {
                 /!* const min_create_date = values[item.id][0].valueOf();
                  const max_create_date = values[item.id][1].valueOf();*!/
                 /!* values[item.id][0] = values[item.id][0].format(item.format || 'YYYY-MM-DD HH:mm:ss');
                  values[item.id][1] = values[item.id][1].format(item.format || 'YYYY-MM-DD HH:mm:ss');
                  values['min_create_date'] = min_create_date;
                  values['max_create_date'] = max_create_date;*!/
                }*/
              break;
            case 'selectInput' :


              break;
            default :
              break;
          }
        });
        for (let i in values) {
          if (values.hasOwnProperty(i)) {
            if (values[i] === undefined || values[i] === 'created' || values[i] === null) {
              delete values[i];
            }
          }
        }
        return values;
        /*this.props.getSearchValue(values);*/
      }
    });
  };
  reset = () => {
    this.setState({ reset: true });
    this.props.form.resetFields();
    /*  this.props.getSearchValue();*/
  };
  expand = () => {
    this.setState({ expand: !this.state.expand });
  };
  JudgeWidth = () => {
    const width = document.body.clientWidth;
    if (width >= 1600) return 'xxl';
    if (width >= 1200) return 'xl';
    if (width >= 768) return 'md';
    return 'xs';
  };
  hehInput = (layout, item, index, disabled, defaultValue) => {
    const sizeGrade = { xs: 1, md: 2, xl: 3, xxl: 4 };
    const size = sizeGrade[this.JudgeWidth()];
    return (
      <Col
        xs={24}
        md={12}
        xl={8}
        xxl={6}
        key={item.key}
        style={{ display: this.state.expand ? 'inline-block' : index + 1 > size ? 'none' : 'inline-block' }}
      >
        <ItemInput
          id={item.id}
          name={item.name}
          layout={layout}
          form={this.props.form}
          disabled={disabled}
          defaultValue={this.state.reset !== true ? defaultValue : null}
        />
      </Col>
    );
  };
  hehSelect = (layout, item, index, disabled, defaultValue) => {
    const sizeGrade = { xs: 1, md: 2, xl: 3, xxl: 4 };
    const size = sizeGrade[this.JudgeWidth()];
    return (
      <Col
        xs={24}
        md={12}
        xl={8}
        xxl={6}
        key={item.key}
        style={{ display: this.state.expand ? 'inline-block' : index + 1 > size ? 'none' : 'inline-block' }}
      >
        <ItemSelect
          id={item.id}
          name={item.name}
          options={item.options}
          layout={layout}
          form={this.props.form}
          disabled={disabled}
          rule={{ required: false }}
          defaultValue={this.state.reset !== true ? defaultValue : null}
        />
      </Col>
    );
  };
  hehData = (layout, item, index, defaultValue) => {
    const sizeGrade = { xs: 1, md: 2, xl: 3, xxl: 4 };
    const size = sizeGrade[this.JudgeWidth()];
    const { getFieldDecorator } = this.props.form;
    let newDefaultValue;
    if (defaultValue && defaultValue[item.id]) {
      let defaultValueArr = defaultValue[item.id];
      newDefaultValue = moment(defaultValueArr);
    }
    return (
      <Col
        xs={24}
        xl={8}
        md={12}
        xxl={6}
        key={item.key}
        style={{ display: this.state.expand ? 'inline-block' : index + 1 > size ? 'none' : 'inline-block' }}
      >
        <FormItem
          {...layout}
          label={item.name}
        >
          {
            getFieldDecorator(item.id, {
              initialValue: this.state.reset !== true ? newDefaultValue : null,
            })(
              <DatePicker placeholder='请选择日期' style={{ width: '100%' }}/>,
            )
          }
        </FormItem>
      </Col>
    );
  };
  hehRangeData = (layout, item, index, defaultValue) => {
    const sizeGrade = { xs: 1, md: 2, xl: 3, xxl: 4 };
    const size = sizeGrade[this.JudgeWidth()];
    const { getFieldDecorator } = this.props.form;
    let newDefaultValue = [];
    if (defaultValue) {
      let defaultValueArr = defaultValue[item.id];
      newDefaultValue = [moment(defaultValueArr[0]), moment(defaultValueArr[1])];
    }
    return (
      <Col
        xs={24}
        xl={8}
        md={12}
        xxl={6}
        key={item.key}
        style={{ display: this.state.expand ? 'inline-block' : index + 1 > size ? 'none' : 'inline-block' }}
      >
        <FormItem
          {...layout}
          label={item.name}
        >
          {
            getFieldDecorator(item.id, {
              initialValue: this.state.reset !== true ? newDefaultValue : null,
            })(
              <RangePicker placeholder={['开始时间', '结束时间']} style={{ width: '100%' }}/>,
            )
          }
        </FormItem>
      </Col>
    );
  };


  handleChange = async (e) => {
    this.setState({ val: e.target.value }, async () => {
      await this.props.dispatch({
        type: 'orderMessage/selectMessage',
        payload: this.state.val,
      });
      if (Object.keys(this.props.orderMessage.select).length) {
        this.setState({ arr: this.props.orderMessage.select }, () => {
          console.log(45678961319687461563486, this.state.arr);
        });
      }
      // if(select){
      //   this.setState({arr:select},()=>{
      //     console.log(45678961319687461563486,this.state.arr)
      //   });
      // }
    });


  };
  handleKeyUp = (e) => {
    let keyCode = e.keyCode;
    if (keyCode === 38 || keyCode === 40) {
      if (keyCode === 38) {
        this.setState({ index: this.state.index - 1 });
        if (this.state.index < 0) {
          this.setState({ index: this.state.arr.length - 1 });
        }
        //根据上下键切换，则给表单时面赋不同的值
        e.target.value = this.state.arr[this.state.index + 1];
        this.setState({ val: e.target.value });
      } else {
        this.setState({ index: this.state.index + 1 });
        if (this.state.index >= this.state.arr.length - 1) {
          this.setState({ index: -1 });
        }
        //根据上下键切换，则给表单时面赋不同的值
        e.target.value = this.state.arr[this.state.index + 1];
        this.setState({ val: e.target.value });
      }
    }
  };


  componentDidMount() {
    //生命周期，在组件加载完成后，让input聚焦 (focus)
    this.refs.input.focus();
  }

  handleClick = (e,id) => {
    this.setState({ val: e, arr: [] ,currentId:id});
  };

  hehselectInput = (layout, item, index, defaultValue) => {
    return (
      <div className='container' key={index + '1'}>
        <span style={{ marginLeft: 64 }}>供应商：</span><input type="text" ref='input' onChange={this.handleChange}
                                                           onKeyUp={this.handleKeyUp} value={this.state.val}
                                                           style={{ width: 320, height: 32, borderRadius: 4 }}/>
        <ul className='list-group'>
          {this.state.arr && Object.keys(this.state.arr).map((item, key) => {

            return <li onClick={() => this.handleClick(this.state.arr[item],item)} key={key}>{this.state.arr[item]}</li>;
          })}
        </ul>
        {/* <h2>{this.state.val}</h2>*/}
      </div>
    );
  };

  render() {
    const { options, searchLoading, defaultValue } = this.props;
    const { expand } = this.state;
    const layout = {
      labelCol: { sm: { span: 6 }, xl: { span: 6 }, xxl: { span: 6 } },
      wrapperCol: { sm: { span: 14 }, xl: { span: 16 }, xxl: { span: 16 } },
    };
    const sizeGrade = { xs: 1, md: 2, xl: 3, xxl: 4 };
    const size = sizeGrade[this.JudgeWidth()];
    return (
      <Row>
        <Form onSubmit={this.submit}>
          {/*组件*/}
          <Row>
            {
              options && options.map((item, index) => {
                return (
                  item.type === 'input' ?
                    this.hehInput(layout, item, index, false, defaultValue)
                    : item.type === 'select' ?
                    this.hehSelect(layout, item, index, false, defaultValue)
                    : item.type === 'date' ?
                      this.hehData(layout, item, index, defaultValue)
                      : item.type === 'rangeDate' ?
                        this.hehRangeData(layout, item, index, defaultValue)
                        : item.type === 'selectInput' ?
                          this.hehselectInput(layout, item, index, defaultValue)
                          : ''
                );
              })
            }
          </Row>
          {/*按钮组*/}
          <Row>
            <Col span={24} className={styles.btnGroup}>
              <Button loading={searchLoading} htmlType="submit" onClick={this.submit} type='primary'
                      icon='search'>搜索</Button>
              <span> </span>
              <Button onClick={this.reset} icon='loading-3-quarters'>重置</Button>
              <span> </span>
              <Button
                onClick={this.expand}
                icon={!expand ? 'down' : 'up'}
                style={{ display: options.length > size ? 'inline-block' : 'none' }}
              >
                {
                  !expand ? '展开所有' : '收起所有'
                }
              </Button>
            </Col>
          </Row>
        </Form>
      </Row>
    );
  }
}

const Search = Form.create()(HehTable);
export default Search;
