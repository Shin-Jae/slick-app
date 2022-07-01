import './SearchIcon.css'

const SearchIcon = ({ image }) => {
  return (
    <figure
      className='dm__icon--search'
      style={{ backgroundImage: `url( ${image})` }}
    />
  );
}

export default SearchIcon;