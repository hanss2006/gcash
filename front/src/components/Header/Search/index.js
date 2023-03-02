import React from "react";
import "./search.css";
import {setFilterPageNum, setFilterSearchString} from "../../../redux/actions/filterAction";
import {useDispatch, useSelector} from "react-redux";
const Search = ({ onSearch }) => {
    const { filterCurrentAccountFullName } = useSelector((state) => state.filterState);

    const dispatch = useDispatch();
    const setPage = (numPage) => {
        dispatch(setFilterPageNum(numPage));
    }
    return (
        <React.Fragment>
            <input
                type="search" id="search" className="form-control-dark form-control w-100" type="text" placeholder={filterCurrentAccountFullName}
                    aria-label="Search"
                onChange={e => {
                    dispatch(setFilterSearchString(e.target.value.toLowerCase()));
                    setPage(0);
                }}
            />
        </React.Fragment>
    );
};

export default Search;
