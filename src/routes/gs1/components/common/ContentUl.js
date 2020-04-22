import React from 'react';
import {Timeline} from 'antd';

class ContentMore extends React.Component {
  getMenus = (menuArray) => {
    if (menuArray.length===0) return null;
    return menuArray.map((item,i) => {
      return (
        <Timeline.Item style={{marginLeft: '160px'}} key={item.key}>
          <span style={{color: '#030303', marginLeft: '-180px', width: '180px', display: 'inline-block'}}>{new Date(parseInt(item.createDatetime) * 1).toLocaleString().replace(/年|月/g, "-").replace(/日/g, "")}</span>
          <u style={{textDecoration: 'none'}} >更新了数据</u>
          {item.time}
          {item.content}
          <u style={{ textDecoration: 'none'}}>{item.keyword2}</u>
        </Timeline.Item>
      )
    })

  };

  render() {
    const content = this.getMenus(this.props.contents.contentMore);
    return (
      <div style={{overflow: 'auto'}}>
        <div>
    		<span style={{fontSize: '14px', color: '#666', letterSpacing: '1.17px'}}>
    			{this.props.contents.title}
          <span style={{float: 'right', color: '#7d7d7d'}}>...更多</span>
    		</span>
        </div>
        <br/>
        <div style={{background:"#4C87ED"}}>
          <div width={this.props.contents.width} style={{borderBottom: '1px solid rgba(111,108,204,0.10)'}}/>
        </div>
        <br/>
        <Timeline style={{color: '#2a2a44'}}>
          {content}
        </Timeline>
      </div>
    )
  }
}

export default ContentMore;
