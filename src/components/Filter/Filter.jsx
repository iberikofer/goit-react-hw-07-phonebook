import { useDispatch } from 'react-redux';
import { setFilter } from 'redux/slices/filterSlice';

export const Filter = () => {
  const dispatch = useDispatch();

  const handleInputChange = e => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3>Find contacts by name</h3>
      <input
        type="text"
        name="search"
        onChange={handleInputChange}
        style={{ borderRadius: 15, padding: 5 }}
      ></input>
    </div>
  );
};

export default Filter;
