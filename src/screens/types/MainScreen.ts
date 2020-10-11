export interface IHeaderView {
    goBack: () => void;
    makeSpot: boolean;
    currentAddress: string;
    goToReservationScreen: () => void;
    findMyLocation: () => void;
}