import React, { useEffect, useState } from "react";
import { FlatList, Image, Modal, Text, TouchableOpacity, View } from "react-native";
import { Launch, NewLaunch } from "../../types"
import CreateLaunchView from "../CreateLaunchView";
import LaunchDetailsView from "../LaunchDetailsView";

interface LaunchListProps {
    launches: Launch[];
    launchError: String | undefined;
    getLaunches: () => void;
    addLaunch: (launch: NewLaunch) => void;
}

const LaunchListView = (props: LaunchListProps) => {
    const { launches, launchError, getLaunches, addLaunch } = props;
    const [showCreateLaunchModal, setShowCreateLaunchModal] = useState(false);
    const [showLaunchDetailsModal, setShowLaunchDetailsModal] = useState(false);
    const [chosenLaunch, setChosenLaunch] = useState<Launch>({ launch_image: '', mission_name: '', details: ''});

    useEffect(() => {
        getLaunches();
    }, []);

    const bringUpLaunchDetails = (launch: Launch) => {
        setChosenLaunch(launch);
        setShowLaunchDetailsModal(true);
    }

    const closeLaunchDetails = () => {
        setShowLaunchDetailsModal(false);
    }
    
    const closeCreateLaunch = () => {
        setShowCreateLaunchModal(false);
    }

    const renderLaunchListItem = (launch: Launch) => {
        return (
            <TouchableOpacity onPress={() => bringUpLaunchDetails(launch)}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={{ uri: launch.launch_image }} style={{ width: 70, height: 70, margin: 10 }} />
                    <View style={{ flexDirection: 'column', margin: 10 }}>
                        <Text style={{ marginBottom: 10, color: 'black' }}>{launch.mission_name}</Text>
                        <Text numberOfLines={1} style={{ color: 'black', paddingRight: 10 }}>{launch.details}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <>
            <FlatList
                data={launches}
                renderItem={({ item }) => renderLaunchListItem(item)}
                keyExtractor={item => item.mission_name}
                getItemLayout={(data, index) => ({ length: 90,  offset: 90 * index, index})}
            />
            <TouchableOpacity onPress={() => setShowCreateLaunchModal(true)} style={{ width: 50, height: 50, position: 'absolute', bottom: 5, right: 5 }}>
                <View style={{ backgroundColor: 'black', borderRadius: 25, height: 50 }}>
                    <Text style={{ color: 'white', textAlign: 'center', height: 50,fontSize: 30, includeFontPadding: false, paddingTop: 10 }}>
                        +
                    </Text>
                </View>
            </TouchableOpacity>
            <Modal visible={showLaunchDetailsModal}>
                <LaunchDetailsView selectedLaunch={chosenLaunch} closeView={closeLaunchDetails}/>
            </Modal>
            <Modal visible={showCreateLaunchModal}>
                <CreateLaunchView createLaunch={addLaunch} closeView={closeCreateLaunch}/> 
            </Modal>
        </>
    );
};

export default LaunchListView;