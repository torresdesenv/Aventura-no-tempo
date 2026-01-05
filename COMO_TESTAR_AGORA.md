# 🚀 INSTRUÇÕES PARA TESTAR AGORA

## ✅ Atualização Concluída!

O projeto foi atualizado de **Expo SDK 49** para **SDK 54**, compatível com o Expo Go instalado no seu celular.

---

## 📱 PASSOS PARA TESTAR (5 minutos)

### Passo 1: Certifique-se que o servidor Python está rodando

```bash
cd C:\Users\[seu-usuario]\lipnet-backend\simple-lipnet-api
python lipnet_server.py
```

✅ Deve mostrar: `Running on http://0.0.0.0:5000`

**Deixe este terminal aberto!**

---

### Passo 2: Abra um NOVO terminal e inicie o Expo

```bash
cd C:\Users\[seu-usuario]\Aventura-no-tempo\lip-reading-app
npm start
```

**O que vai acontecer:**
1. Expo vai iniciar o Metro Bundler
2. Vai aparecer um QR code no terminal
3. Vai mostrar algo como:

```
› Metro waiting on exp://192.168.0.165:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web

› Press j │ open developer menu
› Press r │ reload app
› Press m │ toggle menu
› Press ? │ show all commands
```

---

### Passo 3: No celular Android

1. **Abra o app Expo Go** (já instalado)
2. **Toque em "Scan QR code"** ou use a câmera para escanear
3. **Escaneie o QR code** que aparece no terminal do PC
4. **Aguarde 1-2 minutos** enquanto o app carrega
5. **Aceite permissões** de câmera quando solicitado

✅ O app deve abrir mostrando a tela inicial com 4 botões!

---

### Passo 4: Teste as funcionalidades

#### Teste 1: Upload de Vídeo
1. Toque em **"📹 Carregar Vídeo"**
2. Selecione um vídeo curto (máx 30 segundos) com uma pessoa falando
3. Aguarde o processamento
4. Veja o resultado: texto reconhecido + % de confiança

#### Teste 2: Câmera ao Vivo
1. Volte à tela inicial
2. Toque em **"📷 Câmera ao Vivo"**
3. Permita acesso à câmera (se ainda não permitiu)
4. Posicione seu rosto na frente da câmera
5. Mova os lábios falando
6. Aguarde alguns segundos
7. Veja o resultado na tela

---

## 🐛 Soluções de Problemas

### Problema: "Could not connect to development server"

**Solução:**
1. Certifique-se que PC e celular estão na **mesma rede WiFi**
2. No terminal do Expo, pressione `r` para reload
3. Ou tente escanear o QR code novamente

### Problema: "Network request failed" no upload de vídeo

**Solução:**
1. Verifique que o servidor Python está rodando
2. Teste no navegador do celular: `http://192.168.0.165:5000/api/health`
3. Deve retornar: `{"status": "ok"}`

### Problema: Expo não inicia / fica travado

**Solução:**
```bash
# Pare o processo atual (Ctrl+C)
# Limpe o cache e tente novamente:
npm start -- --clear
```

### Problema: "The package ... would you like to install it?"

**Resposta:** Digite `Y` e pressione Enter

---

## 📊 Verificação de Sucesso

Quando tudo estiver funcionando, você verá:

✅ Terminal 1: `Running on http://0.0.0.0:5000` (Python)
✅ Terminal 2: QR code + `Metro waiting on exp://192.168.0.165:8081`
✅ Celular: App aberto com tela inicial
✅ Upload: Vídeo processado com texto reconhecido
✅ Câmera: Captura em tempo real funcionando

---

## 🎯 O que mudou nesta atualização?

1. ✅ **SDK atualizado**: Expo 49 → 54 (compatível com seu Expo Go)
2. ✅ **IP configurado**: `192.168.0.165` (conecta ao PC)
3. ✅ **TensorFlow removido**: Sem conflitos de dependências
4. ✅ **Dependências limpas**: Todas as bibliotecas atualizadas

---

## 📞 Precisa de Ajuda?

Se tiver problemas:
1. Tire print do erro que aparece
2. Verifique os logs do servidor Python (terminal 1)
3. Verifique os logs do Expo (terminal 2)
4. Confirme que está na mesma rede WiFi

---

## 🚀 COMEÇE AGORA!

**Execute estes 2 comandos em terminais separados:**

**Terminal 1:**
```bash
cd C:\Users\[seu-usuario]\lipnet-backend\simple-lipnet-api
python lipnet_server.py
```

**Terminal 2:**
```bash
cd C:\Users\[seu-usuario]\Aventura-no-tempo\lip-reading-app
npm start
```

**No celular: Expo Go → Scan QR code**

---

**Boa sorte! 🎉**

