export const isPresentInFavorites=(favorites,toolowner)=>{
    for(let item of favorites){
      if(toolowner.id===item.id)return true
    }
    return false;
  }