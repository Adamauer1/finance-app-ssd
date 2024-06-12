import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface TextButtonProps {
  onPress: () => void;
  buttonText: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const TextButton: React.FC<TextButtonProps> = ({
  onPress,
  buttonText,
  buttonStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    //overflow: 'hidden', // Clip the content to the rounded borders
    alignItems: "center",
    width: 180,
    height: 50,
    elevation: 8,
    // backgroundColor: '#afeeee',
    paddingVertical: 1,
    paddingHorizontal: 12,
  },
  buttonText: {
    color: "black",
    fontSize: 25,
    fontWeight: "700",
    padding: 10,
    textAlign: "center",
  },
});

export default TextButton;
