import React, { useState } from "react";
const Search = ({ onSearch }) => {
    return (
        <React.Fragment>
            <input className="form-control form-control-dark w-100" type="text" placeholder="Search"
                   aria-label="Search"/>
        </React.Fragment>
    );
};
/*
*                             <Search
                                onSearch={value => {
                                    dispatch(setFilterSearchString(value));
                                    setPage(0);
                                }}
                            />
* */
export default Search;
