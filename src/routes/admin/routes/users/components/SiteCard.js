import React, {Component} from 'react';
import {Card, Icon} from 'antd';


class SiteCard extends Component {
  render() {
    const {user} = this.props;
    const siteIp = "https://"+user.siteIp;
    return (
      <Card title={user.siteName} bordered={false} extra={<a href={siteIp} target="_blank" rel="noopener noreferrer">点击进入</a>}>
         <Icon type="global" style={{ fontSize: 16, color: '#08c' }}/><span style={{fontSize:"16"}}>站点地址:{user.siteIp}</span>
      </Card>
    )
  }
}

export default SiteCard;

