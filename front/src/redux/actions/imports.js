export const actionTypes = {
    SELECT_IMPORTS: "Imports/select"
};

export function selectImports(imports) {
    return dispatch => {
        return dispatch({ type: actionTypes.SELECT_IMPORTS, imports });
    };
}