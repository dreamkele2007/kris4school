import React,{Component} from 'react';
import {default as _Timeline,Item} from 'antd/lib/timeline';
class Timeline extends Component{
	render(){
		return(
			<_Timeline {...this.props}>{this.props.children}</_Timeline>
			)
	}
}
Timeline.Item = Item;
export default Timeline;
