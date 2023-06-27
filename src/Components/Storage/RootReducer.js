const initialState ={
    cart:{},
    user:{}
}

export default function RootReducer(state=initialState,action){
    console.log(action);
    switch (action.type){
        case "ADD_CART" :            
            state.cart[action.payload[0]]=action.payload[1];
            return {cart:state.cart,user:state.user};

            case "DELETE_CART":         
                delete state.cart[action.payload[0]]                
                return { cart: state.cart,user:state.user }; 

            case "CLEAR_CART":         
                state.cart={}                
                return { cart: state.cart,user:state.user }; 

            case "ADD_USER":         
            state.user[action.payload[0]]=action.payload[1];
            console.log('XXXX USER DATA:',state.user)
                return { cart: state.cart,user:state.user }; 

            case "DELETE_USER":         
                delete state.cart[action.payload[0]]                
                return { cart: state.cart,user:state.user }; 
            
        default:
            return state;
    }

}