import React,{Component} from 'react';
import {default as _Slider} from 'antd/lib/slider';
class Slider extends Component{
	render(){
		return(
			<_Slider {...this.props}>{this.props.children}</_Slider>
			)
	}
}

export default Slider;
