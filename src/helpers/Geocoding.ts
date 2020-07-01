import { httpClient } from '../constants/api';
import Config from 'react-native-config';
import { TGetReverseGeocoding } from './types';

export const getReverseGeocoding: TGetReverseGeocoding = async ({ lat = 0, lng = 0 }): Promise<string> => {

    try {
        const response = await httpClient().get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`, {
            headers: {
                Authorization: `KakaoAK ${Config.KAKAO_REST_API_KEY}`,
            }
        });

        const { status, data } = response;
        const unknownAddress = '알 수 없는 위치';

        if (status !== 200) {
            return unknownAddress;
        }

        const { documents } = data;
        const result = documents[ 0 ];

        if (!result) {
            return unknownAddress;
        }

        let rawAddress = result.address;

        if (!!result.road_address) {
            rawAddress = result.road_address;
        }

        const addressAry = rawAddress.address_name.split(' ');

        return `${addressAry[ 0 ]} ${addressAry[ 1 ]} ${addressAry[ 2 ]}`;
    }
    catch (e) {
        throw new Error(e);
    }

};