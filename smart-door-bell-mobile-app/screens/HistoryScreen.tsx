import { useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { apiGetHistories } from "../api";
import HomeHistoryList, {
  HomeHistory,
} from "../components/shared/HomeHistoryList";
import Notification from "../components/shared/Notification";

const HistoryScreen = () => {
  const [histories, setHistories] = useState<HomeHistory[]>([]);
  const [refreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    apiGetHistories(true).then((histories) => {
      setHistories(histories);
    });
  }, []);
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
              apiGetHistories(true)
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
        <HomeHistoryList histories={histories} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
});

export default HistoryScreen;
