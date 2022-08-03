import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { FC } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { API_MEDIA_URL } from "../../api";
import Colors from "../../constants/Colors";

export type HomeHistory = {
  id: number;
  imageUrl: string;
  createdAt: string;
  homeName: string;
};

type Props = {
  title?: string;
  histories: HomeHistory[];
};
const HomeHistoryList: FC<Props> = ({ title, histories }) => {
  return (
    <View
      style={{
        alignItems: "center",
      }}
    >
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.list}>
        {histories.map((history) => (
          <HomeHistoryCard history={history} key={history.id} />
        ))}
      </View>
    </View>
  );
};

const HomeHistoryCard: FC<{ history: HomeHistory }> = ({ history }) => {
  const date = new Date(history.createdAt);

  return (
    <View style={styles.history}>
      <Image
        style={styles.personImage}
        source={{
          uri: API_MEDIA_URL + history.imageUrl,
        }}
      />
      <View style={styles.historyInfo}>
        <Text style={styles.personName}>
          {history.homeName.length > 15
            ? history.homeName.slice(0, 15) + "..."
            : history.homeName}
        </Text>
        <View style={styles.historyDate}>
          <FontAwesome name="calendar-o" color={Colors.grayDark} size={16} />
          <View
            style={{
              marginLeft: 6,
            }}
          >
            <Text style={{ color: Colors.grayDark }}>
              {date.toLocaleDateString()}
            </Text>
          </View>
        </View>
        <View style={styles.historyDate}>
          <FontAwesome name="clock-o" color={Colors.grayDark} size={18} />
          <View
            style={{
              marginLeft: 6,
            }}
          >
            <Text style={{ color: Colors.grayDark }}>
              {date.toLocaleTimeString().slice(0, 5)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 12,
    paddingTop: 32,
  },
  list: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
    marginTop: 38,
    marginBottom: 12,
  },
  history: {
    // marginHorizontal: 12,
    // flex: 0.5,
    // flexDirection: "row",
    // alignItems: "center",
    marginBottom: 24,
  },
  personImage: {
    width: 150,
    height: 150,
    borderRadius: 12,
  },
  historyInfo: {
    marginTop: 8,
    marginLeft: 4,
  },
  personName: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 4,
  },
  historyDate: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
});

export default HomeHistoryList;
