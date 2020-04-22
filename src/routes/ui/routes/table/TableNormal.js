import React from 'react';
import { Table, Icon } from 'vdap-ui';



class TableNormal extends React.Component{

  render(){
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
      }
    ];

  const data = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      date:'2017/05/16',
      type:'收款凭证',
      maker: `张伦${i}`,
      checker:`许科峰${i}`,
      bookkeeper:`张洪武${i}`,
      attachNum: i,
    });
  }

    return (
      <Table bordered columns={columns} dataSource={data} size='middle' pagination={{ pageSize: 20 }} />
    )
  }
}

export default TableNormal;