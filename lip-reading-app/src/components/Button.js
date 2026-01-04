import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../styles/colors';

export const Button = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle
}) => {
  const getButtonStyle = () => {
    if (disabled) return [styles.button, styles.buttonDisabled, style];

    switch (variant) {
      case 'secondary':
        return [styles.button, styles.buttonSecondary, style];
      case 'outline':
        return [styles.button, styles.buttonOutline, style];
      case 'danger':
        return [styles.button, styles.buttonDanger, style];
      default:
        return [styles.button, styles.buttonPrimary, style];
    }
  };

  const getTextStyle = () => {
    if (variant === 'outline') {
      return [styles.buttonText, styles.buttonTextOutline, textStyle];
    }
    return [styles.buttonText, textStyle];
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color="#ffffff" />
      ) : (
        <>
          {icon && <Text style={styles.icon}>{icon}</Text>}
          <Text style={getTextStyle()}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
  },
  buttonSecondary: {
    backgroundColor: colors.secondary,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  buttonDanger: {
    backgroundColor: colors.error,
  },
  buttonDisabled: {
    backgroundColor: colors.disabled,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextOutline: {
    color: colors.primary,
  },
  icon: {
    fontSize: 20,
    marginRight: 8,
  },
});
