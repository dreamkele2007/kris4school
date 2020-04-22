import React from 'react';
import ReactDOM from 'react-dom';
import { Card,Form, Row, Col, Input, Button, Icon } from 'vdap-ui';
import MultiQueryForm from './MultiQueryForm';

const FormItem = Form.Item;

class MultiQuery extends React.Component {
  render() {
    return (
      <Card>
       <MultiQueryForm />
      </Card>
    );
  }
}

export default MultiQuery;