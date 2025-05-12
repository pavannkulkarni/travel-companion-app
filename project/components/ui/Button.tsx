import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import { Theme } from '@/constants/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  label: string;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  variant = 'primary',
  size = 'md',
  label,
  isLoading = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  ...props
}: ButtonProps) {
  const buttonStyles = [
    styles.button,
    styles[`button_${variant}`],
    styles[`button_${size}`],
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`text_${variant}`],
    styles[`text_${size}`],
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      disabled={isLoading || props.disabled}
      activeOpacity={0.8}
      {...props}>
      {isLoading ? (
        <ActivityIndicator
          color={variant === 'primary' ? Theme.colors.white : Theme.colors.primary[600]}
          size="small"
        />
      ) : (
        <>
          {leftIcon && <>{leftIcon}</>}
          <Text style={textStyles}>{label}</Text>
          {rightIcon && <>{rightIcon}</>}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Theme.borderRadius.md,
    gap: Theme.spacing[2],
  },
  button_primary: {
    backgroundColor: Theme.colors.primary[600],
  },
  button_secondary: {
    backgroundColor: Theme.colors.secondary[600],
  },
  button_outline: {
    backgroundColor: Theme.colors.white,
    borderWidth: 1,
    borderColor: Theme.colors.primary[600],
  },
  button_ghost: {
    backgroundColor: 'transparent',
  },
  button_sm: {
    paddingVertical: Theme.spacing[1],
    paddingHorizontal: Theme.spacing[3],
  },
  button_md: {
    paddingVertical: Theme.spacing[2],
    paddingHorizontal: Theme.spacing[4],
  },
  button_lg: {
    paddingVertical: Theme.spacing[3],
    paddingHorizontal: Theme.spacing[5],
  },
  text: {
    fontFamily: Theme.fontFamily.medium,
  },
  text_primary: {
    color: Theme.colors.white,
  },
  text_secondary: {
    color: Theme.colors.white,
  },
  text_outline: {
    color: Theme.colors.primary[600],
  },
  text_ghost: {
    color: Theme.colors.primary[600],
  },
  text_sm: {
    fontSize: Theme.fontSizes.sm,
  },
  text_md: {
    fontSize: Theme.fontSizes.md,
  },
  text_lg: {
    fontSize: Theme.fontSizes.lg,
  },
});