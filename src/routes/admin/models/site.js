import ajax from '../../../constants/ajax';
export const REQUEST_SITE = 'site.REQUEST_SITE';
export const RECEIVE_SITE = 'site.RECEIVE_SITE';
export const EDIT = 'site.EDIT';
export const SAVE = 'site.SAVE';
export const LOAD = 'site.LOAD';
export const ADD = 'site.ADD';
export const ADD_OK = 'site.ADD_OK';


// 新增
export function addSiteAction(visible){
  return { type: ADD,visible:visible};
};

// 新增
export function addOKSiteAction(){
  return { type: ADD_OK,add:true};
};



// 查询所有站点
export const fetchAllSite = () => {
  return (dispatch) => {
    ajax({
      url: 'api/site/all',
      data: {},
      method:"get",
      success: (data) => {
        dispatch({type: LOAD,data: data.data,edit:''})
      }
    })
  }
};

// 保存
export function saveSiteAction(data){
  return (dispatch) => {
    ajax({
      url: 'api/site/save',
      data: data,
      method:"post",
      success: (data) => {
        dispatch(fetchAllSite())
      }
    })
  }
};
// 更新
export function updateSiteAction(data){
  return (dispatch) => {
    ajax({
      url: 'api/site/update',
      data: data,
      method:"post",
      success: (data) => {
        dispatch(fetchAllSite())
      }
    })
  }
};

// 指定Form编辑态/取消编辑
export function editSiteAction(id){
  return { type: EDIT,edit: id};
};


export function fetchSiteById(siteId) {
  return (dispatch) => {
    // 查询前
    dispatch(requestSite(siteId));
    //let {data} = await axios.get('');
    let data = {
      title: '系统',
      settings:{
        license:'full'
      }
    };
    // 查询后
    dispatch(receiveSite(data))
  }

};

let requestSite = (siteId) => {
  return {
    type: REQUEST_SITE,
    payload: siteId,
  };
};

let receiveSite = (data) => {
  return {
    type: RECEIVE_SITE,
    data: data,
    edit:''
  };
};

// let editBefore =(data) =>{
//   return {
//     type: EDIT_BEFORE,
//     data: data,
//   };
// }

const initialState = {
  accessToken: null,
  user: null,
};


export default function siteReducer(state= {data: [],edit: "",visible: false} , action) {
  switch (action.type) {
    case REQUEST_SITE:
      return Object.assign({}, state);
    case RECEIVE_SITE:
      let newState = {
        ...state,
        data: action.data,
        edit: action.edit
      };
      return {...newState};
    case EDIT:
      newState = {
        ...state,
        edit: action.edit
      };
      return {...newState};
    case LOAD:
      newState = {
        ...state,
        data: action.data,
        edit: action.edit
      };
      return {...newState};
    case ADD:
        newState = {
          ...state,
          visible:action.visible
        };
      return {...newState};
    case ADD_OK:
        newState = {
          ...state,
          add:action.ok
        };
      return {...newState};
    default:
      return state;
  }
}
