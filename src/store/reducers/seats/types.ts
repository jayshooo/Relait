export interface ISeat {
    id: number;
    giverId: number;
    leaveAt: string;
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
    descriptionCloseTime: string;
    takerId: number;
    takenAt: string;
}

export interface ISeatsInitialState {
    seats: ISeat[] | null;
}