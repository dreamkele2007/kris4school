import React, {Component} from 'react';
import {Form,Button, Card} from 'antd';
import {editSiteAction,saveSiteAction,updateSiteAction} from '../../../models/site';
import SiteForm  from './SiteForm'
class SiteCard extends Component {

  handleSave = (e) => {
    e.preventDefault();
    const {form,dispatch} = this.props;
    form.validateFields((err, values) => {
      if (!err) {
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
      <Card>
        <SiteForm {...this.props} item={item} edit={edit} index={index}/>
        { 
          this.props.edit ? 
          <div>
            <Button style={{marginRight: 8}}  onClick={this.handleCancel}>取消</Button>
            <Button style={{marginRight: 8}} type="primary"  onClick={this.handleSave}>保存</Button>
          </div>
          :
          <Button style={{marginRight: 8}} onClick={this.handleEdit}>修改</Button>
        }
      </Card>
      
    )
  }
}

export default Form.create()(SiteCard);
