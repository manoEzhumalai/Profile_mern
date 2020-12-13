const initState = {
    test: 'component1',
    loader:false,
    profile_array:[]
}

const rootReducer = (state = initState, action) => {
    if (action.type === 'tested') {
        return {
            ...state,
            test : action.test
        }
    }else  if(action.type === 'Profile_list') {
        return {
            ...state,
            profile_array : action.profile_array,
            Loader : action.Loader
        }
    }else  if(action.type === 'Loader') {
        return {
            ...state,
            Loader : action.Loader
        }
    } else {
        return {
            ...state,
            test: 'component1'

        }
    }
    // return state;
}

export default rootReducer