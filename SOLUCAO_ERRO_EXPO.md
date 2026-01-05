# 🔧 SOLUÇÕES PARA ERRO "PlatformConstants could not be found"

## O que está acontecendo:
- ✅ Metro Bundler funcionando (1194 módulos carregados)
- ❌ Expo Go no celular não consegue carregar módulos nativos
- ❌ Erro: TurboModuleRegistry - PlatformConstants não encontrado

## 🎯 SOLUÇÃO 1: Limpar Cache (TENTE PRIMEIRO)

### No PC (PowerShell):

```powershell
# 1. Pare o Expo (Ctrl+C)

# 2. Limpe TODO o cache
cd C:\IA\lip-reading\Aventura-no-tempo\lip-reading-app
Remove-Item -Recurse -Force node_modules\.cache -ErrorAction SilentlyContinue
npx expo start --clear
```

### No Celular:

1. **Feche completamente o Expo Go** (arraste para fora dos apps recentes)
2. **Android: Configurações → Apps → Expo Go → Armazenamento:**
   - Toque em **"Limpar cache"**
   - Toque em **"Limpar dados"** (vai deslogar, tudo bem)
3. **Abra o Expo Go novamente**
4. **Escaneie o QR code de novo**

---

## 🎯 SOLUÇÃO 2: Build APK Direto (RECOMENDADO)

O Expo Go pode ter problemas com SDK 54 e módulos nativos. Melhor criar um APK:

### No PC (PowerShell):

```powershell
cd C:\IA\lip-reading\Aventura-no-tempo\lip-reading-app

# 1. Faça login no Expo (se ainda não fez)
eas login

# 2. Configure (primeira vez)
eas build:configure

# 3. Build APK
eas build --platform android --profile preview
```

**Aguarde ~10-15 minutos**

Quando terminar:
- ✅ Vai gerar um link para baixar o APK
- ✅ Baixe no celular e instale
- ✅ Não precisa mais do Expo Go!

---

## 🎯 SOLUÇÃO 3: Desenvolvimento Local (MAIS RÁPIDO)

Se tiver Android Studio instalado:

```powershell
# 1. Gere projeto Android nativo
npx expo prebuild --platform android --clean

# 2. Rode no emulador ou celular conectado via USB
npx expo run:android
```

---

## 📊 Qual solução usar?

| Solução | Tempo | Funciona? | Recomendação |
|---------|-------|-----------|--------------|
| **1. Limpar Cache** | 5 min | 50% chance | ⭐ Tente primeiro |
| **2. Build APK (EAS)** | 15 min | 95% chance | ⭐⭐⭐ Melhor opção |
| **3. Dev Local** | 10 min | 90% chance | ⭐⭐ Se tiver Android Studio |

---

## 🚀 RECOMENDAÇÃO FINAL

**Execute a SOLUÇÃO 2 (Build APK):**

É a forma mais confiável, vai gerar um APK instalável que não depende do Expo Go.

```powershell
cd C:\IA\lip-reading\Aventura-no-tempo\lip-reading-app
eas login
eas build --platform android --profile preview
```

Depois de 10-15 minutos:
1. ✅ Link do APK será exibido
2. ✅ Abra o link no celular
3. ✅ Baixe e instale
4. ✅ TESTE sem Expo Go!

---

**Qual solução você quer tentar? (Recomendo a 2)**
