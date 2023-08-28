import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { MediumText, RegularText } from "../../components/StyledText";
import { View } from "../../components/Themed";
import MapNavigation from "./MapNavigation";
import HistoryNavigation from "./HistoryNavigation";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useUserAuthStore } from "../../store/useUserAuthStore";
import { useEffect, useState } from "react";
import ProfileNavigation from "./ProfileNavigation";

const Tab = createBottomTabNavigator<TabStackParamList>();

const TabNavigation = () => {
  const theme = useColorScheme();
  const user = useUserAuthStore((state) => state.user);
  const [userRequests, setUserRequests] = useState<any[]>([]);
  const [requestsCount, setRequestsCount] = useState(0);

  const fetchRequestsByUser = async () => {
    try {
      const q = query(
        collection(db, "requests"),
        where("userId", "==", user?.id)
      );

      const requestsArray: any = [];

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        requestsArray.push(doc.data());
      });

      setUserRequests(requestsArray);
      setRequestsCount(querySnapshot.size);
    } catch (error) {
      console.error("Error fetching user UID:", error);
    }
  };

  useEffect(() => {
    fetchRequestsByUser();
  }, [userRequests, requestsCount]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Colors[theme].background,
        },
      }}
    >
      <Tab.Screen
        name="MapStack"
        component={MapNavigation}
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <View style={{ alignItems: "center" }}>
                <Ionicons name="map-outline" size={size} color={color} />
                <MediumText style={{ fontSize: 12, color: color }}>
                  Map
                </MediumText>
              </View>
            ) : (
              <Ionicons name="map-outline" size={size} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="HistoryStack"
        component={HistoryNavigation}
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <View style={{ alignItems: "center" }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <Ionicons name="time-outline" size={size} color={color} />
                  <View
                    style={{
                      width: 15,
                      height: 15,
                      borderRadius: 20,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "red",
                      position: "absolute",
                      top: -2,
                      left: 16,
                    }}
                  >
                    <RegularText style={{ color: "white", fontSize: 10 }}>
                      {requestsCount}
                    </RegularText>
                  </View>
                </View>
                <MediumText style={{ fontSize: 12, color: color }}>
                  History
                </MediumText>
              </View>
            ) : (
              <View style={{ alignItems: "center" }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <Ionicons name="time-outline" size={size} color={color} />
                  <View
                    style={{
                      width: 15,
                      height: 15,
                      borderRadius: 20,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "red",
                      position: "absolute",
                      top: -2,
                      left: 16,
                    }}
                  >
                    <RegularText style={{ color: "white", fontSize: 10 }}>
                      {requestsCount}
                    </RegularText>
                  </View>
                </View>
                <MediumText style={{ fontSize: 12, color: color }}>
                  History
                </MediumText>
              </View>
            ),
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileNavigation}
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <View style={{ alignItems: "center" }}>
                <Ionicons name="person-outline" size={size} color={color} />
                <MediumText style={{ fontSize: 12, color: color }}>
                  Profile
                </MediumText>
              </View>
            ) : (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
