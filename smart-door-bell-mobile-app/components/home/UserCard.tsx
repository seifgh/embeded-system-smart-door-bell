import { FC } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { API_MEDIA_URL } from "../../api";
import Colors from "../../constants/Colors";
import { useStore } from "../../store/StoreContext";

const UserCard: FC = () => {
  const {
    state: {
      user: { data },
    },
  } = useStore();
  return (
    <View
      style={{
        alignItems: "center",
      }}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Hello, {data.fullName}!</Text>
        <View style={styles.imageCont}>
          <Image
            source={{
              uri: API_MEDIA_URL + data.imageUrl,
            }}
            style={styles.userImage}
          />
        </View>
      </View>
      <View style={styles.separator} />
      <Text style={styles.info}>3 persons came to your homes today</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 18,
  },
  separator: {
    marginBottom: 8,
    height: 1,
    width: "80%",
    backgroundColor: Colors.grayLight,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  userImage: {
    width: 46,
    height: 46,
    borderRadius: 46,
  },
  imageCont: {
    borderRadius: 46,
    borderWidth: 3,
    borderColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 0.5,
    elevation: 1,
  },
  info: {
    color: Colors.desc,
    fontWeight: "bold",
    fontSize: 14,
  },
});
export default UserCard;
