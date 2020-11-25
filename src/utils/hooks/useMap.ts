import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";

export function useMap () {
	const { map } = useSelector((state: RootState) => state.ui);

	return {
		map,
	};
}
