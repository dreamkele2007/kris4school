import React, { Component } from 'react';
import 'assets/icon/iconfont.css';
import {Icon,Button} from 'antd';

class Header extends Component {
  render() {
    return (
      <div style={{backgroundImage:'linear-gradient(#90000A, #90000A 3%, #90000A 100%)',height:'70px',border:0,margin:0,paddingLeft:'20px',position:'fixed',zIndex:'999',width:'100%'}}>
        <div style={{fontSize:'14px',color:'#ffffff',padding: '15px 0',lineHeight:'40px'}}>
          当前页面&nbsp;&nbsp;&nbsp;&nbsp;<Icon type="star-o" />
          <div style={{position:'fixed',zIndex:'10000',right:'50px',top:'15px',textAlign:'center'}}>
            <Button type="primary" shape="circle" icon="search" style={{fontSize:'20px',marginLeft:'10px',background:'none', border: 0,verticalAlign:'middle'}} />
            <Button type="primary" shape="circle" icon="bell" style={{fontSize:'20px',marginLeft:'10px', background:'none',border: 0,verticalAlign:'middle'}} />
            <img src={require('assets/images/ui/userLogo.png')} style={{dispaly:'inline-block',width:'30px',marginLeft:'20px',borderRadius:'50%',verticalAlign:'middle'}}  />
            <span style={{width:'50px',marginLeft:'15px',verticalAlign:'middle'}} >计算机实验室 </span>|
            <span style={{width:'50px',marginLeft:'5px',verticalAlign:'middle'}} >某某某</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Header;
