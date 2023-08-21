import { useEffect, useState } from "react";
import { View, Platform, KeyboardAvoidingView, StatusBar } from "react-native";
import Swiper from "react-native-swiper";
import {
  BoldText,
  RegularText,
  ExtraBoldText,
} from "../../components/StyledText";
import Colors from "../../constants/Colors";
import Animated, { FadeInDown } from "react-native-reanimated";
import { screenHeight } from "../../constants/Dimensions";
import { Row } from "../../components/Row";
import { PrimaryButton } from "../../components/ui/Button";
import useColorScheme from "../../hooks/useColorScheme";
import { Image } from "expo-image";
import { useUserAuthStore } from "../../store/useUserAuthStore";

export default function WelcomeScreen() {
  const setIsOnboarded = useUserAuthStore((state) => state.setIsOnboarded);
  const theme = useColorScheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={40}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
        backgroundColor: Colors[theme].background,
      }}
    >
      <StatusBar
        barStyle={
          Colors[theme].background === "#000" ? "dark-content" : "light-content"
        }
      />
      {currentIndex === 0 && (
        <View
          style={{
            height: screenHeight / 1.75,
            width: "100%",
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: Colors[theme].text,
          }}
        >
          <Image
            style={{ width: 200, height: 200, borderRadius: 20 }}
            source={require("../../assets/icon.png")}
            contentFit="contain"
          />
        </View>
      )}

      {currentIndex === 1 && (
        <View
          style={{
            height: screenHeight / 1.75,
            width: "100%",
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: Colors[theme].text,
          }}
        >
          <Image
            style={{ width: 200, height: 200 }}
            source={require("../../assets/find.svg")}
            contentFit="contain"
          />
        </View>
      )}

      {currentIndex === 2 && (
        <View
          style={{
            height: screenHeight / 1.75,
            width: "100%",
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: Colors[theme].text,
          }}
        >
          <Image
            style={{ width: 200, height: 200 }}
            source={require("../../assets/track.svg")}
            contentFit="contain"
          />
        </View>
      )}

      <Swiper
        index={currentIndex}
        // activeDotColor={Colors[theme].tint}
        onIndexChanged={(i) => {
          setCurrentIndex(i);
        }}
        showsPagination={false}
        removeClippedSubviews={false}
        autoplay={false}
        loop={false}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{ paddingHorizontal: 20, flex: 1, justifyContent: "center" }}
          >
            <BoldText
              style={{
                fontSize: 30,
                paddingVertical: 5,
                textAlign: "center",
              }}
            >
              Welcome to CruiseMate
            </BoldText>
            <RegularText
              style={{
                color: Colors[theme].background === "#000" ? "#eee" : "gray",
                paddingTop: 10,
                alignSelf: "center",
              }}
            >
              Your journey begins with CruiseMate, your trusted companion for
              hassle-free car rentals
            </RegularText>
          </View>
        </View>
        <View
          style={{ paddingHorizontal: 20, flex: 1, justifyContent: "center" }}
        >
          <ExtraBoldText
            style={{
              fontSize: 30,
              paddingVertical: 5,
              textAlign: "center",
            }}
          >
            Find
          </ExtraBoldText>
          <RegularText
            style={{
              color: Colors[theme].background === "#000" ? "#eee" : "gray",
              paddingTop: 10,
              alignSelf: "center",
            }}
          >
            Your perfect ride awaits! Explore a diverse fleet of vehicles
            through CruiseMate, where finding the ideal car for your adventure
            is simple and exciting
          </RegularText>
        </View>
        <View
          style={{ paddingHorizontal: 20, flex: 1, justifyContent: "center" }}
        >
          <ExtraBoldText
            style={{
              fontSize: 30,
              paddingVertical: 5,
              textAlign: "center",
            }}
          >
            Stay updated
          </ExtraBoldText>
          <RegularText
            style={{
              color: Colors[theme].background === "#000" ? "#eee" : "gray",
              paddingTop: 10,
              alignSelf: "center",
            }}
          >
            Are you a car rental supplier? stay in the loop on the location of
            your car with CruiseMate, you can set boundaries with geofencing and
            more!
          </RegularText>
        </View>
      </Swiper>
      <View
        style={{ padding: 10, justifyContent: "center", alignItems: "center" }}
      >
        <Row>
          {[0, 1, 2].map((item) => (
            <View
              style={{
                height: 7,
                width: item === currentIndex ? 20 : 7,
                marginHorizontal: 5,
                borderRadius: 20,
                backgroundColor:
                  item === currentIndex ? Colors[theme].text : "#e3e3e3",
              }}
            ></View>
          ))}
        </Row>
      </View>
      <View
        style={{
          marginBottom: 25,
          justifyContent: "center",
          paddingHorizontal: 20,
        }}
      >
        {/* <View style={{ height: 1, backgroundColor: "silver", opacity: 0.2 }} /> */}
        <Animated.View entering={FadeInDown.delay(200)}>
          <PrimaryButton
            title="Let's get started"
            onPress={() => setIsOnboarded(true)}
          />
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );
}
