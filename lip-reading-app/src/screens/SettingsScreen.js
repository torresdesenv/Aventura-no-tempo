import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { LanguageSelector } from '../components/LanguageSelector';
import { VoiceSelector } from '../components/VoiceSelector';
import { colors } from '../styles/colors';
import { DEFAULT_SETTINGS, SETTINGS_KEYS } from '../utils/constants';

export const SettingsScreen = ({ navigation }) => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const keys = Object.values(SETTINGS_KEYS);
      const values = await AsyncStorage.multiGet(keys);

      const loadedSettings = { ...DEFAULT_SETTINGS };

      values.forEach(([key, value]) => {
        if (value !== null) {
          // Parse boolean and number values
          if (value === 'true') loadedSettings[key] = true;
          else if (value === 'false') loadedSettings[key] = false;
          else if (!isNaN(parseFloat(value))) loadedSettings[key] = parseFloat(value);
          else loadedSettings[key] = value;
        }
      });

      setSettings(loadedSettings);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveSettings = async () => {
    try {
      const settingsArray = Object.entries(settings).map(([key, value]) => [
        key,
        String(value),
      ]);

      await AsyncStorage.multiSet(settingsArray);

      setHasChanges(false);
      Alert.alert('Sucesso', 'Configurações salvas com sucesso!');
    } catch (error) {
      console.error('Error saving settings:', error);
      Alert.alert('Erro', 'Não foi possível salvar as configurações.');
    }
  };

  const resetSettings = () => {
    Alert.alert(
      'Resetar Configurações',
      'Tem certeza que deseja restaurar as configurações padrão?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Resetar',
          style: 'destructive',
          onPress: () => {
            setSettings(DEFAULT_SETTINGS);
            setHasChanges(true);
          },
        },
      ]
    );
  };

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Configurações"
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Language Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Idiomas</Text>

          <LanguageSelector
            label="Idioma de Origem"
            selectedLanguage={settings[SETTINGS_KEYS.LANGUAGE_SOURCE]}
            onLanguageChange={(lang) =>
              updateSetting(SETTINGS_KEYS.LANGUAGE_SOURCE, lang)
            }
          />

          <LanguageSelector
            label="Idioma de Tradução"
            selectedLanguage={settings[SETTINGS_KEYS.LANGUAGE_TARGET]}
            onLanguageChange={(lang) =>
              updateSetting(SETTINGS_KEYS.LANGUAGE_TARGET, lang)
            }
          />
        </View>

        {/* Voice Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Voz</Text>

          <VoiceSelector
            selectedVoice={settings[SETTINGS_KEYS.VOICE_GENDER]}
            onVoiceChange={(gender) =>
              updateSetting(SETTINGS_KEYS.VOICE_GENDER, gender)
            }
          />

          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>
              Velocidade da Voz: {settings[SETTINGS_KEYS.VOICE_SPEED].toFixed(1)}x
            </Text>
            <Slider
              style={styles.slider}
              minimumValue={0.5}
              maximumValue={2.0}
              step={0.1}
              value={settings[SETTINGS_KEYS.VOICE_SPEED]}
              onValueChange={(value) =>
                updateSetting(SETTINGS_KEYS.VOICE_SPEED, value)
              }
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor={colors.border}
              thumbTintColor={colors.primary}
            />
          </View>

          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>
              Tom da Voz: {settings[SETTINGS_KEYS.VOICE_PITCH].toFixed(1)}
            </Text>
            <Slider
              style={styles.slider}
              minimumValue={0.5}
              maximumValue={2.0}
              step={0.1}
              value={settings[SETTINGS_KEYS.VOICE_PITCH]}
              onValueChange={(value) =>
                updateSetting(SETTINGS_KEYS.VOICE_PITCH, value)
              }
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor={colors.border}
              thumbTintColor={colors.primary}
            />
          </View>
        </View>

        {/* General Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Geral</Text>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Tradução Automática</Text>
              <Text style={styles.settingDescription}>
                Traduzir automaticamente após leitura labial
              </Text>
            </View>
            <Switch
              value={settings[SETTINGS_KEYS.AUTO_TRANSLATE]}
              onValueChange={(value) =>
                updateSetting(SETTINGS_KEYS.AUTO_TRANSLATE, value)
              }
              trackColor={{ false: colors.disabled, true: colors.primary }}
              thumbColor={colors.background}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Mostrar Confiança</Text>
              <Text style={styles.settingDescription}>
                Exibir porcentagem de confiança da leitura
              </Text>
            </View>
            <Switch
              value={settings[SETTINGS_KEYS.SHOW_CONFIDENCE]}
              onValueChange={(value) =>
                updateSetting(SETTINGS_KEYS.SHOW_CONFIDENCE, value)
              }
              trackColor={{ false: colors.disabled, true: colors.primary }}
              thumbColor={colors.background}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Salvar Histórico</Text>
              <Text style={styles.settingDescription}>
                Manter histórico de traduções
              </Text>
            </View>
            <Switch
              value={settings[SETTINGS_KEYS.SAVE_HISTORY]}
              onValueChange={(value) =>
                updateSetting(SETTINGS_KEYS.SAVE_HISTORY, value)
              }
              trackColor={{ false: colors.disabled, true: colors.primary }}
              thumbColor={colors.background}
            />
          </View>
        </View>

        {/* App Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre o App</Text>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Versão</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Desenvolvido por</Text>
            <Text style={styles.infoValue}>Your Company</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <Button
          title="Salvar Configurações"
          onPress={saveSettings}
          disabled={!hasChanges}
          style={styles.saveButton}
        />

        <Button
          title="Resetar para Padrão"
          variant="outline"
          onPress={resetSettings}
          style={styles.resetButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  sliderContainer: {
    marginVertical: 16,
  },
  sliderLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
    color: colors.textLight,
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  infoValue: {
    fontSize: 16,
    color: colors.textLight,
  },
  saveButton: {
    marginBottom: 12,
  },
  resetButton: {
    marginBottom: 20,
  },
});
