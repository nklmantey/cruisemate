//navigation
type RootStackParamList = {
  AuthStack: undefined;
  TabStack: undefined;
  SupplierTabStack: undefined;
};
type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
  ProfileSetup: {
    uid: string;
  };
  SupplierProfileSetup: {
    uid: string;
  };
  SupplierProfileSetupExtra: {
    uid: string;
  };
};
type TabStackParamList = {
  HomeStack: undefined;
  MapStack: undefined;
  HistoryStack: undefined;
};
type SupplierTabStackParamList = {
  HomeStack: undefined;
  MapStack: undefined;
  CarsStack: undefined;
};
type HomeStackParamList = {
  Home: undefined;
  Settings: undefined;
};
type MapStackParamList = {
  Map: undefined;
};
type HistoryStackParamList = {
  History: undefined;
};

type SupplierCarsParamList = {
  Cars: undefined;
  AddCarScreen: undefined;
};
type SupplierMapParamList = {
  VehicleTracking: undefined;
};
type SupplierHomeParamList = {
  SupplierHome: undefined;
};
