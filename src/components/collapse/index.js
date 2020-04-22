import React,{Component} from 'react';
import {default as _Collapse,Panel} from 'antd/lib/collapse';
class Collapse extends Component{
	render(){
		return(
			<_Collapse {...this.props}>{this.props.children}</_Collapse>
			)
	}
}
Collapse.Panel = Panel;
export default Collapse;
