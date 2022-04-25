import React from 'react';
import { Text, Dimensions, TouchableOpacity, View, ImageBackground, ScrollView } from 'react-native';
import { Launch } from '../../types'

interface LaunchDetailsViewProps {
    selectedLaunch: Launch | undefined;
    closeView: () => void;
}

const LaunchDetailsView = (props: LaunchDetailsViewProps) => {
    const { selectedLaunch, closeView } = props;
    const { width } = Dimensions.get('window')
    return (
        <>
            {!!selectedLaunch && 
                <>
                    <ScrollView>
                        <ImageBackground source={{ uri: selectedLaunch?.launch_image}} style={{ width: width - 20, height: width - 20, margin: 10}}>
                            <View style={{ position: 'absolute', bottom: 0, right: 20, backgroundColor: 'white', borderRadius: 20 }}>
                                <Text style={{ textAlign: 'right', fontSize: 30, margin: 10, color: 'black' }}>{selectedLaunch.mission_name}</Text>
                            </View>
                        </ImageBackground>
                        <Text style={{ color: 'black', margin: 10, lineHeight: 30, fontSize: 20 }}>{selectedLaunch.details}</Text>
                    </ScrollView>
                    <TouchableOpacity style={{ position: 'absolute', bottom: 10, backgroundColor: 'white'}} onPress={closeView}>
                        <Text style={{ fontSize: 16, color: 'black', margin: 10 }}> {'< Back'}</Text>
                    </TouchableOpacity>
                </>
            }     
        </>
    )
};

export default LaunchDetailsView;