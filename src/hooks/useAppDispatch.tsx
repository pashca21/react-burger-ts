import { useDispatch } from 'react-redux';

type AppDispatch = ReturnType<typeof useDispatch>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
