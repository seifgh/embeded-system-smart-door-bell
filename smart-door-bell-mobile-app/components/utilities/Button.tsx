import { Ionicons as Ionics } from "@expo/vector-icons";
import { FC } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../constants/Colors";

type BtnType = "pr" | "cl" | "dg";
type BtnSizeType = "sm" | "md" | "lg";

const Button: FC<{
  type?: BtnType;
  size?: BtnSizeType;
  iconName?: React.ComponentProps<typeof Ionics>["name"];
  rounded?: boolean;
  iconLeft?: boolean;
  style?: StyleProp<any>;
  onPress: Function;
}> = (props) => {
  const {
    type = "pr",
    size = "md",
    iconName = null,
    children,
    rounded = false,
    iconLeft = false,
    onPress,
  } = props;
  const hasIcon = !!iconName;
  const styles = getThemedButtonStyles(size, type, rounded, hasIcon, iconLeft);
  return (
    <View style={[styles.view, props.style]}>
      <TouchableOpacity
        {...props}
        onPress={(...args) => onPress(...args)}
        style={styles.touchable}
        activeOpacity={0.8}
      >
        {iconLeft ? (
          <>
            {hasIcon && (
              <Ionics
                name={iconName}
                color={styles.text.color}
                size={iconSizes[size]}
              />
            )}
            {children && (
              <Text style={styles.text as StyleProp<any>}>{children}</Text>
            )}
          </>
        ) : (
          <>
            {children && (
              <Text style={styles.text as StyleProp<any>}>{children}</Text>
            )}
            {hasIcon && (
              <Ionics
                name={iconName}
                color={styles.text.color}
                size={iconSizes[size]}
              />
            )}
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const sizeStyles = {
  sm: {
    text: {
      fontSize: 12,
      fontWeight: "bold",
      paddingRight: 8,
    },
    touchable: {
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
  },
  md: {
    text: {
      fontSize: 14,
      fontWeight: "bold",
      paddingRight: 10,
    },
    touchable: {
      paddingHorizontal: 14,
      paddingVertical: 10,
    },
  },
  lg: {
    text: {
      fontSize: 16,
      fontWeight: "bold",
      paddingRight: 12,
    },
    touchable: {
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
  },
};

const colorStyles = {
  pr: {
    text: { color: "white" },
    touchable: {
      backgroundColor: Colors.tint,
      shadowColor: Colors.tint,
    },
  },
  cl: {
    text: {
      color: Colors.tint,
    },
    touchable: {
      backgroundColor: "white",
      shadowColor: "white",
    },
  },
  dg: {
    text: {
      color: "white",
    },
    touchable: {
      backgroundColor: Colors.danger,
      shadowColor: Colors.background,
    },
  },
};

export const iconSizes = {
  sm: 16,
  md: 24,
  lg: 32,
};

const getThemedButtonStyles = (
  size: BtnSizeType,
  type: BtnType,
  rounded: boolean,
  hasIcon: boolean,
  iconLeft: boolean
) => {
  const sizeStyle = sizeStyles[size];
  const colorStyle = colorStyles[type];
  return StyleSheet.create({
    text: {
      ...sizeStyle.text,
      ...colorStyle.text,
      [iconLeft ? "paddingLeft" : "paddingRight"]: hasIcon
        ? sizeStyle.text.paddingRight
        : 0,
    },
    view: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    touchable: {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: rounded ? 1000 : 8,
      elevation: 4,
      ...sizeStyle.touchable,
      ...colorStyle.touchable,
    },
  });
};
