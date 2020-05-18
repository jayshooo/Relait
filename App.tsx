import React from 'react';
import { View } from 'react-native';

import AppNavigation from './src/navigation/Navigation';

declare const global: { HermesInternal: null | {}; };

const App = () => {

    return (
        <View
            style={ { flex: 1 } }>
            <AppNavigation />
        </View>
    );

};

export default App;
