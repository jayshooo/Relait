import React from 'react';
import { Modal, View, Text, SafeAreaView, StyleProp, TextStyle, Image, ColorPropType } from 'react-native';
import { IRequestPermissionModal } from './types/RequestPermissionModal';
import CommonButton from '../components/CommonButton';
import { Color, TextWeight, TextSize } from '../constants/styles';

const permissionItems = [
    {
        title: '알림',
        icon: require('../resources/icons/Noti.png'),
        purpose: '자리 예약 확인, 취소 알림 등',
    },
    {
        title: '위치',
        icon: require('../resources/icons/Location.png'),
        purpose: '내 주변 이용 가능한 카페 정보 표시',
    },
];

const RequestPermissionModal: React.FC<IRequestPermissionModal> = ({ visible, onRequestClose }) => {

    return (
        <Modal
            visible={ visible }
            animationType={ 'fade' }>
            <SafeAreaView
                style={ {
                    flex: 1,
                } }>
                <View
                    style={ { paddingHorizontal: 26, flex: 1, justifyContent: 'flex-start', } }>
                    <View
                        style={ {
                            marginTop: 76,
                        } }>
                        <Text
                            style={ {
                                fontSize: TextSize.h1,
                            } }>우리 이젠,</Text>
                        <Text
                            style={ {
                                fontSize: TextSize.h1,
                                fontWeight: TextWeight.bold,
                            } as StyleProp<TextStyle> }>더이상 자리찾아{ '\n' }헤매지 말자.</Text>
                    </View>
                    <View
                        style={ {
                            borderWidth: .5,
                            marginVertical: 40,
                            borderColor: Color.gray,
                        } }></View>
                    { permissionItems.map((item, index) => {
                        const isLast = index === permissionItems.length - 1;
                        return (
                            <View
                                style={ {
                                    flexDirection: 'row',
                                    marginBottom: isLast ? 0 : 16,
                                } }>
                                <Image source={ item.icon }></Image>
                                <View
                                    style={ {
                                        marginLeft: 12,
                                    } }>
                                    <Text
                                        style={ {
                                            marginBottom: 4,
                                        } }>{ item.title }</Text>
                                    <Text>{ item.purpose }</Text>
                                </View>
                            </View>
                        );
                    }) }
                    <Text
                        style={ {
                            marginTop: 40,
                            fontSize: TextSize.h5,
                            color: Color.darkGray,
                        } }>릴레잇 서비스를 잘 이용하기 위해{ '\n' }필요한 접근 권한을 꼭 확인해줘.</Text>
                </View>
            </SafeAreaView>
            <CommonButton
                hasShadow={ true }
                buttonTitle={ '확인' }
                onPressCallback={ () => {
                    console.log('====================================');
                    console.log('확인');
                    console.log('====================================');
                    onRequestClose();
                } }
                textColor={ Color.white }
                textWeight={ TextWeight.bold }
                buttonColor={ Color.purplishBlue } />
        </Modal>
    );
};

export default RequestPermissionModal;