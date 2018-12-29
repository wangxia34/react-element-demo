const initialState = {
    a: 'a',
    b: 'b'
};

function someApp(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_A':
            return { ...state, a: 'Modified a' };
        case 'CHANGE_B':
            return { ...state, b: action.payload };
        default:
            return state
    }
}
export default someApp
