import React from 'react';
import {Icon, Timeline} from 'antd';
import { NavLink as Link } from 'react-router-dom'
class ContentMore extends React.Component {
  getMenus = (menuArray) => {
    if (!menuArray) return null;
    return menuArray.map((item,i) => {
        return  (
          <div>{this.onaick(item)}</div>
        );
    })
  };
  ItemDel=(item)=> {
    return (
      <div>
        <Timeline.Item dot={<Icon type="clock-circle-o" style={{fontSize: '16px'}}/>} color="red"
                       style={{marginLeft: '70px'}} key={item.key}>
                    <span style={{color: '#2a2a44', marginLeft: '-80px', width: '100px', display: 'inline-block'}}>
                      {item.name}
                    </span>
          <u style={{textDecoration: 'none'}}>{item.keyword1}</u>
          {item.time}
          {item.content}
          <u style={{textDecoration: 'none'}}>{item.keyword2}</u>
        </Timeline.Item>
      </div>
    )
  }
  onaick=(item)=>{
    if(item.name==='医院'){
      return (
        <div>
          <Link to={`/gs1/Product/Hospital`}>
            {this.ItemDel(item)}
          </Link>
        </div>
      )
    } else if(item.name==='产品'){
      return (
        <div>
          <Link to={`/gs1/Product/PraductData`}>
            {this.ItemDel(item)}
          </Link>
        </div>
      )
    }else if(item.name==='地区'){
     
    }else if(item.name==='厂商'){
      return (
        <div>
          <Link to={`/gs1/Product/ManufacturingData`}>
            {this.ItemDel(item)}
          </Link>
        </div>
      )
    }else {
      return (
        <div>
          <Link to={`/gs1/Product/gpcCatagoryDictViewer`}>
            {this.ItemDel(item)}
          </Link>
        </div>
      )
    }
  }
  render() {
    console.log(this.props.contents);
    const content = this.getMenus(this.props.contents.contentMore);
    return (
      <div style={{overflow: 'auto'}}  >
        <div >
    		<span style={{fontSize: '14px', color: '#666', letterSpacing: '1.17px'}}>
    			{this.props.contents.title}
          <div style={{float: 'right', color: '#7d7d7d', marginTop: '10px'}}></div>
    		</span>
        </div>
        <br/>
        <div style={{background:"#4C87ED"}}>
          <div width={this.props.contents.width} style={{borderBottom: '1px solid rgba(111,108,204,0.10)'}}/>
        </div>
        <br/>
          <Timeline  style={{color: '#2a2a44'}}>
               {content}
          </Timeline>
      </div>
    )
  }
}

export default ContentMore;
