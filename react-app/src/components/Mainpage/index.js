import Channels from "./Channels";
// import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import UnauthorizedUser from "../UnauthorizedUser";
// import { getAllChannels } from '../../store/channels';

function MainPage() {
  const { userId } = useParams()
  const sessionUser = useSelector((state) => state.session.user)

  if (+userId !== +sessionUser.id) {
    return (
      <UnauthorizedUser userId={sessionUser.id} />
    )
  }

  return (
    <>
      <div>
        <Channels />
      </div>
    </>
  )
}

export default MainPage;
