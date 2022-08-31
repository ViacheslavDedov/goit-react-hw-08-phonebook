import { useDispatch } from 'react-redux';
import { changeFilter } from 'redux/actions';
import { FilterInput } from './Filter.styled';

const Filter = () => {  
  
  const dispatch = useDispatch();
  const onChange = evt => {
    dispatch(changeFilter(evt.currentTarget.value));
  };

  return (
    <>
      Find contacts by name <FilterInput type="text" onChange={onChange} />
    </>
  )
}

export default Filter;