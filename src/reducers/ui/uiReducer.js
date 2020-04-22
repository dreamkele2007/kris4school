const uiReducer = (state = { affixdata:[],sideNavConfig:[],sideNavPin:[],setSideClose:[]}, action) => {
	switch (action.type) {
	    case "sideNavConfig":
	      return {
	        ...state,
	        sideNavConfig: action.sideNavConfig
	      };
	      case "sideNavPin":
	      return {
	        ...state,
	        sideNavPin: action.sideNavPin
	      };
	     case "affixData":
	      return {
	        ...state,
	        data: action.affixdata
	      }; 
	      case "setSideClose":
	      return {
	        ...state,
	        setSideClose: action.setSideClose
	      }; 
	    default:
      		return state;  
	}
}
export default uiReducer;
