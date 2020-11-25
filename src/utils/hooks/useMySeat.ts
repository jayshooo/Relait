import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";

export function useMySeat () {
	const { mySeat } = useSelector((state: RootState) => state.seats);

	return {
		mySeat,
	};

}
