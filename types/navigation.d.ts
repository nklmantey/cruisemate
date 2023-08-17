//navigation
type RootStackParamList = {
  AuthStack: undefined;
  TabStack: undefined;
};
type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
  ProfileSetup: {
    uid: string;
  };
};
type TabStackParamList = {
  HomeStack: undefined;
  MapStack: undefined;
  HistoryStack: undefined;
};
type HomeStackParamList = {
  Home: undefined;
  Settings: undefined;
  CarDetails: undefined | { source: string; name: string };
  CarRental: undefined;
};
type MapStackParamList = {
  Map: undefined;
};
type HistoryStackParamList = {
  History: undefined;
};
