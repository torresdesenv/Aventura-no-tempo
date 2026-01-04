export const LANGUAGES = [
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
];

export const VOICE_OPTIONS = [
  { id: 'female', name: 'Voz Feminina', icon: '👩' },
  { id: 'male', name: 'Voz Masculina', icon: '👨' },
];

export const MODES = {
  UPLOAD: 'upload',
  REALTIME: 'realtime',
};

export const VIDEO_FORMATS = [
  'mp4',
  'mov',
  'avi',
  'mkv',
  'webm',
];

export const SETTINGS_KEYS = {
  LANGUAGE_SOURCE: 'languageSource',
  LANGUAGE_TARGET: 'languageTarget',
  VOICE_GENDER: 'voiceGender',
  VOICE_SPEED: 'voiceSpeed',
  VOICE_PITCH: 'voicePitch',
  AUTO_TRANSLATE: 'autoTranslate',
  SHOW_CONFIDENCE: 'showConfidence',
  SAVE_HISTORY: 'saveHistory',
  THEME: 'theme',
};

export const DEFAULT_SETTINGS = {
  [SETTINGS_KEYS.LANGUAGE_SOURCE]: 'pt',
  [SETTINGS_KEYS.LANGUAGE_TARGET]: 'en',
  [SETTINGS_KEYS.VOICE_GENDER]: 'female',
  [SETTINGS_KEYS.VOICE_SPEED]: 1.0,
  [SETTINGS_KEYS.VOICE_PITCH]: 1.0,
  [SETTINGS_KEYS.AUTO_TRANSLATE]: true,
  [SETTINGS_KEYS.SHOW_CONFIDENCE]: true,
  [SETTINGS_KEYS.SAVE_HISTORY]: true,
  [SETTINGS_KEYS.THEME]: 'light',
};
