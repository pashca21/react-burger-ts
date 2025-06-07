import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { TRootState } from '@utils/types';
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
