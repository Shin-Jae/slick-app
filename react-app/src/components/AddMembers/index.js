import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllUsers } from '../../store/search';
import AddMembersSearch from './AddMembersSearch';


function AddMembers({ setMembers }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch])

    return (
        <div>
            <AddMembersSearch setMembers={setMembers} />
        </div>
    )
}

export default AddMembers;
