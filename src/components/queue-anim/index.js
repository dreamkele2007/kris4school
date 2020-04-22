/**
 * Created by chenty on 2017/6/22.
 */

import React,{Component} from 'react';
import {default as _QueueAnim} from 'rc-queue-anim/lib';
import {isQueueAnim } from 'rc-queue-anim/lib';
class QueueAnim extends Component{
	render(){
		return(
			<_QueueAnim {...this.props}>{this.props.children}</_QueueAnim>
			)
	}
}
QueueAnim.isQueueAnim=isQueueAnim;
export default  QueueAnim;
