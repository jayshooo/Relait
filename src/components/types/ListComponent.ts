import { ISeat } from '../../store/reducers/seats/types';

export interface IPlugView {
    hasPlug: boolean;
}

export interface IListComponent {
    cafeName: ISeat[ 'cafeName' ];
    leaveAt: ISeat[ 'leaveAt' ];
    thumbnailUrl: ISeat[ 'thumbnailUrl' ];
    havePlug: ISeat[ 'havePlug' ];
}