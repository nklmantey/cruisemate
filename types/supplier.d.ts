type SupplierCar = {
  carBodyType: string;
  carBrand: string;
  carModel: string;
  carMileage: string;
  carTransmission: string;
  carCondition: string;
  dailyPrice: string;
  pictures: string[];
  rentalStatus: boolean;
};

type RentalSupplier = {
  cars: SupplierCar[];
  email: string;
  fullName: string;
  phone: string;
  shopLocation: {
    latitude: number;
    longitude: number;
  };
  shopName: string;
};
