import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../styles/colors';
import { VOICE_OPTIONS } from '../utils/constants';

export const VoiceSelector = ({ selectedVoice, onVoiceChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Selecione a Voz</Text>
      <View style={styles.optionsContainer}>
        {VOICE_OPTIONS.map((voice) => (
          <TouchableOpacity
            key={voice.id}
            style={[
              styles.option,
              selectedVoice === voice.id && styles.optionSelected
            ]}
            onPress={() => onVoiceChange(voice.id)}
          >
            <Text style={styles.icon}>{voice.icon}</Text>
            <Text style={[
              styles.optionText,
              selectedVoice === voice.id && styles.optionTextSelected
            ]}>
              {voice.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  option: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
  },
  optionSelected: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  icon: {
    fontSize: 32,
    marginBottom: 8,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  optionTextSelected: {
    color: colors.primary,
  },
});
