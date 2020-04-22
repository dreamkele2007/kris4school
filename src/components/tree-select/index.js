import React,{Component} from 'react';
import {default as _TreeSelect,TreeNode,SHOW_PARENT,SHOW_ALL,SHOW_CHILD } from 'antd/lib/tree-select';
class TreeSelect extends Component{
	render(){
		return(
			<_TreeSelect {...this.props}>{this.props.children}</_TreeSelect>
			)
	}
}
TreeSelect.TreeNode = TreeNode;
TreeSelect.SHOW_PARENT = SHOW_PARENT;
TreeSelect.SHOW_ALL = SHOW_ALL;
TreeSelect.SHOW_CHILD = SHOW_CHILD;
export default TreeSelect;
