# 🛠️ BUILD ALTERNATIVO - APK Local

O EAS Build está falhando com erros do Gradle. Vamos tentar métodos alternativos.

---

## 🎯 MÉTODO 1: Expo Prebuild + Gradle Local (RECOMENDADO)

Este método cria o projeto Android nativo localmente e faz o build na sua máquina.

### **Pré-requisitos:**
- Node.js instalado ✅ (você já tem)
- Java JDK 17+ instalado
- Android SDK instalado (via Android Studio)

### **Passos:**

#### 1. Instale o JDK 17 (se não tiver)
```powershell
# Baixe e instale: https://adoptium.net/temurin/releases/
# Ou use: winget install -e --id EclipseAdoptium.Temurin.17.JDK
```

#### 2. Instale o Android Studio (se não tiver)
```powershell
# Baixe: https://developer.android.com/studio
# Durante instalação, marque: Android SDK, Android SDK Platform, Android Virtual Device
```

#### 3. Configure variáveis de ambiente
```powershell
# Abra: Configurações do Sistema → Variáveis de Ambiente
# Adicione:
ANDROID_HOME = C:\Users\[seu-usuario]\AppData\Local\Android\Sdk
JAVA_HOME = C:\Program Files\Eclipse Adoptium\jdk-17.x.x

# Adicione ao PATH:
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\tools
%JAVA_HOME%\bin
```

#### 4. Gere o projeto Android nativo
```powershell
cd C:\IA\lip-reading\Aventura-no-tempo\lip-reading-app
npx expo prebuild --platform android --clean
```

#### 5. Build o APK localmente
```powershell
cd android
.\gradlew assembleRelease
```

⏳ **Aguarde 5-10 minutos...**

#### 6. APK estará em:
```
android\app\build\outputs\apk\release\app-release.apk
```

#### 7. Transfira para o celular e instale!

---

## 🎯 MÉTODO 2: Expo Development Build (Mais Simples)

Cria um APK de desenvolvimento que funciona como Expo Go, mas com suas dependências.

```powershell
cd C:\IA\lip-reading\Aventura-no-tempo\lip-reading-app

# Build APK de desenvolvimento
eas build --profile development --platform android
```

Depois que instalar o APK:
```powershell
# Inicie o servidor
npx expo start --dev-client
```

O app se conectará ao Metro Bundler automaticamente.

---

## 🎯 MÉTODO 3: APK Debug Simples (MAIS RÁPIDO)

Se você só quer testar rapidamente:

```powershell
cd C:\IA\lip-reading\Aventura-no-tempo\lip-reading-app

# 1. Gere projeto nativo
npx expo prebuild --platform android

# 2. Build APK debug (mais rápido que release)
cd android
.\gradlew assembleDebug

# 3. APK estará em:
# android\app\build\outputs\apk\debug\app-debug.apk
```

---

## 🎯 MÉTODO 4: Usar Serviço Online Alternativo

### **AppCenter (Microsoft)**
```powershell
npm install -g appcenter-cli
appcenter login
appcenter build queue
```

### **GitHub Actions** (Build na nuvem grátis)
Posso criar um workflow do GitHub Actions que faz o build automaticamente quando você fizer push.

---

## ❓ Qual método você prefere?

**A) Método 1** - Build local completo (precisa instalar JDK + Android Studio)
  - ⏰ Tempo: 30 min setup + 10 min build
  - ✅ Mais controle, builds futuros mais rápidos

**B) Método 2** - Development Build via EAS
  - ⏰ Tempo: 15 min
  - ✅ Mais fácil, mas precisa do servidor rodando

**C) Método 3** - APK Debug local
  - ⏰ Tempo: 15 min setup + 5 min build
  - ✅ Mais rápido para teste

**D) Método 4** - GitHub Actions
  - ⏰ Tempo: 20 min configuração inicial
  - ✅ Automático, não usa sua máquina

**E) Continuar tentando EAS** (debug o erro do Gradle)
  - ⏰ Tempo: variável
  - ❓ Pode funcionar ou não

---

## 💡 Minha Recomendação

Se você **já tem Android Studio instalado** → **Método 3** (mais rápido)

Se você **não tem nada instalado** → **Método 4** (GitHub Actions - automático)

Se você **quer aprender e ter controle** → **Método 1** (build local completo)

---

**Me avise qual método você quer tentar!**
