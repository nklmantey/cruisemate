import { useState } from "react";
import { TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { Row } from "../../components/Row";
import { BoldText, RegularText } from "../../components/StyledText";
import { View } from "../../components/Themed";
import useColorScheme from "../../hooks/useColorScheme";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useSupplierAuthStore } from "../../store/useSupplierAuthStore";

const SupplierProfile = () => {
  const theme = useColorScheme();
  const { navigate }: NavigationProp<ProfileStackParamList> = useNavigation();

  const supplier = useSupplierAuthStore((state) => state.supplier);
  const setSupplier = useSupplierAuthStore((state) => state.setSupplier);
  const setIsSupplierLoggedIn = useSupplierAuthStore(
    (state) => state.setIsSupplierLoggedIn
  );

  console.log(supplier);

  const [loading, setLoading] = useState<boolean>(false);

  const handleLogout = async () => {
    setLoading(true);

    try {
      await signOut(auth);
      setSupplier({
        id: "",
        email: "",
        shopName: "",
        number: "",
        shopLocation: {
          lat: 0,
          lng: 0,
        },
      });

      setIsSupplierLoggedIn(false);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 8,
        backgroundColor: Colors[theme].background,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 15,
          marginBottom: 16,
        }}
      >
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: Colors[theme].grayLight,
          }}
        >
          <Ionicons name="person" color={Colors[theme].gray} size={20} />
        </View>

        <View>
          <BoldText style={{ fontSize: 18 }}>{supplier?.shopName}</BoldText>
          <RegularText>{supplier?.email}</RegularText>
        </View>
      </View>

      <View style={{ flex: 1, paddingHorizontal: 8 }}>
        <BoldText style={{ color: Colors[theme].text }}>
          GENERAL SETTINGS
        </BoldText>
        <TouchableOpacity onPress={() => {}}>
          <Row
            style={{
              marginTop: 10,
              alignItems: "center",
              paddingBottom: 10,
            }}
          >
            <View
              style={{
                height: 30,
                width: 30,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 8,
                backgroundColor: "#eb2150",
              }}
            >
              <Ionicons size={17} name="notifications" color={"white"} />
            </View>
            <View style={{ paddingHorizontal: 10, flex: 1 }}>
              <BoldText style={{ fontSize: 16 }}>Notifications</BoldText>
              <RegularText style={{ fontSize: 12, color: Colors[theme].text }}>
                When would you like to be notified
              </RegularText>
            </View>
            <Ionicons color={Colors[theme].text} name="chevron-forward" />
          </Row>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Row
            style={{
              marginTop: 10,
              alignItems: "center",
              paddingBottom: 10,
            }}
          >
            <View
              style={{
                height: 30,
                width: 30,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 8,
                backgroundColor: "#992992",
              }}
            >
              <Ionicons size={17} name="documents" color={"white"} />
            </View>
            <View style={{ paddingHorizontal: 10, flex: 1 }}>
              <BoldText style={{ fontSize: 16 }}>Privacy</BoldText>
              <RegularText style={{ fontSize: 12, color: Colors[theme].text }}>
                Legal information, etc
              </RegularText>
            </View>
            <Ionicons color={Colors[theme].text} name="chevron-forward" />
          </Row>
        </TouchableOpacity>

        <BoldText style={{ color: Colors[theme].text, marginTop: 20 }}>
          MISCELLANEOUS
        </BoldText>
        <Row
          style={{
            marginTop: 10,
            alignItems: "center",
            paddingBottom: 10,
          }}
        >
          <View
            style={{
              height: 30,
              width: 30,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 8,
              backgroundColor: "#246ce0",
            }}
          >
            <Ionicons size={17} name="bug" color={"white"} />
          </View>
          <View style={{ paddingHorizontal: 10, flex: 1 }}>
            <BoldText style={{ fontSize: 16 }}>Bug Report</BoldText>
            <RegularText style={{ fontSize: 12, color: Colors[theme].text }}>
              Report bugs very simply
            </RegularText>
          </View>
          <Ionicons color={Colors[theme].text} name="chevron-forward" />
        </Row>
        <Row
          style={{
            marginTop: 10,
            alignItems: "center",
            paddingBottom: 10,
          }}
        >
          <View
            style={{
              height: 30,
              width: 30,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 8,
              backgroundColor: "#278a34",
            }}
          >
            <Ionicons size={17} name="share" color={"white"} />
          </View>
          <View style={{ paddingHorizontal: 10, flex: 1 }}>
            <BoldText style={{ fontSize: 16 }}>Share the app</BoldText>
            <RegularText style={{ fontSize: 12, color: Colors[theme].text }}>
              Share this with your friends
            </RegularText>
          </View>
          <Ionicons color={Colors[theme].text} name="chevron-forward" />
        </Row>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            Alert.alert("Logout", "Do you want to log out of your account?", [
              { text: "No" },
              {
                text: "Yes",
                onPress: handleLogout,
              },
            ]);
          }}
        >
          <Row
            style={{
              marginTop: 10,
              alignItems: "center",
              paddingBottom: 10,
            }}
          >
            <View
              style={{
                height: 30,
                width: 30,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 8,
                backgroundColor: "#242c00",
              }}
            >
              <Ionicons size={17} name="log-out" color={"white"} />
            </View>
            <View style={{ paddingHorizontal: 10, flex: 1 }}>
              <BoldText style={{ fontSize: 16 }}>
                {loading ? (
                  <ActivityIndicator color={Colors[theme].background} />
                ) : (
                  "Logout"
                )}
              </BoldText>
            </View>
            <Ionicons color={Colors[theme].text} name="chevron-forward" />
          </Row>
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <RegularText style={{ color: Colors[theme].text }}>
            All Rights Reserved, Cruisemate &#8482;
          </RegularText>
        </View>
      </View>
    </View>
  );
};

export default SupplierProfile;
