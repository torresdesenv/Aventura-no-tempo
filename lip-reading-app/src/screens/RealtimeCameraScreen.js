import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera } from 'expo-camera';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { TranslationDisplay } from '../components/TranslationDisplay';
import { colors } from '../styles/colors';
import LipReadingService from '../services/LipReadingService';
import TranslationService from '../services/TranslationService';
import TTSService from '../services/TTSService';
import FaceDetectionService from '../services/FaceDetectionService';
import { DEFAULT_SETTINGS, SETTINGS_KEYS } from '../utils/constants';

const { width, height } = Dimensions.get('window');

export const RealtimeCameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [detectedFaces, setDetectedFaces] = useState([]);
  const [originalText, setOriginalText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [sourceLang, setSourceLang] = useState(DEFAULT_SETTINGS[SETTINGS_KEYS.LANGUAGE_SOURCE]);
  const [targetLang, setTargetLang] = useState(DEFAULT_SETTINGS[SETTINGS_KEYS.LANGUAGE_TARGET]);
  const [voiceGender, setVoiceGender] = useState(DEFAULT_SETTINGS[SETTINGS_KEYS.VOICE_GENDER]);

  const cameraRef = useRef(null);
  const processingIntervalRef = useRef(null);

  useEffect(() => {
    requestCameraPermission();

    return () => {
      stopProcessing();
    };
  }, []);

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');

    if (status !== 'granted') {
      Alert.alert(
        'Permissão Necessária',
        'Precisamos de permissão para acessar a câmera.'
      );
    }
  };

  const startProcessing = async () => {
    if (!cameraRef.current) return;

    try {
      setIsRecording(true);
      await LipReadingService.loadModel();

      // Process frames periodically (every 2 seconds)
      processingIntervalRef.current = setInterval(async () => {
        await processCurrentFrame();
      }, 2000);
    } catch (error) {
      console.error('Error starting processing:', error);
      Alert.alert('Erro', 'Erro ao iniciar o processamento.');
    }
  };

  const stopProcessing = () => {
    setIsRecording(false);

    if (processingIntervalRef.current) {
      clearInterval(processingIntervalRef.current);
      processingIntervalRef.current = null;
    }

    TTSService.stop();
  };

  const processCurrentFrame = async () => {
    if (!cameraRef.current || !isRecording) return;

    try {
      setIsProcessing(true);

      // Capture current frame
      // Note: In production, you'd capture actual frame data
      const frameData = { timestamp: Date.now() };

      // Detect faces in frame
      const faces = await FaceDetectionService.detectFaces(frameData);
      setDetectedFaces(faces);

      if (faces.length === 0) {
        setOriginalText('');
        setTranslatedText('');
        setConfidence(0);
        return;
      }

      // Use first detected face (or selected face)
      const targetFace = faces[0];

      // Process for lip reading
      const lipReadResult = await LipReadingService.processRealtimeFrame(
        frameData,
        targetFace
      );

      // Only update if we got new text different from current
      if (lipReadResult.text && lipReadResult.text !== originalText) {
        setOriginalText(lipReadResult.text);
        setConfidence(lipReadResult.confidence);

        // Translate
        const translation = await TranslationService.translate(
          lipReadResult.text,
          sourceLang,
          targetLang
        );

        setTranslatedText(translation.translatedText);

        // Auto-speak if enabled
        if (DEFAULT_SETTINGS[SETTINGS_KEYS.AUTO_TRANSLATE]) {
          await TTSService.speak(translation.translatedText, {
            gender: voiceGender,
            language: targetLang,
          });
        }
      }
    } catch (error) {
      console.error('Error processing frame:', error);
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
    Alert.alert('Copiado!', 'Texto copiado para a área de transferência.');
  };

  const openSettings = () => {
    stopProcessing();
    navigation.navigate('Settings');
  };

  if (hasPermission === null) {
    return (
      <View style={styles.centerContainer}>
        <Text>Solicitando permissão da câmera...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Sem acesso à câmera</Text>
        <Button
          title="Solicitar Permissão"
          onPress={requestCameraPermission}
          style={styles.permissionButton}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Câmera em Tempo Real"
        onBackPress={() => {
          stopProcessing();
          navigation.goBack();
        }}
        rightIcon="⚙️"
        onRightPress={openSettings}
      />

      <View style={styles.cameraContainer}>
        <Camera
          ref={cameraRef}
          style={styles.camera}
          type={Camera.Constants.Type.front}
        >
          {/* Face Detection Overlays */}
          {detectedFaces.map((face, index) => (
            <View
              key={face.id}
              style={[
                styles.faceBox,
                {
                  left: `${face.bounds.origin.x * 100}%`,
                  top: `${face.bounds.origin.y * 100}%`,
                  width: `${face.bounds.size.width * 100}%`,
                  height: `${face.bounds.size.height * 100}%`,
                },
              ]}
            >
              <Text style={styles.faceLabel}>Pessoa {index + 1}</Text>
            </View>
          ))}

          {/* Processing Indicator */}
          {isProcessing && (
            <View style={styles.processingIndicator}>
              <View style={styles.pulseCircle} />
              <Text style={styles.processingText}>Processando...</Text>
            </View>
          )}

          {/* Recording Status */}
          {isRecording && (
            <View style={styles.recordingBadge}>
              <View style={styles.recordingDot} />
              <Text style={styles.recordingText}>AO VIVO</Text>
            </View>
          )}
        </Camera>

        {/* Camera Controls */}
        <View style={styles.cameraControls}>
          {!isRecording ? (
            <TouchableOpacity
              style={styles.recordButton}
              onPress={startProcessing}
            >
              <View style={styles.recordButtonInner} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.stopButton}
              onPress={stopProcessing}
            >
              <View style={styles.stopButtonInner} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Translation Display */}
      <View style={styles.resultsContainer}>
        <TranslationDisplay
          originalText={originalText}
          translatedText={translatedText}
          confidence={confidence}
          onSpeak={handleSpeak}
          onCopy={handleCopy}
        />
      </View>

      {/* Info */}
      {!isRecording && !originalText && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            👆 Toque no botão para iniciar a leitura labial em tempo real
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  errorText: {
    fontSize: 18,
    color: colors.error,
    marginBottom: 20,
  },
  permissionButton: {
    minWidth: 200,
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  faceBox: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: colors.accent,
    borderRadius: 8,
  },
  faceLabel: {
    backgroundColor: colors.accent,
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  processingIndicator: {
    position: 'absolute',
    top: 20,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  pulseCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.accent,
    marginRight: 8,
  },
  processingText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  recordingBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.error,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  recordingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    marginRight: 8,
  },
  recordingText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cameraControls: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  recordButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.error,
  },
  stopButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  stopButtonInner: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.error,
  },
  resultsContainer: {
    padding: 20,
    maxHeight: height * 0.4,
  },
  infoContainer: {
    padding: 20,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
  },
});
