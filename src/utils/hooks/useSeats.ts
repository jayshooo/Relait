import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";

export function useSeats () {
	const { seats } = useSelector((state: RootState) => state.seats);
	return { seats };
}
