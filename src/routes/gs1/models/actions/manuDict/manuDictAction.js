export function LoadDataLeft(result){
  return {type: 'showLeftInfo', data:{array: result}};
}
export function LoadDataByInfo(result){
  return {type: 'showInfo', data:result};
}
export function addManuRightTop(documentModel) {
  return {type:'MANU_RIGHT_TOP',documentModel};
}
