import Channels from "./Channels";
import DMs from "./DMs"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllChannels } from '../../store/channels';

function MainPage() {
    const dispatch = useDispatch();
    const { userId } = useParams();
    console.log('id _______ ', userId)
    useEffect(() => {
        dispatch(getAllChannels(userId));
    }, [dispatch]);

    return (
        <>
            <div>Hello</div>
            <div>
                <Channels />
                <DMs />
            </div>
        </>
    )
}

export default MainPage;
