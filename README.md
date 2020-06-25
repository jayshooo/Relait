### Relait iOS 개발환경 셋팅
1. node와 watchman을 설치한다. (전역)
    > brew install node\
    > brew install watchman
2. 코코아팟을 설치한다. (전역)
    > sudo gem install cocoapods
3. react-native-cli 를 설치한다. (전역)
    > npm install -g react-native-cli
4. npm package 의존성 모듈을 설치한다. (로컬)
    > Relait > npm install
5. iOS 의존성 패키지를 설치한다. (로컬)
    > cd ios && pod install
6. xCode 를 실행한 후 Preferences => Location 탭에서 `Command Line Tools` 드롭다운 리스트에서 가장 최신 버전을 선택한다.
6. 실행한다. 
    > Relait > npm run ios
