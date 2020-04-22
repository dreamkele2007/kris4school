import MANUDICTCONFIG from '../../actions/RegionConfig';
const  documentModel = MANUDICTCONFIG.documentModel;
const  left = MANUDICTCONFIG.left;
const regionDict = (state = { documentModel,left ,
  menuDictList:[],
  pageInfo: {
      total: 0,
      current: 1
    }
  }, action) => {
  switch (action.type) {
    case 'MANU_RIGHT_TOP':
      return {...state,
        documentModel:action.documentModel
      };
    case 'showInfo':
      return { ...state,documentModel:action.data }
    case 'showLeftInfo':
      return {...state,left:action.data}
    default:
      return state;
  }
};
export default regionDict;
