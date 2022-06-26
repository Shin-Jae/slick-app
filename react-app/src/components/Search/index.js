import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllUsers } from '../../store/search';
import SearchBar from './SearchBar';

function Search() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch])

    return (
        <div>
            <SearchBar />
        </div>
    )
}

export default Search;
