import Channels from "./Channels";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UnauthorizedUser from "../UnauthorizedUser";
import './MainPage.css'

function MainPage() {
  const { userId } = useParams()
  const sessionUser = useSelector((state) => state.session.user)

  if (+userId !== +sessionUser.id) {
    return (
      <UnauthorizedUser userId={sessionUser.id} />
    )
  }

  return (
    <div>
      <Channels />
    </div>
  )
}

export default MainPage;
