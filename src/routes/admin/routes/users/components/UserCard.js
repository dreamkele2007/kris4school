import React, {Component} from 'react';
import {Card, Table,Avatar} from 'antd';


class UserCard extends Component {
  render() {
    const {user, dispatch} = this.props;
    return (
      <Card>
        <Avatar icon="star"/>{user.siteName}:{user.siteIp}
      </Card>
    )
  }
}


export default UserCard;

