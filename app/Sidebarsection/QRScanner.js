import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase"; // ✅ adjust path if needed

const QRScanner = () => {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to access the camera</Text>
        <Button title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  }

const handleScan = async ({ data }) => {
  let docId;

  try {
    const parsed = JSON.parse(data);
    docId = parsed.id;
  } catch (err) {
    Alert.alert("Invalid QR", "Scanned data is not a valid QR code.");
    return;
  }

  if (scanned) return;
  setScanned(true);

  try {
    const docRef = doc(db, "event_registrations", docId); // ✅ use extracted ID
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      Alert.alert("Invalid QR", "No matching registration found.");
    } else {
      const user = docSnap.data();
      if (user.scanned) {
        Alert.alert("Already Verified", `${user.name} already marked as arrived.`);
      } else {
        await updateDoc(docRef, {
          scanned: true,
          personStatus: "arrived",
        });
        Alert.alert("Success", `${user.name} marked as arrived.`);
      }
    }
  } catch (error) {
    console.error("QR Verification Error:", error);
    Alert.alert("Error", "Something went wrong while verifying QR.");
  }

  setTimeout(() => setScanned(false), 3000); // Allow next scan after 3s
};


  const toggleCameraFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        onBarcodeScanned={handleScan}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"], // Only QR codes
        }}
      >
        <View style={styles.overlay}>
          <View style={styles.scanArea} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.buttonText}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  message: { textAlign: "center", marginTop: 20 },
  camera: { flex: 1 },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scanArea: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
  },
});

export default QRScanner;
