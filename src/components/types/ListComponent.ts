import { ISeat } from '../../store/reducers/seats/types';

export interface IPlugView {
    hasPlug: boolean;
}

export interface IListComponent extends Partial<ISeat> {
    onPressItem: () => void;
}