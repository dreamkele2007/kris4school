import React from 'react';
import {Table, Icon, Timeline} from 'antd';

class ContentUl extends React.Component {
  getMenus = (menuArray) => {
    if (!menuArray) return null;
    return menuArray.map(item => {
      return (
        <Timeline>
        <Timeline.Item  style={{marginLeft:'160px',color:'red'}} ><span  style={{color:'#999',marginLeft:'-150px',width:'160px',display:'inline-block'}}>{item.time}</span>{item.content}</Timeline.Item>
        </Timeline>
      )
    })
  };

  render() {
    console.log(this.props.contents);
    const content = this.getMenus(this.props.contents.ContentUl);
    return (
      <div style={{overflow: 'auto'}}>
        <div>
    		<span style={{fontSize: '14px', color: '#666', letterSpacing: '1.17px'}}>
    			{this.props.contents.title}
          <div style={{float: 'right', color: '#7d7d7d', marginTop: '10px'}}>...更多</div>
    		</span>
        </div>
        <br/>
        <div>
          <div width={this.props.contents.width} style={{borderBottom: '1px solid rgba(111,108,204,0.10)'}}/>
        </div>
        <br/>
          {content}
      </div>
    )
  }
}

export default ContentUl;
