# 📱 Guia de Teste - App de Leitura Labial

## ✅ Alterações Realizadas

1. **IP Atualizado**: LipReadingService.js agora usa `http://192.168.0.165:5000/api`
2. **TensorFlow Removido**: Dependências conflitantes foram removidas
3. **API Flask Integrada**: App agora se conecta ao backend Python real

## 🚀 Como Testar AGORA (Opção Rápida - Expo Go)

### Passo 1: Certifique-se que o servidor Flask está rodando

No terminal do backend Python:
```bash
cd /lipnet-backend/simple-lipnet-api
python lipnet_server.py
```

Deve mostrar: `Running on http://0.0.0.0:5000`

### Passo 2: Inicie o servidor Expo

No terminal da aplicação (esta pasta):
```bash
cd /home/user/Aventura-no-tempo/lip-reading-app
npm start
```

### Passo 3: No seu celular Android

1. Instale o **Expo Go** da Play Store (se ainda não tem)
2. Certifique-se que o celular está na mesma rede WiFi (192.168.0.x)
3. Abra o Expo Go
4. Escaneie o QR code que aparece no terminal
5. Aguarde o app carregar

### Passo 4: Teste as funcionalidades

#### Teste 1: Upload de Vídeo
1. Toque em "📹 Carregar Vídeo"
2. Selecione um vídeo curto (máx 30 segundos)
3. Aguarde o processamento
4. Verifique o texto reconhecido e a confiança

#### Teste 2: Câmera ao Vivo
1. Toque em "📷 Câmera ao Vivo"
2. Permita acesso à câmera
3. Posicione o rosto na frente da câmera
4. Mova os lábios falando
5. Aguarde o processamento

## 🔧 Como Fazer Novo Build APK (Opção Completa)

Se quiser um APK instalável permanente:

### Opção A: EAS Build (Requer login Expo)

```bash
# 1. Faça login no Expo
eas login

# 2. Configure (se primeira vez)
eas build:configure

# 3. Build APK
eas build --platform android --profile preview

# 4. Aguarde ~10-15 minutos
# 5. Baixe o APK do link fornecido
```

### Opção B: Build Local (Mais Complexo)

```bash
# 1. Gere projeto nativo
npx expo prebuild --platform android

# 2. Build com Gradle
cd android
./gradlew assembleRelease

# 3. APK estará em: android/app/build/outputs/apk/release/
```

## 🐛 Solução de Problemas

### "Não consegue conectar ao servidor"

1. Verifique se o servidor Python está rodando:
   ```bash
   curl http://192.168.0.165:5000/api/health
   ```

2. Verifique o firewall Windows:
   ```powershell
   netsh advfirewall firewall show rule name="Python Flask Port 5000"
   ```

3. Teste do celular:
   - Abra o navegador do celular
   - Acesse: `http://192.168.0.165:5000/api/health`
   - Deve retornar JSON com status

### "Expo Go mostra erro"

1. Certifique-se que está na mesma rede WiFi
2. Limpe o cache: `npm start -- --reset-cache`
3. Reinstale node_modules:
   ```bash
   rm -rf node_modules
   npm install
   npm start
   ```

### "Vídeo não processa"

1. Verifique logs do servidor Python
2. Teste com vídeo menor (< 10 segundos)
3. Certifique-se que há faces visíveis no vídeo

## 📊 Logs Úteis

### Ver logs do app:
- No terminal onde rodou `npm start`, pressione `r` para reload
- Pressione `j` para abrir React DevTools

### Ver logs do servidor Python:
- Verifique o terminal onde rodou `lipnet_server.py`
- Procure por "Processing video" ou mensagens de erro

## ✅ Checklist de Funcionamento

- [ ] Servidor Flask rodando em 192.168.0.165:5000
- [ ] Firewall liberado para porta 5000
- [ ] Celular e PC na mesma rede WiFi
- [ ] Expo Go instalado no celular
- [ ] QR code escaneado e app aberto
- [ ] Permissões de câmera concedidas
- [ ] Upload de vídeo funciona
- [ ] Câmera ao vivo funciona

---

**Última atualização**: Código atualizado com IP correto (192.168.0.165)
**Commit**: 69e6e21 - "fix: Update LipReadingService to use correct IP address"
