import './Typing.css'

const Typing = ({ person }) => (
  <div className="typing">
    <p className='typing__person'>{person} is typing</p>
    <div className="typing__dot"></div>
    <div className="typing__dot"></div>
    <div className="typing__dot"></div>
  </div>
)

export default Typing