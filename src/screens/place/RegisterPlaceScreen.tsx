import React, { memo, useCallback, useState } from "react";
import { SafeAreaView, View, Text, Image } from "react-native";
import { Header } from "../../components/Header";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { TextSize, Color, FontWeight } from "../../constants/styles";
import { InputBox } from "../../components/forms/InputBox";
import { Button } from "../../components/forms/Button";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { PickerButton } from "../../components/forms/PickerButton";
import { CheckboxButtonInterface, PickerEnum, RegisterTimeType, SectionHeaderInterface } from "../types/RegisterPlaceScreen";

const SectionHeader = memo<SectionHeaderInterface>(({ title }) => {
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
				} }>
				{title}
			</Text>
		</View>
	);
});

const CheckboxButton = memo<CheckboxButtonInterface>(({
	title,
	isChecked,
	onPress,
}) => {
	// TODO. 아이콘 작업 해야함
	const source = isChecked ? require("../../resources/icons/Unchecked.png") : require("../../resources/icons/Unchecked.png");

	return (
		<TouchableOpacity
			style={ {
				flexDirection: "row",
				alignItems: "center",
			} }
			onPress={ () => {
				if (!onPress) {
					return;
				}
				onPress();
			} }>
			<Image
				style={ {
					marginRight: 8,
				} }
				source={ source }
			/>
			<Text
				style={ {
					fontSize: TextSize.h5,
				} }>
				{title}
			</Text>
		</TouchableOpacity>
	);
});

export const RegisterPlaceScreen = memo(() => {

	const navigation = useNavigation();
	const [hasPlug, setHasPlug] = useState(false);
	const [showPicker, setShowPicker] = useState(false);
    const [currentPickerCursor, setCurrentPickerCursor] = useState(PickerEnum.close);
    const [times, setTimes] = useState<RegisterTimeType>({
        [ PickerEnum.open ]: {
            epoch: 0,
            time: "",
        },
        [ PickerEnum.close ]: {
            epoch: 0,
            time: "",
        },
        [ PickerEnum.closePlace ]: {
            epoch: 0,
            time: "",
        },
    });

	const goBack = useCallback(() => {
		navigation.goBack();
	}, [navigation]);

	const togglePicker = useCallback((type?: PickerEnum) => {
		setShowPicker((prev) => !prev);
		if (!type) {
			return;
		}
		setCurrentPickerCursor(type);
	}, []);

	const convertEpochTime = useCallback((date: Date) => {
        const timeObj = {
            epoch: moment(date).valueOf(),
            time: moment(date).format("HH:mm"),
        };
        setTimes((prev: RegisterTimeType) => {
            return {
                ...prev,
                [ currentPickerCursor ]: timeObj,
            };
        });
        togglePicker();
    }, [currentPickerCursor, togglePicker]);

	const onPress = () => {
		console.log("====================================");
		console.log("버튼 클릭!");
		console.log("====================================");
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
					title={ "자리 올리기" }
					onPress={ goBack } />
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
						} }>
						{"테이커가 예약 시 참고할 수 있도록\n작업 중인 자리에 대한 정보를 입력해줘."}
					</Text>
				</View>
				<View
					style={ {
						paddingHorizontal: 24,
						marginTop: 40,
					} }>
					<SectionHeader
						title={ "작업 중인 자리" } />
					<View
						style={ {
							flexDirection: "row",
							marginBottom: 8,
						} }>
						<Text
							style={ {
								fontSize: TextSize.h5,
								fontWeight: FontWeight.bold,
							} }>
							운영 시간
						</Text>
						<Text
							style={ {
								fontSize: TextSize.h5,
							} }>
							(선택)
						</Text>
					</View>
					<View
						style={ {
							flexDirection: "row",
							marginBottom: 32,
						} }>
						<PickerButton
							onPress={ () => {
								togglePicker(PickerEnum.open);
                            } }
							label="오픈"
							placeholder={ "ex. 10:00" }
							value={ times[ PickerEnum.open ].time }
							containerStyle={ {
								marginRight: 8,
							} }
						/>
						<PickerButton
							onPress={ () => {
								togglePicker(PickerEnum.close);
							} }
							placeholder={ "ex. 21:00" }
							label="마감"
							value={ times[ PickerEnum.close ].time }
						/>
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
							} }>
							콘센트 유무
						</Text>
						<Text
							style={ {
								fontSize: TextSize.h5,
								color: Color.darkGray,
							} }>
							* 근처에 이용 가능한 콘센트가 있다면 표시해줘
						</Text>
					</View>
					<CheckboxButton
						title={ "응, 있어" }
						isChecked={ hasPlug }
						onPress={ () => {
							setHasPlug((prev) => !prev);
						} }
					/>
					<View
						style={ {
							marginTop: 40,
						} }>
						<SectionHeader
							title={ "기버 정보" } />
						<PickerButton
							onPress={ () => {
								togglePicker(PickerEnum.closePlace);
							} }
							label="작업 종료 시간"
							placeholder={ "ex. 10:00" }
							value={ times[ PickerEnum.closePlace ].time }
							containerStyle={ {
								marginBottom: 24,
							} }
							isBold={ true }
						/>
						<InputBox
							label={ "자리 설명" }
							placeholder={ "자리 위치, 좌석 가능 인원 수 등 자리에 대한 자세한 설명을 적어줘!" }
							isBold={ true }
							multiline={ true }
							containerStyle={ {
								marginBottom: 24,
							} }
							inputStyle={ {
								height: 96,
							} }
						/>
						<InputBox
							label={ "식별 안내" }
							placeholder={ "오늘 입은 옷, 사용 중인 제품 등 널 알아볼 수 있는 정보를 적어줘!" }
							isBold={ true }
							multiline={ true }
							containerStyle={ {
								marginBottom: 40,
							} }
							inputStyle={ {
								height: 96,
							} }
						/>
					</View>
					<Button
						onPress={ onPress }
						label={ "올리기" } />
				</View>
			</ScrollView>
			<DateTimePickerModal
				isVisible={ showPicker }
				mode="time"
				cancelTextIOS={ "취소" }
				confirmTextIOS={ "확인" }
				headerTextIOS={ "시간을 선택하세요" }
				onConfirm={ convertEpochTime }
				onCancel={ () => {
					togglePicker();
				} }
			/>
		</SafeAreaView>
	);
});
