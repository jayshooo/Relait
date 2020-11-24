import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
import { ISeat } from "../../store/reducers/seats/types";

export function useSelectedSeat (): {
    selectedSeat: ISeat | null;
    } {
	const { selectedSeat } = useSelector((state: RootState) => state.seats);
	return {
		selectedSeat,
	};
}
