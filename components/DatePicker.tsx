import React, { useState, FC } from "react";
import { TouchableOpacity, Platform, View } from "react-native";
import styled from "styled-components/native"; // Update import path
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import Modal from "react-native-modal";
import { RegularText } from "./StyledText";

interface CustomDatePickerProps {
  date?: Date;
  exitOnClose: (date: Date) => void;
  onDateSelected: () => void;
  mode?: "date" | "time" | "datetime";
}

const CustomDatePicker = ({
  date,
  exitOnClose,
  onDateSelected,
  mode = "date",
}: CustomDatePickerProps) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [internalDate, setInternalDate] = useState(new Date());

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    if (selectedDate !== undefined) {
      setInternalDate(selectedDate);
      exitOnClose(selectedDate);
    }
  };

  return (
    <Container>
      {Platform.OS === "ios" && (
        <Modal isVisible={modalVisible} backdropOpacity={0.3}>
          <View style={{ borderRadius: 12, backgroundColor: "#ffffff" }}>
            <Header style={{}}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  exitOnClose(internalDate);
                }}
              >
                <RegularText onPress={onDateSelected}>Done</RegularText>
              </TouchableOpacity>
            </Header>
            <View style={{ padding: 20 }}>
              <DateTimePicker
                value={internalDate}
                mode={mode}
                textColor="grey"
                display="spinner"
                onChange={onChange}
                style={{ backgroundColor: "#ffffff", borderRadius: 12 }}
              />
            </View>
          </View>
        </Modal>
      )}
      {Platform.OS === "android" && (
        <DateTimePicker
          value={internalDate}
          mode={mode}
          display="default"
          onChange={onChange}
          style={{ backgroundColor: "#ffffff", borderRadius: 12 }}
        />
      )}
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  justify-content: center;
`;
const Header = styled.View`
  width: 100%;
  padding: 16px;
  justify-content: flex-end;
  align-items: flex-end;
  border-bottom-width: 1px;
  border-color: #e3e3e3;
`;

export default CustomDatePicker;
