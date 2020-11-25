export interface ISeat {
    id: number;
    giverId: number;
    leaveAt: number;
    descriptionGiver: string;
    seatStatus: number;
    cafeName: string;
    spaceKakaoMapId: number;
    address: string;
    lat: number;
    lng: number;
    havePlug: number;
    thumbnailUrl: string;
    descriptionSeat: string;
    descriptionCloseTime: number;
    takerId: number;
    takenAt: number;
}

export interface ISeatsInitialState {
    seats: ISeat[] | null;
    selectedSeat: ISeat | null;
    mySeat: ISeat | null;
}
