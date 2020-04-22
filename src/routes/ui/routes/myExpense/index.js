import React from 'react';
import {Table, Icon, Tooltip, Button, Input} from 'vdap-ui';

class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: false,
  }
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({value});
  }
  check = () => {
    this.setState({editable: false});
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }

  render() {
    const {value, editable} = this.state;
    return (
      <div className="editable-cell">
        {
          editable ?
            <div className="editable-cell-input-wrapper">
              <Input
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
              />
              <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check}
              />
            </div>
            :
            <div className="editable-cell-text-wrapper">
              {value || ' '}
              <Icon
                type="edit"
                className="editable-cell-icon"
                onClick={this.edit}
              />
            </div>
        }
      </div>
    );
  }
}

class MyExpense extends React.Component {

  constructor(props) {
    super(props);
    const dataSource = [];
    for (let count = 0; count < 46; count++) {
      dataSource.push({
        key: count,
        date: '2017/05/16',
        type: '收款凭证',
        maker: `张伦${count}`,
        checker: `许科峰${count}`,
        bookkeeper: `张洪武${count}`,
        attachNum: count,
      });
    }
    this.state = {
      dataSource: dataSource,
      count:dataSource.length,
      size: 'middle',
    }
  };

  handleAdd = () => {
    const {count, dataSource} = this.state;
    const newData = {
      key: count,
      date: '2017/05/16',
      type: '收款凭证',
      maker: `张伦${count}`,
      checker: `许科峰${count}`,
      bookkeeper: `张洪武${count}`,
      attachNum: count,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  }

  setBolder = () => {
    this.setState({
      size: 'middle',
    });
  }
  setNarrow = () => {
    this.setState({
      size: 'small',
    });
  }


  render() {
    const columns = [{
      title: '凭证号',
      dataIndex: 'key',
      key: 'key',
      width: '10%',
    }, {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      width: '15%',
    }, {
      title: ' 凭证类型',
      dataIndex: 'type',
      key: 'type',
      width: '15%',
    }, {
      title: '制单人',
      dataIndex: 'maker',
      key: 'maker',
      width: '15%',
    }, {
      title: '审核人',
      dataIndex: 'checker',
      key: 'checker',
      width: '15%',
    }, {
      title: '记账人',
      dataIndex: 'bookkeeper',
      key: 'bookkeeper',
      width: '15%',
    }, {
      title: '附件张数',
      dataIndex: 'attachNum',
      key: 'attachNum',
      sorter: (a, b) => a.attachNum - b.attachNum
    }
    ];


    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',    // Column configuration not to be checked
      }),
    };


    return (
      <div>
        <Tooltip title="宽行"><img alt="宽行" src={require('assets/images/ui/5.png')} onClick={this.setBolder}/></Tooltip>
        <span className="ant-divider"/>
        <Tooltip title="窄行"><img alt="窄行" src={require('assets/images/ui/6.png')} onClick={this.setNarrow}/></Tooltip>
        <span className="ant-divider"/>
        <Button className="editable-add-btn" onClick={this.handleAdd}>Add</Button>
        <Table  bordered rowSelection={rowSelection} columns={columns} dataSource={this.state.dataSource} size={this.state.size} pagination={{pageSize: 10}}/>
      </div>
    )
  }
}

export default MyExpense;
