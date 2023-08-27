import { View, Text } from "react-native";
import { RegularText } from "../../components/StyledText";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";

type RouteParams = {
  params: {
    data: RentalSupplier;
  };
};

const ViewSupplierStore = () => {
  const { params }: RouteProp<RouteParams> = useRoute();
  const [shopName, setShopName] = useState(params.data.shopName);
  const { setOptions } = useNavigation();

  useEffect(() => {
    setOptions({
      title: shopName === "" ? "Supplier Store" : shopName,
    });
  }, [shopName]);

  return <View>{/* <RegularText>okay</RegularText> */}</View>;
};
export default ViewSupplierStore;
