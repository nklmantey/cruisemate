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
  ProfileStack: undefined;
  MapStack: undefined;
  HistoryStack: undefined;
};
type SupplierTabStackParamList = {
  HomeStack: undefined;
  MapStack: undefined;
  CarsStack: undefined;
  ProfileStack: undefined;
};
type ProfileStackParamList = {
  Profile: undefined;
};
type MapStackParamList = {
  Map: undefined;
  ViewSupplierStore:
    | undefined
    | {
        data: RentalSupplier;
      };
};
type HistoryStackParamList = {
  History: undefined;
};

type SupplierCarsParamList = {
  Cars: undefined;
  AddCarScreen: undefined;
  CarDetailsScreen: undefined;
};
type SupplierMapParamList = {
  VehicleTracking: undefined;
};
type SupplierHomeParamList = {
  SupplierHome: undefined;
  RentalDetails:
    | undefined
    | {
        data: any;
      };
};
