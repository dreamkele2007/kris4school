import React,{Component} from 'react';
import {default as _Draggable} from 'react-draggable';
import {DraggableCore} from 'react-draggable';

_Draggable.DraggableCore=DraggableCore;

class Draggable extends Component{
	render(){
		return(
			<_Draggable {...this.props}>{this.props.children}</_Draggable>
			)
	}
}

export default Draggable;
