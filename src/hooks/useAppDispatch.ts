import { useDispatch } from 'react-redux';
import type { TAppDispatch } from '@utils/types';

export const useAppDispatch: () => TAppDispatch = useDispatch;
