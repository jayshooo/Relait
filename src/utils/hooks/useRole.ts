import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";

export function useRole () {
	const { mySeat } = useSelector((state: RootState) => state.seats);
	const { myInfo } = useSelector((state: RootState) => state.myInfo);

	return {
		isTaker: myInfo?.id === mySeat?.takerId,
		isGiver: myInfo?.id === mySeat?.giverId,
	};

}
