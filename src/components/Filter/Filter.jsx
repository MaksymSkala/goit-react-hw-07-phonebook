import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../reducers/contactsSlice';
import './Filter.css';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.contacts.filter);

  const handleFilterChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <label>
      Find contacts by name:
      <input
        className="filter-input"
        type="text"
        name="filter"
        value={filter} // Тут може виникати попередження
        onChange={handleFilterChange}
      />
    </label>
  );
};

export default Filter;