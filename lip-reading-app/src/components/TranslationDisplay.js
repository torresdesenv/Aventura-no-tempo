import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '../styles/colors';

export const TranslationDisplay = ({
  originalText,
  translatedText,
  confidence,
  showConfidence = true,
  onSpeak,
  onCopy
}) => {
  const getConfidenceColor = (conf) => {
    if (conf >= 0.8) return colors.success;
    if (conf >= 0.5) return colors.warning;
    return colors.error;
  };

  return (
    <View style={styles.container}>
      {/* Original Text */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>Texto Original</Text>
          {showConfidence && confidence !== undefined && (
            <View style={[styles.confidenceBadge, { backgroundColor: getConfidenceColor(confidence) }]}>
              <Text style={styles.confidenceText}>
                {Math.round(confidence * 100)}% confiança
              </Text>
            </View>
          )}
        </View>
        <ScrollView style={styles.textContainer}>
          <Text style={styles.text}>
            {originalText || 'Aguardando leitura labial...'}
          </Text>
        </ScrollView>
      </View>

      {/* Translated Text */}
      <View style={[styles.section, styles.translatedSection]}>
        <Text style={styles.sectionLabel}>Tradução</Text>
        <ScrollView style={styles.textContainer}>
          <Text style={styles.text}>
            {translatedText || 'A tradução aparecerá aqui...'}
          </Text>
        </ScrollView>
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onSpeak}
          disabled={!translatedText}
        >
          <Text style={styles.actionIcon}>🔊</Text>
          <Text style={styles.actionText}>Falar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={onCopy}
          disabled={!translatedText}
        >
          <Text style={styles.actionIcon}>📋</Text>
          <Text style={styles.actionText}>Copiar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  translatedSection: {
    backgroundColor: colors.primaryLight,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textLight,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  confidenceBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  confidenceText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  textContainer: {
    maxHeight: 120,
  },
  text: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  actionIcon: {
    fontSize: 20,
  },
  actionText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
