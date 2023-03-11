import {actionTypes} from "../actions/imports";

const initialState = {
    imports: []
};

export default function importsreducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SELECT_IMPORTS:
            return {
                ...state,
                imports: { ...action.imports }
            };

        default:
            return { ...state };
    }
}