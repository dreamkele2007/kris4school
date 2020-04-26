import React, {Component} from 'react';
import {Form,Button, Card} from 'antd';
import {editSiteAction,deleteSiteAction,saveSiteAction,updateSiteAction} from '../../../models/site';
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
    let id = this.props.form.getFieldValue("id");
    this.props.dispatch(editSiteAction(id))
  }

  handleCancel = () =>{
    this.props.dispatch(editSiteAction(""))
  }

  handleDel =()=>{
    let data = this.props.form.getFieldsValue();
    this.props.dispatch(deleteSiteAction(data))
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
          <div>
            <Button style={{marginRight: 8}} onClick={this.handleEdit}>修改</Button>
            <Button style={{marginRight: 8}} onClick={this.handleDel}>删除</Button>
          </div>
            
        }
      </Card>
      
    )
  }
}

export default Form.create()(SiteCard);
