import styled from "styled-components";
import { COLORS } from "../styles/theme";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const StyledButton = styled.TouchableOpacity`
  background-color: #4f6d7a;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
`;

export const InputWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #2e64e515;
`;

export const InputField = styled.TextInput`
  justify-content: center;
  align-items: center;
  font-size: 24px;
  text-align: center;
  width: 90%;
  margin-bottom: 15px;
`;

export const AddImage = styled.Image`
  position: relative;
  width: 100%;
  height: 250px;
  margin-bottom: 15px;
`;
export const AddImageWrapper = styled.View`
  position: relative;
  width: 100%;
  height: 250px;
  margin-bottom: 15px;
`;

export const StatusWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

export const SubmitBtn = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  background-color: ${COLORS.primary};
  border-radius: 5px;
  padding: 10px 25px;
`;

export const SubmitBtnText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${COLORS.white};
`;
export const DeleteImageButton = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 10px;
`;
