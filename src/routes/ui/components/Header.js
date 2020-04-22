import React, { Component } from 'react';
import {NavLink as Link} from 'react-router-dom';
import 'assets/icon/iconfont.css';
import {Avatar,Badge,Menu,Layout,Icon,Button} from 'vdap-ui';

const Wapper =Layout.Header;

class Header extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div style={{backgroundImage:'linear-gradient(-90deg, #4f8aee 3%, #90000A 100%)',height:'70px',border:0,margin:0,paddingLeft:'20px',position:'fixed',zIndex:'999',width:'100%'}}>
        <div style={{fontSize:'14px',color:'#ffffff',padding: '15px 0',lineHeight:'40px'}}>
          当前页面&nbsp;&nbsp;&nbsp;&nbsp;<Icon type="star-o" />

          <div style={{position:'fixed',zIndex:'10000',right:'50px',top:'15px'}}>

            <Button type="primary" shape="circle" icon="search" style={{fontSize:'20px',marginLeft:'18px',background:'#467fe1', border: 0}} />
            <Button type="primary" shape="circle" icon="skin" style={{fontSize:'20px',marginLeft:'18px',background:'#467fe1', border: 0}} />
            <Button type="primary" shape="circle" icon="question-circle-o" style={{fontSize:'20px',marginLeft:'18px',background:'#467fe1', border: 0}} />
            <Button type="primary" shape="circle" icon="bell" style={{fontSize:'20px',marginLeft:'18px',background:' #467fe1', border: 0}} />

            <a href="#">
              <Badge count={5} style={{top:'-22px',fontSize:'10px',lineHeight:'18px',height:'18px',boxShadow:'none'}}>
                <span className="head-example" />
              </Badge>
            </a>

            <img src={require('assets/images/ui/011.png')} style={{dispaly:'inline-block',width:'30px',marginLeft:'20px',marginTop:'-10px',borderRadius:'50%'}}  />
            <span style={{width:'50px',marginLeft:'15px'}} >北京协和医院 </span>|<span style={{width:'50px',marginLeft:'5px'}} >某某某</span>

          </div>
        </div>

      </div>

    )
  }
}

export default Header;
