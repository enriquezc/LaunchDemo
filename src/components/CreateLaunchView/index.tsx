import React, { useState } from 'react';
import { Dimensions, ImageBackground, Text, TextInput, TouchableOpacity } from 'react-native';
import Dialog from "react-native-dialog";
import { CameraOptions, ImageLibraryOptions, ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { NewLaunch, PhotoForm } from '../../types'

interface CreateLaunchViewProps {
    createLaunch: (launch: NewLaunch) => void;
    closeView: () => void;
}

const CreateLaunchView = (props: CreateLaunchViewProps) => {
    const { width } = Dimensions.get('window');
    const { createLaunch, closeView } = props;
    const [showLaunchPhotoDialog, setShowLaunchPhotoDialog] = useState(false);
    const [missionName, setMissionName] = useState('');
    const [details, setDetails] = useState('');
    const [photoForm, setPhotoForm] = useState<PhotoForm>({uri: '', type: '', name: ''});


    const cancelAddLaunchPhoto = () => {
        setShowLaunchPhotoDialog(false);
    }

    const takeLaunchPhoto = () => {
        const options: CameraOptions = {
            mediaType: 'photo',
        }
        launchCamera(options, photoSubmitted);
    }

    const chooseLaunchPhotoFromRoll = () => {
        const options: ImageLibraryOptions = {
            mediaType: 'photo'
        };
        launchImageLibrary(options, photoSubmitted);
    }

    const photoSubmitted = (response: ImagePickerResponse) => {
        // we should only get one photo, so no need to check any other photos
        if (response.assets) {
            setPhotoForm({ 
                uri: response.assets[0].uri ?? '',
                type: response.assets[0].type ?? '', 
                name: response.assets[0].fileName ?? '',
            });
        }
    }

    const submitLaunch = () => {
        // collect text from text inputs and the image in the image view
        const newLaunch: NewLaunch = {
            mission_name: missionName,
            details: details,
            form: photoForm,
        }

        createLaunch(newLaunch);
    }
    return (
            <>
                <TouchableOpacity onPress={closeView}>
                    <Text>Back</Text>
                </TouchableOpacity>
                <ImageBackground source={{ uri: photoForm.uri, width: width * 0.75, height: width * 0.75}}>
                    <TouchableOpacity onPress={() => setShowLaunchPhotoDialog(true)}>
                        <Text>
                            Edit
                        </Text>
                    </TouchableOpacity>
                </ImageBackground>
                <Text>Mission Name</Text>
                <TextInput
                    style={{ borderColor: 'gray', borderWidth: 2}}
                    onChange={( event ) => setMissionName(event.nativeEvent.text)}
                />
                <Text>Mission Details</Text>
                <TextInput
                    style={{ borderColor: 'gray', borderWidth: 2}}
                    onChange={( event ) => setDetails(event.nativeEvent.text)}
                />
                <TouchableOpacity onPress={submitLaunch}>
                    <Text>Submit</Text>
                </TouchableOpacity>
                <Dialog.Container visible={showLaunchPhotoDialog}>
                    <Dialog.Title>
                        Add a Launch Photo
                    </Dialog.Title>
                    <Dialog.Description>
                        Choose how you would like to add a launch photo.
                    </Dialog.Description>
                    <Dialog.Button label="Cancel" onPress={cancelAddLaunchPhoto}/>
                    <Dialog.Button label="Take Photo" onPress={takeLaunchPhoto}/>
                    <Dialog.Button label="Camera Roll" onPress={chooseLaunchPhotoFromRoll}/>
                </Dialog.Container>
            </>
    )
};

export default CreateLaunchView;