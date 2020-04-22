import React, {Component} from 'react';
import {Row, Col, Form, Button} from 'antd';
import {editSiteAction,saveSiteAction,updateSiteAction} from '../../../models/site';
import SiteForm  from './SiteForm'
class SiteCard extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    const {form, site,dispatch} = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        console.log('Received values of props: ',site);
        let data = this.props.form.getFieldsValue();
        let id = this.props.form.getFieldValue("id");
        if(id){
          dispatch(updateSiteAction(data));
        }else {
          dispatch(saveSiteAction(data));
        }
      }
    });
    
  };
  

  handleEdit = () => {
    const {dispatch} = this.props;
    let id = this.props.form.getFieldValue("id");
    dispatch(editSiteAction(id))
  }

  handleCancel = () =>{
    const {dispatch} = this.props;
    dispatch(editSiteAction(""))
  }

  render() {
    const {item,edit,index} = this.props;
    
    return (
      <Row>
        <SiteForm {...this.props} item={item} edit={edit} index={index}/>
        <Col span={24} style={{textAlign: 'right'}}>
          { 
            this.props.edit ? 
            <div>
              <Button style={{marginRight: 8}}  onClick={()=> this.handleCancel()}>取消</Button>
              <Button style={{marginRight: 8}} type="primary"  onClick={this.handleSubmit}>保存</Button>
            </div>
            :
            <Button style={{marginRight: 8}} onClick={()=> this.handleEdit()}>修改</Button>
          }
        </Col>
      </Row>
    )
  }
}



const mapPropsToFields = (props) => {
  return {};
}

export default Form.create({
  mapPropsToFields,
})(SiteCard);
