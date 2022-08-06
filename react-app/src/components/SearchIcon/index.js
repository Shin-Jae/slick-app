import './SearchIcon.css'

const SearchIcon = ({ image, first_letter }) => {
  return (
    <>
      {image ?
        <figure
          className='dm__icon--search'
          style={{ backgroundImage: `url( ${image})` }}
        />
        : <div className='default-pro-nav message__icon--user'>
          {first_letter}
        </div>}
    </>
  );
}

export default SearchIcon;
