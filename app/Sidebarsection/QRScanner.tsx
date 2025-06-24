import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import * as ExpoCameraModule from 'expo-camera';

export default function QRScanner() {
    const [hasPermission, setHasPermission] = ExpoCameraModule.useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [flash, setFlash] = useState<'off' | 'torch'>('off');
    const cameraRef = useRef<ExpoCameraModule.Camera>(null);
    const toggleFlash = () => {
        setFlash(prev => (prev === 'off' ? 'torch' : 'off'));
    };
    const handleBarcodeScanned = async ({ data }: { data: string }) => {
        if (scanned) return;
        setScanned(true);

        try {
            const docRef = doc(db, 'event_registrations', data);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                Alert.alert('Invalid QR', 'No matching registration found.');
                return;
            }

            const user = docSnap.data();

            if (user.scanned) {
                Alert.alert('Already Verified', `${user.name} is already marked as arrived.`);
            } else {
                await updateDoc(docRef, {
                    scanned: true,
                    personStatus: 'arrived',
                });
                Alert.alert('Success', `${user.name} marked as arrived.`);
            }
        } catch (error) {
            console.error('Error verifying QR:', error);
            Alert.alert('Error', 'Something went wrong during verification.');
        } finally {
            setTimeout(() => setScanned(false), 2500);
        }
    };

    if (hasPermission === null) return <Text>Requesting camera permission...</Text>;
    if (!hasPermission.granted) return <Text>No access to camera</Text>;
    return (
        <View style={styles.container}>
            <ExpoCameraModule.Camera
                ref={cameraRef}
                style={StyleSheet.absoluteFill}
                type={ExpoCameraModule.CameraType.back}
                flashMode={flash === 'torch' ? ExpoCameraModule.FlashMode.torch : ExpoCameraModule.FlashMode.off}
                onBarCodeScanned={scanned ? undefined : handleBarcodeScanned}
                barCodeScannerSettings={{ barCodeTypes: ['qr'] }}
            >
                <View style={styles.scanBox}>
                    <Text style={styles.scanText}>Scan QR Code</Text>
                </View>

                <TouchableOpacity onPress={toggleFlash} style={styles.flashToggle}>
                    <Ionicons
                        name={flash === 'torch' ? 'flash' : 'flash-off'}
                        size={28}
                        color={flash === 'torch' ? 'yellow' : 'gray'}
                    />
                </TouchableOpacity>
            </ExpoCameraModule.Camera>
        </View>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1 },
    scanBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scanText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: '#000000aa',
        padding: 10,
        borderRadius: 8,
    },
    flashToggle: {
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center',
        backgroundColor: '#00000088',
        padding: 12,
        borderRadius: 30,
    },
});