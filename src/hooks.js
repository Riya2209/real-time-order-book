import { useDispatch, useSelector } from 'react-redux';
import Store from './components/store'

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
