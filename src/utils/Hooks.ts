import { useSelector } from 'react-redux';
import { RootState } from '../store/reducers';
import { ISeat } from '../store/reducers/seats/types';

export const useSeats = (): ISeat[] | null => {
    const { seats } = useSelector((state: RootState) => state.seats);
    return seats;
};