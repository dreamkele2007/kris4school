import React,{Component} from 'react';
import {default as _Carousel} from 'antd/lib/carousel';
class Carousel extends Component{
	render(){
		return(
			<_Carousel {...this.props}>{this.props.children}</_Carousel>
			)
	}
}

export default Carousel;
