import React from 'react';
import {Table, Icon, Timeline} from 'antd';

class ContentMore extends React.Component {
  getMenus = (menuArray) => {
    if (!menuArray) return null;
    return menuArray.map(item => {
      return (
          <Timeline.Item style={{marginLeft: '160px'}} key={item.key}>
            <span style={{color: '#999', marginLeft: '-150px', width: '160px', display: 'inline-block'}}>{item.time}</span>
            <u  style={{color: '#66a1f8', textDecoration: 'none'}}>{item.keyword1}</u>
            {item.content}
            <u style={{color: '#66a1f8', textDecoration: 'none'}}>{item.keyword2}</u>
          </Timeline.Item>
      )
    })
  };

  render() {
    console.log(this.props.contents);
    const content = this.getMenus(this.props.contents.contentMore);
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
          <Timeline style={{color: '#2a2a44'}}>
               {content}
          </Timeline>
      </div>
    )
  }
}

export default ContentMore;
