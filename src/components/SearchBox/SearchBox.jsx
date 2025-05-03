import { useDispatch, useSelector } from 'react-redux';
import css from './SearchBox.module.css';
import { changeFilter, selectChangeFilter } from '../../redux/filtersSlice';

const SearchBox = () => {
  const dispatch = useDispatch();
  const value = useSelector(selectChangeFilter);

  const handleChange = e => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={css.serchBox}>
      <p className={css.title}>Find contacts by name</p>
      <input className={css.field} type='text' value={value} onChange={handleChange} />
    </div>
  );
};

export default SearchBox;
