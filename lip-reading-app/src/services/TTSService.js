/**
 * Text-to-Speech Service
 *
 * Handles text-to-speech conversion with voice customization.
 * Uses Expo Speech for React Native.
 */

import * as Speech from 'expo-speech';

class TTSService {
  constructor() {
    this.isSpeaking = false;
    this.currentUtterance = null;
  }

  /**
   * Speak text with specified options
   * @param {string} text - Text to speak
   * @param {Object} options - Voice options (gender, language, rate, pitch)
   * @returns {Promise<void>}
   */
  async speak(text, options = {}) {
    if (!text || text.trim() === '') {
      console.warn('No text to speak');
      return;
    }

    try {
      // Stop any ongoing speech
      await this.stop();

      const {
        gender = 'female',
        language = 'pt-BR',
        rate = 1.0,
        pitch = 1.0,
        volume = 1.0,
      } = options;

      // Get available voices for the language
      const voices = await Speech.getAvailableVoicesAsync();

      // Filter voices by language and gender preference
      let selectedVoice = voices.find(voice =>
        voice.language.startsWith(language.split('-')[0]) &&
        (gender === 'female' ?
          voice.name.toLowerCase().includes('female') || voice.name.toLowerCase().includes('woman') :
          voice.name.toLowerCase().includes('male') || voice.name.toLowerCase().includes('man'))
      );

      // Fallback to any voice of the language
      if (!selectedVoice) {
        selectedVoice = voices.find(voice =>
          voice.language.startsWith(language.split('-')[0])
        );
      }

      const speechOptions = {
        language,
        pitch,
        rate,
        volume,
        voice: selectedVoice?.identifier,
        onStart: () => {
          this.isSpeaking = true;
          console.log('Speech started');
        },
        onDone: () => {
          this.isSpeaking = false;
          console.log('Speech completed');
        },
        onStopped: () => {
          this.isSpeaking = false;
          console.log('Speech stopped');
        },
        onError: (error) => {
          this.isSpeaking = false;
          console.error('Speech error:', error);
        },
      };

      Speech.speak(text, speechOptions);
      this.currentUtterance = text;
    } catch (error) {
      console.error('TTS Error:', error);
      throw error;
    }
  }

  /**
   * Stop current speech
   */
  async stop() {
    try {
      if (this.isSpeaking) {
        await Speech.stop();
        this.isSpeaking = false;
        this.currentUtterance = null;
      }
    } catch (error) {
      console.error('Error stopping speech:', error);
    }
  }

  /**
   * Pause current speech
   */
  async pause() {
    try {
      if (this.isSpeaking) {
        await Speech.pause();
      }
    } catch (error) {
      console.error('Error pausing speech:', error);
    }
  }

  /**
   * Resume paused speech
   */
  async resume() {
    try {
      await Speech.resume();
    } catch (error) {
      console.error('Error resuming speech:', error);
    }
  }

  /**
   * Get available voices for a language
   * @param {string} language - Language code (e.g., 'pt-BR', 'en-US')
   * @returns {Promise<Array>} - Array of available voices
   */
  async getVoicesForLanguage(language) {
    try {
      const voices = await Speech.getAvailableVoicesAsync();
      const langCode = language.split('-')[0];

      return voices.filter(voice =>
        voice.language.startsWith(langCode)
      );
    } catch (error) {
      console.error('Error getting voices:', error);
      return [];
    }
  }

  /**
   * Check if TTS is currently speaking
   * @returns {boolean}
   */
  getIsSpeaking() {
    return this.isSpeaking;
  }

  /**
   * Get language-specific voice recommendations
   * @param {string} language - Language code
   * @param {string} gender - 'male' or 'female'
   * @returns {Object} - Recommended voice settings
   */
  getVoiceRecommendations(language, gender) {
    const recommendations = {
      'pt-BR': {
        female: { pitch: 1.1, rate: 0.95 },
        male: { pitch: 0.9, rate: 0.95 },
      },
      'en-US': {
        female: { pitch: 1.0, rate: 1.0 },
        male: { pitch: 0.85, rate: 1.0 },
      },
      'es-ES': {
        female: { pitch: 1.05, rate: 0.9 },
        male: { pitch: 0.88, rate: 0.9 },
      },
    };

    return recommendations[language]?.[gender] || { pitch: 1.0, rate: 1.0 };
  }
}

export default new TTSService();
