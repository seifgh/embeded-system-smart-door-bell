import { API_HOST, API_MEDIA_URL, _authToken } from "../../api";
import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { Image, StyleSheet, Text, View } from "react-native";
import Button from "../utilities/Button";
import { connectToWebSocket, socket } from "../../api/socketIo";

type NotificationData = {
  homeName: string;
  imageUrl: string;
  raspberry_pi_cart_key: string;
};

const Notification = () => {
  const refRBSheet = useRef<RBSheet>();
  const [notificationData, setNotificationData] = useState<NotificationData>({
    homeName: "",
    imageUrl: "",
    raspberry_pi_cart_key: "",
  });

  const openTheDoor = () => {
    socket.emit("open-door", notificationData.raspberry_pi_cart_key);
    refRBSheet?.current?.close();
  };

  useEffect(() => {
    // refRBSheet?.current?.open();
    connectToWebSocket();
    socket.removeEventListener("open-door-client-app-notify");
    socket.on("open-door-client-app-notify", (data: NotificationData) => {
      if (data) {
        setNotificationData(data);
        refRBSheet?.current?.open();
      }
    });
  }, []);

  return (
    <>
      <RBSheet
        ref={refRBSheet as React.LegacyRef<RBSheet>}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          container: {
            height: 500,
            alignContent: "center",
            borderTopEndRadius: 12,
            borderTopStartRadius: 12,
          },
        }}
      >
        <View style={styles.container}>
          <Text style={styles.title}>{notificationData.homeName}</Text>
          <Image
            source={{
              uri: `${API_MEDIA_URL}${notificationData.imageUrl}`,
            }}
            style={styles.image}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 24,
            }}
          >
            <Button
              onPress={() => openTheDoor()}
              style={{ marginRight: 24 }}
              size="lg"
            >
              Open
            </Button>
            <Button
              onPress={() => refRBSheet?.current?.close()}
              type="dg"
              size="lg"
            >
              Reject
            </Button>
          </View>
        </View>
      </RBSheet>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 24,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 12,
  },
});

export default Notification;
