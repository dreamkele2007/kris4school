import React,{Component} from 'react';
import {default as _Tag,CheckableTag} from 'antd/lib/tag';
class Tag extends Component{
	render(){
		return(
			<_Tag {...this.props}>{this.props.children}</_Tag>
			)
	}
}
Tag.CheckableTag = CheckableTag;
export default Tag;
