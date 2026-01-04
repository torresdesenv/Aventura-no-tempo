import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { VoiceSelector } from '../components/VoiceSelector';
import { LanguageSelector } from '../components/LanguageSelector';
import { TranslationDisplay } from '../components/TranslationDisplay';
import { colors } from '../styles/colors';
import LipReadingService from '../services/LipReadingService';
import TranslationService from '../services/TranslationService';
import TTSService from '../services/TTSService';
import FaceDetectionService from '../services/FaceDetectionService';
import { DEFAULT_SETTINGS, SETTINGS_KEYS } from '../utils/constants';

export const UploadVideoScreen = ({ navigation }) => {
  const [videoUri, setVideoUri] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [detectedFaces, setDetectedFaces] = useState([]);
  const [selectedFaceId, setSelectedFaceId] = useState(null);
  const [originalText, setOriginalText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [sourceLang, setSourceLang] = useState(DEFAULT_SETTINGS[SETTINGS_KEYS.LANGUAGE_SOURCE]);
  const [targetLang, setTargetLang] = useState(DEFAULT_SETTINGS[SETTINGS_KEYS.LANGUAGE_TARGET]);
  const [voiceGender, setVoiceGender] = useState(DEFAULT_SETTINGS[SETTINGS_KEYS.VOICE_GENDER]);

  const pickVideo = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Permissão Necessária',
          'Precisamos de permissão para acessar sua galeria de vídeos.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setVideoUri(result.assets[0].uri);
        setOriginalText('');
        setTranslatedText('');
        setConfidence(0);
        setDetectedFaces([]);
        setSelectedFaceId(null);

        // Detect faces in the video
        await detectFacesInVideo(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking video:', error);
      Alert.alert('Erro', 'Não foi possível carregar o vídeo.');
    }
  };

  const detectFacesInVideo = async (uri) => {
    try {
      setIsProcessing(true);

      // In production, extract first frame and detect faces
      const faces = await FaceDetectionService.detectFaces({ uri });

      setDetectedFaces(faces);

      if (faces.length === 1) {
        // Auto-select if only one face
        setSelectedFaceId(faces[0].id);
      } else if (faces.length > 1) {
        Alert.alert(
          'Múltiplas Pessoas Detectadas',
          `Foram detectadas ${faces.length} pessoas. Por favor, selecione uma para continuar.`
        );
      } else {
        Alert.alert(
          'Nenhuma Pessoa Detectada',
          'Não foi possível detectar rostos no vídeo. Tente outro vídeo com pessoas visíveis.'
        );
      }
    } catch (error) {
      console.error('Error detecting faces:', error);
      Alert.alert('Erro', 'Erro ao detectar pessoas no vídeo.');
    } finally {
      setIsProcessing(false);
    }
  };

  const processVideo = async () => {
    if (!videoUri) {
      Alert.alert('Erro', 'Por favor, selecione um vídeo primeiro.');
      return;
    }

    if (!selectedFaceId && detectedFaces.length > 1) {
      Alert.alert('Erro', 'Por favor, selecione uma pessoa para processar.');
      return;
    }

    try {
      setIsProcessing(true);

      // Process video for lip reading
      const lipReadResult = await LipReadingService.processFrames(
        [{ uri: videoUri }],
        { faceId: selectedFaceId }
      );

      setOriginalText(lipReadResult.text);
      setConfidence(lipReadResult.confidence);

      // Translate text
      const translation = await TranslationService.translate(
        lipReadResult.text,
        sourceLang,
        targetLang
      );

      setTranslatedText(translation.translatedText);
    } catch (error) {
      console.error('Error processing video:', error);
      Alert.alert('Erro', 'Erro ao processar o vídeo.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSpeak = () => {
    if (translatedText) {
      TTSService.speak(translatedText, {
        gender: voiceGender,
        language: targetLang,
      });
    }
  };

  const handleCopy = () => {
    // In production, use Clipboard API
    Alert.alert('Copiado!', 'Texto copiado para a área de transferência.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Carregar Vídeo"
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Video Picker */}
        {!videoUri ? (
          <View style={styles.uploadContainer}>
            <Text style={styles.uploadIcon}>📹</Text>
            <Text style={styles.uploadTitle}>Selecione um Vídeo</Text>
            <Text style={styles.uploadDescription}>
              Escolha um vídeo da sua galeria para fazer a leitura labial
            </Text>
            <Button
              title="Escolher Vídeo"
              onPress={pickVideo}
              icon="📂"
              style={styles.uploadButton}
            />
          </View>
        ) : (
          <>
            {/* Video Preview */}
            <View style={styles.videoContainer}>
              <Video
                source={{ uri: videoUri }}
                style={styles.video}
                useNativeControls
                resizeMode="contain"
                isLooping
              />
              <Button
                title="Escolher Outro Vídeo"
                variant="outline"
                onPress={pickVideo}
                style={styles.changeVideoButton}
              />
            </View>

            {/* Face Selection */}
            {detectedFaces.length > 1 && (
              <View style={styles.faceSelectionContainer}>
                <Text style={styles.sectionLabel}>
                  Selecione a pessoa ({detectedFaces.length} detectadas)
                </Text>
                <View style={styles.facesGrid}>
                  {detectedFaces.map((face, index) => (
                    <TouchableOpacity
                      key={face.id}
                      style={[
                        styles.faceOption,
                        selectedFaceId === face.id && styles.faceOptionSelected,
                      ]}
                      onPress={() => setSelectedFaceId(face.id)}
                    >
                      <Text style={styles.faceNumber}>Pessoa {index + 1}</Text>
                      <Text style={styles.faceConfidence}>
                        {Math.round(face.confidence * 100)}%
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* Language Selectors */}
            <LanguageSelector
              label="Idioma de Origem"
              selectedLanguage={sourceLang}
              onLanguageChange={setSourceLang}
            />

            <LanguageSelector
              label="Traduzir Para"
              selectedLanguage={targetLang}
              onLanguageChange={setTargetLang}
            />

            {/* Voice Selector */}
            <VoiceSelector
              selectedVoice={voiceGender}
              onVoiceChange={setVoiceGender}
            />

            {/* Process Button */}
            <Button
              title={isProcessing ? 'Processando...' : 'Processar Vídeo'}
              onPress={processVideo}
              loading={isProcessing}
              disabled={isProcessing || (!selectedFaceId && detectedFaces.length > 1)}
              style={styles.processButton}
            />

            {/* Results */}
            {originalText && (
              <TranslationDisplay
                originalText={originalText}
                translatedText={translatedText}
                confidence={confidence}
                onSpeak={handleSpeak}
                onCopy={handleCopy}
              />
            )}
          </>
        )}
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
  uploadContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  uploadIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  uploadTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  uploadDescription: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 40,
  },
  uploadButton: {
    minWidth: 200,
  },
  videoContainer: {
    marginBottom: 20,
  },
  video: {
    width: '100%',
    height: 250,
    backgroundColor: '#000',
    borderRadius: 12,
  },
  changeVideoButton: {
    marginTop: 12,
  },
  faceSelectionContainer: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  facesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  faceOption: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
  },
  faceOptionSelected: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  faceNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  faceConfidence: {
    fontSize: 12,
    color: colors.textLight,
  },
  processButton: {
    marginVertical: 20,
  },
});
