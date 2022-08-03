import { StatusBar } from "expo-status-bar";
import { FC, useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import { apiGetHistories, API_HOST, _authToken } from "../api";
import UserCard from "../components/home/UserCard";
import HomeHistoryList, {
  HomeHistory,
} from "../components/shared/HomeHistoryList";
import Notification from "../components/shared/Notification";
import Colors from "../constants/Colors";
import { RootTabScreenProps } from "../types";

const HomeScreen: FC<RootTabScreenProps<"Home">> = ({ navigation }) => {
  const [histories, setHistories] = useState<HomeHistory[]>([]);

  const [refreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    apiGetHistories().then((histories) => {
      setHistories(histories);
    });
  }, [navigation]);

  return (
    <>
      <Notification />
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setIsRefreshing(true);
              apiGetHistories()
                .then((histories) => {
                  setHistories(histories);
                })
                .finally(() => {
                  setIsRefreshing(false);
                });
            }}
          />
        }
      >
        <UserCard />
        <StatusBar animated style="dark" />
        <HomeHistoryList histories={histories} title={"Latest persons"} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 12,
    paddingTop: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

export default HomeScreen;
