import React, { useCallback, useState } from 'react';
import { SafeAreaView, View, Text, Image } from 'react-native';
import { Header } from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { TextSize, Color, FontWeight } from '../../constants/styles';
import { InputBox } from '../../components/forms/InputBox';
import { Button } from '../../components/forms/Button';

const SectionHeader: React.FC<{ title: string; }> = ({ title }) => {
    return (
        <View
            style={ {
                borderBottomWidth: 1,
                borderBottomColor: Color.powderBlue,
                marginBottom: 24,
            } }>
            <Text
                style={ {
                    marginBottom: 8,
                    fontSize: TextSize.h4,
                    color: Color.darkTwo,
                } }>{ title }</Text>
        </View>
    );
};

const CheckboxButton: React.FC<{ title: string; isChecked: boolean; onPress: () => void; }> = ({ title, isChecked, onPress }) => {
    // TODO. 아이콘 작업 해야함
    // const source = isChecked ? require('../')

    return (
        <TouchableOpacity
            style={ {
                flexDirection: 'row',
                alignItems: 'center',
            } }
            onPress={ () => {
                if (!onPress) return;
                onPress();
            } }>
            <View style={ {
                width: 28,
                height: 28,
                backgroundColor: Color.purplishBlue,
                borderRadius: 50,
                marginRight: 8,
            } } />
            <Text
                style={ {
                    fontSize: TextSize.h5,
                } }>{ title }</Text>
        </TouchableOpacity>
    );
};

export const RegisterPlaceScreen: React.FC = () => {

    const [ hasPlug, setHasPlug ] = useState(false);

    const navigation = useNavigation();
    const goBack = useCallback(() => {
        navigation.goBack();
    }, []);

    const onPress = () => {
        console.log('====================================');
        console.log('버튼 클릭!');
        console.log('====================================');
    };

    return (
        <SafeAreaView
            style={ {
                flex: 1,
                backgroundColor: Color.white,
            } }>
            <ScrollView
                style={ {
                    flex: 1,
                } }>
                <Header
                    title={ '자리 올리기' }
                    onPress={ goBack }></Header>
                <View
                    style={ {
                        padding: 24,
                        backgroundColor: Color.grayLighter,
                    } }>
                    <Text
                        style={ {
                            fontSize: TextSize.h5,
                            lineHeight: 20,
                            color: Color.darkTwo,
                        } }>{ `테이커가 예약 시 참고할 수 있도록\n작업 중인 자리에 대한 정보를 입력해줘.` }</Text>
                </View>
                <View
                    style={ {
                        paddingHorizontal: 24,
                        marginTop: 40,
                    } }>
                    <SectionHeader title={ '작업 중인 자리' } />
                    <View
                        style={ {
                            flexDirection: 'row',
                            marginBottom: 8,
                        } }>
                        <Text
                            style={ {
                                fontSize: TextSize.h5,
                                fontWeight: FontWeight.bold,
                            } }>운영 시간</Text>
                        <Text
                            style={ {
                                fontSize: TextSize.h5,
                            } }>(선택)</Text>
                    </View>
                    <View
                        style={ {
                            flexDirection: 'row',
                            marginBottom: 32,
                        } }>
                        <InputBox
                            label={ '오픈' }
                            placeholder={ 'ex. 10:00' }
                            containerStyle={ {
                                marginRight: 8,
                            } } />
                        <InputBox
                            label={ '마감' }
                            placeholder={ 'ex. 21:00' } />
                    </View>
                    <View
                        style={ {
                            marginBottom: 8,
                        } }>
                        <Text
                            style={ {
                                fontSize: TextSize.h5,
                                fontWeight: FontWeight.bold,
                                marginBottom: 4,
                            } }>콘센트 유무</Text>
                        <Text
                            style={ {
                                fontSize: TextSize.h5,
                                color: Color.darkGray,
                            } }>* 근처에 이용 가능한 콘센트가 있다면 표시해줘</Text>
                    </View>
                    <CheckboxButton title={ '응, 있어' } isChecked={ hasPlug } onPress={ () => {
                        setHasPlug(prev => !prev);
                    } } />
                    <View
                        style={ {
                            marginTop: 40,
                        } }>
                        <SectionHeader title={ '기버 정보' } />
                        <InputBox
                            label={ '작업 종료 시간' }
                            placeholder={ 'ex. 10:00' }
                            isBold={ true }
                            containerStyle={ {
                                marginBottom: 24,
                            } } />
                        <InputBox
                            label={ '자리 설명' }
                            placeholder={ '자리 위치, 좌석 가능 인원 수 등 자리에 대한 자세한 설명을 적어줘!' }
                            isBold={ true }
                            multiline={ true }
                            containerStyle={ {
                                marginBottom: 24,
                            } }
                            inputStyle={ {
                                height: 96,
                            } } />
                        <InputBox
                            label={ '식별 안내' }
                            placeholder={ '오늘 입은 옷, 사용 중인 제품 등 널 알아볼 수 있는 정보를 적어줘!' }
                            isBold={ true }
                            multiline={ true }
                            containerStyle={ {
                                marginBottom: 40,
                            } }
                            inputStyle={ {
                                height: 96,
                            } } />
                    </View>
                    <Button
                        onPress={ onPress }
                        label={ '올리기' } />
                </View>
            </ScrollView>
        </SafeAreaView >
    );
};