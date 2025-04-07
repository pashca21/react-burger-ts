import { useSelector } from 'react-redux';

type RootState = ReturnType<typeof useSelector>;

export const useAppSelector = useSelector.withTypes<RootState>();
