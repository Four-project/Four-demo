import State from './state'
export default (preState=State,action)=>{
  let newDate=JSON.parse(JSON.stringify(preState))//深拷贝
  let {type,params} =action
  switch (type) {
    case 'CHANGE_MODELSTATE':
      newDate.modelState=!newDate.modelState
      break;
  
    default:
      break;
  }
  return newDate
}