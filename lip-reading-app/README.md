# 🗣️ LipRead Translator

**Aplicativo de Leitura Labial e Tradução em Tempo Real**

Um aplicativo React Native para iOS e Android que utiliza Inteligência Artificial para fazer leitura labial de vídeos e câmera ao vivo, traduzindo para múltiplos idiomas com síntese de voz.

---

## ✨ Funcionalidades

### 📹 Principais
- **Upload de Vídeo**: Carregue vídeos e selecione a pessoa para leitura labial
- **Câmera em Tempo Real**: Leitura labial ao vivo usando a câmera do dispositivo
- **Detecção Facial**: Identificação automática de múltiplas pessoas no vídeo
- **Tradução Automática**: Suporte para 9+ idiomas
- **Text-to-Speech**: Voz feminina e masculina com personalização

### 🎯 Recursos Avançados
- Seleção de idioma de origem e destino
- Ajuste de velocidade e tom da voz
- Indicador de confiança da leitura labial
- Interface limpa e intuitiva
- Modo claro/escuro (planejado)
- Histórico de traduções (planejado)

---

## 🚀 Tecnologias Utilizadas

- **React Native** 0.72.3
- **Expo** 49.0.0
- **React Navigation** 6.x
- **TensorFlow.js** (para ML)
- **Expo Camera** (câmera)
- **Expo Speech** (TTS)
- **Expo Image Picker** (seleção de vídeos)
- **AsyncStorage** (persistência)

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** >= 16.x
- **npm** ou **yarn**
- **Expo CLI**: `npm install -g expo-cli`
- **Git**

### Para desenvolvimento iOS:
- **macOS** com Xcode instalado
- **CocoaPods**: `sudo gem install cocoapods`

### Para desenvolvimento Android:
- **Android Studio** com SDK configurado
- **Java JDK** >= 11

---

## 🔧 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/lip-reading-app.git
cd lip-reading-app
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
```

### 3. Instale dependências do iOS (somente macOS)

```bash
cd ios
pod install
cd ..
```

---

## 🎮 Como Executar

### Modo de Desenvolvimento com Expo

```bash
# Iniciar servidor de desenvolvimento
npm start
# ou
expo start
```

Isso abrirá o Expo Dev Tools no navegador. A partir daí você pode:

- Pressionar `i` para abrir no simulador iOS
- Pressionar `a` para abrir no emulador Android
- Escanear o QR code com o app Expo Go no seu dispositivo físico

### iOS (Simulador)

```bash
npm run ios
# ou
expo start --ios
```

### Android (Emulador)

```bash
npm run android
# ou
expo start --android
```

### Web (Preview)

```bash
npm run web
# ou
expo start --web
```

---

## 📱 Estrutura do Projeto

```
lip-reading-app/
├── App.js                      # Componente principal
├── app.json                    # Configuração do Expo
├── package.json                # Dependências
├── babel.config.js             # Configuração Babel
├── metro.config.js             # Configuração Metro
├── assets/                     # Imagens e ícones
├── src/
│   ├── components/            # Componentes reutilizáveis
│   │   ├── Button.js
│   │   ├── Card.js
│   │   ├── Header.js
│   │   ├── VoiceSelector.js
│   │   ├── LanguageSelector.js
│   │   └── TranslationDisplay.js
│   ├── screens/               # Telas do app
│   │   ├── HomeScreen.js
│   │   ├── UploadVideoScreen.js
│   │   ├── RealtimeCameraScreen.js
│   │   └── SettingsScreen.js
│   ├── navigation/            # Navegação
│   │   └── AppNavigator.js
│   ├── services/              # Serviços e APIs
│   │   ├── LipReadingService.js
│   │   ├── TranslationService.js
│   │   ├── TTSService.js
│   │   └── FaceDetectionService.js
│   ├── utils/                 # Utilitários
│   │   └── constants.js
│   └── styles/                # Estilos globais
│       ├── colors.js
│       └── globalStyles.js
└── README.md
```

---

## 🔑 Configuração de APIs

Este projeto utiliza serviços de ML e tradução. Para produção, você precisará configurar:

### 1. Google Translate API

Edite `src/services/TranslationService.js`:

```javascript
this.apiKey = 'SUA_CHAVE_API_GOOGLE_TRANSLATE';
```

[Obtenha uma chave aqui](https://cloud.google.com/translate/docs/setup)

### 2. Modelo de Leitura Labial

O serviço atual usa simulação. Para produção, integre com:

- **LipNet** - Modelo de deep learning para leitura labial
- **Google Cloud Video Intelligence API**
- **Azure Video Analyzer**
- **Modelo personalizado treinado**

Edite `src/services/LipReadingService.js` para carregar seu modelo:

```javascript
this.model = await tf.loadLayersModel('path/to/your/model.json');
```

### 3. Detecção Facial

Configure detecção facial real editando `src/services/FaceDetectionService.js`:

```javascript
import * as FaceDetector from 'expo-face-detector';
// Ou use MediaPipe, ML Kit, etc.
```

---

## 🎨 Personalização

### Cores

Edite `src/styles/colors.js` para alterar o tema:

```javascript
export const colors = {
  primary: '#6366f1',      // Cor principal
  secondary: '#ec4899',    // Cor secundária
  accent: '#10b981',       // Cor de destaque
  // ...
};
```

### Idiomas Suportados

Adicione mais idiomas em `src/utils/constants.js`:

```javascript
export const LANGUAGES = [
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  // Adicione mais aqui
];
```

---

## 📦 Build para Produção

### Build Android (APK)

```bash
# Build de desenvolvimento
expo build:android -t apk

# Build de produção (AAB para Play Store)
expo build:android -t app-bundle
```

### Build iOS (IPA)

```bash
# Build para dispositivos
expo build:ios -t archive

# Build para simulador
expo build:ios -t simulator
```

### EAS Build (Recomendado)

```bash
# Instalar EAS CLI
npm install -g eas-cli

# Login no Expo
eas login

# Configurar projeto
eas build:configure

# Build Android
eas build --platform android

# Build iOS
eas build --platform ios
```

---

## 🧪 Testes

```bash
# Executar testes
npm test

# Testes com coverage
npm run test:coverage

# Testes em watch mode
npm run test:watch
```

---

## 🐛 Solução de Problemas

### Erro: "Unable to resolve module"

```bash
# Limpar cache
npm start -- --reset-cache
# ou
expo start -c
```

### Erro de permissões (iOS)

Certifique-se de ter as permissões em `app.json`:

```json
"ios": {
  "infoPlist": {
    "NSCameraUsageDescription": "Precisamos de acesso à câmera...",
    "NSMicrophoneUsageDescription": "Precisamos de acesso ao microfone..."
  }
}
```

### Erro de permissões (Android)

Verifique `app.json`:

```json
"android": {
  "permissions": [
    "CAMERA",
    "RECORD_AUDIO",
    "READ_EXTERNAL_STORAGE"
  ]
}
```

### Problemas com Expo Go

Se o app não funcionar no Expo Go devido a dependências nativas, use:

```bash
expo prebuild
npm run ios
# ou
npm run android
```

---

## 🚧 Roadmap

### Versão 1.1 (Planejado)
- [ ] Histórico de traduções
- [ ] Exportar transcrições (PDF, TXT)
- [ ] Modo offline
- [ ] Suporte a mais idiomas
- [ ] Tema escuro/claro

### Versão 1.2 (Planejado)
- [ ] Modo reunião (múltiplas pessoas)
- [ ] Integração com Zoom/Meet
- [ ] Compartilhamento de traduções
- [ ] Nuvem de sincronização

### Versão 2.0 (Futuro)
- [ ] Modelo de ML próprio treinado
- [ ] Processamento 100% offline
- [ ] Reconhecimento de gestos
- [ ] Suporte a linguagem de sinais

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👥 Autores

- **Seu Nome** - *Desenvolvimento inicial* - [GitHub](https://github.com/seu-usuario)

---

## 📞 Suporte

- **Issues**: [GitHub Issues](https://github.com/seu-usuario/lip-reading-app/issues)
- **Email**: seu-email@exemplo.com
- **Discord**: [Link do servidor](https://discord.gg/seu-servidor)

---

## 🙏 Agradecimentos

- Expo Team pelo framework incrível
- Comunidade React Native
- Pesquisadores de ML em lip reading
- Todos os contribuidores

---

## 📚 Recursos Adicionais

### Documentação
- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [TensorFlow.js](https://www.tensorflow.org/js)

### Tutoriais de Lip Reading
- [LipNet Paper](https://arxiv.org/abs/1611.01599)
- [Lip Reading Tutorial](https://github.com/topics/lip-reading)
- [MediaPipe Face Mesh](https://google.github.io/mediapipe/solutions/face_mesh.html)

### APIs Úteis
- [Google Cloud Translation](https://cloud.google.com/translate)
- [Azure Translator](https://azure.microsoft.com/en-us/services/cognitive-services/translator/)
- [Google Cloud Video Intelligence](https://cloud.google.com/video-intelligence)

---

## 📊 Status do Projeto

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React Native](https://img.shields.io/badge/React%20Native-0.72.3-blue.svg)
![Expo](https://img.shields.io/badge/Expo-49.0.0-black.svg)

---

**Desenvolvido com ❤️ para tornar a comunicação mais acessível**
