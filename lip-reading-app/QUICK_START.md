# 🚀 Guia Rápido de Início

Este guia irá ajudá-lo a executar o app em menos de 5 minutos!

## Passo 1: Instalar Dependências

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/lip-reading-app.git
cd lip-reading-app

# Instale as dependências
npm install
```

## Passo 2: Executar o App

### Opção A: Usar Expo Go (Mais Rápido)

1. Instale o app **Expo Go** no seu celular:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Inicie o servidor:
```bash
npm start
```

3. Escaneie o QR code que aparece no terminal com:
   - **iOS**: App da Câmera
   - **Android**: App Expo Go

### Opção B: Usar Simulador/Emulador

**iOS (requer macOS):**
```bash
npm run ios
```

**Android:**
```bash
npm run android
```

## Passo 3: Começar a Usar

1. Na tela inicial, escolha uma opção:
   - **📹 Carregar Vídeo**: Para testar com vídeos existentes
   - **📷 Câmera ao Vivo**: Para leitura labial em tempo real

2. Configure idiomas e voz em **⚙️ Configurações**

## ✅ Checklist de Primeiro Uso

- [ ] App está executando sem erros
- [ ] Permissões de câmera foram concedidas
- [ ] Consegue navegar entre telas
- [ ] TTS (Text-to-Speech) está funcionando

## 🆘 Problemas Comuns

### "Unable to resolve module"
```bash
npm start -- --reset-cache
```

### Permissões negadas
Vá em Configurações do iOS/Android → App → Permissões → Habilite Câmera

### App não abre
```bash
# Reinstale dependências
rm -rf node_modules
npm install
npm start
```

## 🎯 Próximos Passos

- Leia o [README completo](README.md)
- Configure [APIs de produção](README.md#-configuração-de-apis)
- Veja o [guia de contribuição](CONTRIBUTING.md)

## 📞 Precisa de Ajuda?

- Abra uma [issue no GitHub](https://github.com/seu-usuario/lip-reading-app/issues)
- Consulte a [documentação completa](README.md)

---

**Pronto! Você já pode começar a usar o app! 🎉**
