export function isValid(cartItems){
    console.log("cartItems -------------- ",cartItems[0].tool?.toolowner.id)
    const toolownerId=cartItems[0]?.tool?.toolowner.id
   
    for(let item of cartItems){
        console.log("item ---- ", item.toolowner?.id)
      if(item.tool?.toolowner.id!==toolownerId){
        return false;
      }
    }
    return true
  }