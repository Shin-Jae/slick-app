import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllUsers } from '../../store/search';
import SearchBar from './SearchBar';

function Search() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);


    useEffect(() => {
        if (user) {
            dispatch(getAllUsers());
        }
    }, [dispatch])

    return (
        <div>
            <SearchBar />
        </div>
    )
}

export default Search;
