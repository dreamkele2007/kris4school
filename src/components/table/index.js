import './style/';
import React,{Component} from 'react';
import {default as _Table,Column,ColumnGroup} from 'antd/lib/table';
class Table extends Component{
	render(){
		return(
			<_Table {...this.props}>{this.props.children}</_Table>
			)
	}
}
Table.Column = Column;
Table.ColumnGroup=ColumnGroup;
export default Table;
