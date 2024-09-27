import { createContext, useReducer } from 'react'

export const UserContext = createContext()

//state is the current state, action the object passed into dispatch
export const userReducer = (state, action) => {
    switch (action.type) {
        case'SET_USER':
            return {
                //if want to set all workouts bc payload is an array of all workouts
                user: action.payload
            }
        case 'CREATE_USER':
            return{
                //payload will be a single new workout object
                //workouts will now  be new wokrout + all previous wokrouts
                user: [action.payload, ...state.user]
            }
        case 'DELETE_USER':
            return {
                user: state.user.filter(w => w._id !== action.payload._id)
            }
        default:
            //if not any, return original state
            return state
    }
}

export const WorkoutsContextProvider = ({ children }) => {
    //children is the app

    const [state, dispatch] = useReducer(userReducer, {
        user: null
    })


    return(
        <UserContext.Provider value={{...state, dispatch}}>
            { children }
        </UserContext.Provider>
    )
}