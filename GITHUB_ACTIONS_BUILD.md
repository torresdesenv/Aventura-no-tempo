# 🤖 Build Automático com GitHub Actions

## ✅ O Mais Fácil - Sem Instalar Nada!

Criei um workflow do GitHub Actions que faz o build do APK automaticamente na nuvem do GitHub, GRÁTIS!

---

## 🚀 Como Usar:

### **Método 1: Build Automático (ao fazer push)**

Sempre que você fizer push para o branch `claude/lip-reading-translation-app-Zts6D`, o GitHub vai:
1. ✅ Instalar todas as dependências
2. ✅ Fazer o build do APK
3. ✅ Disponibilizar o APK para download

### **Método 2: Build Manual (clique de botão)**

1. **Acesse seu repositório no GitHub:**
   ```
   https://github.com/torresdesenv/Aventura-no-tempo
   ```

2. **Clique na aba "Actions"** (no topo)

3. **No menu lateral, clique em "Build Android APK"**

4. **Clique no botão "Run workflow"** (canto direito)

5. **Selecione o branch:** `claude/lip-reading-translation-app-Zts6D`

6. **Clique em "Run workflow"** (botão verde)

7. **Aguarde 10-15 minutos** ⏰

8. **Quando terminar:**
   - ✅ Aparecerá um ✓ verde
   - ✅ Clique no workflow concluído
   - ✅ Role para baixo até "Artifacts"
   - ✅ Baixe o arquivo **"app-release"**
   - ✅ Extraia o .apk
   - ✅ Transfira para o celular e instale!

---

## 📱 Instalando o APK no Celular

### **Opção A: Por cabo USB**
1. Conecte o celular no PC
2. Copie o `app-release.apk` para a pasta Downloads do celular
3. No celular: Arquivos → Downloads → Toque no APK
4. Permita "Instalar de fontes desconhecidas" (se pedir)
5. Instale!

### **Opção B: Via Google Drive / OneDrive**
1. Faça upload do APK para o Drive
2. No celular, abra o Drive
3. Baixe o APK
4. Toque no arquivo baixado
5. Permita "Instalar de fontes desconhecidas" (se pedir)
6. Instale!

### **Opção C: Via cabo de dados (ADB)**
```powershell
# Se tiver ADB instalado:
adb install app-release.apk
```

---

## 🔍 Monitorar o Build

1. Vá em: https://github.com/torresdesenv/Aventura-no-tempo/actions

2. Clique no workflow em execução

3. Veja o progresso em tempo real:
   - ⏳ Checkout repository
   - ⏳ Setup Node.js
   - ⏳ Setup Java
   - ⏳ Setup Android SDK
   - ⏳ Install dependencies
   - ⏳ Setup Expo
   - ⏳ Build Android APK
   - ⏳ Upload APK
   - ✅ Concluído!

---

## ⚡ Primeira Vez - Ativar GitHub Actions

Se for a primeira vez usando Actions no repositório:

1. Vá em: **Settings** (configurações do repo)
2. **Actions** → **General**
3. **Workflow permissions:**
   - Marque: **"Read and write permissions"**
   - Marque: **"Allow GitHub Actions to create and approve pull requests"**
4. Clique em **Save**

---

## 📊 Vantagens deste Método:

✅ **Não precisa instalar nada** no seu PC (nem JDK, nem Android Studio)
✅ **Build na nuvem** - não usa recursos da sua máquina
✅ **Grátis** - GitHub Actions é gratuito para repos públicos
✅ **Automático** - todo push gera novo APK
✅ **Armazena APKs** - fica disponível por 30 dias
✅ **Cria releases** - quando executa manualmente

---

## 🎯 COMECE AGORA!

### **Passo 1: Sincronize o código**

```powershell
cd C:\IA\lip-reading\Aventura-no-tempo
git pull origin claude/lip-reading-translation-app-Zts6D
git push origin claude/lip-reading-translation-app-Zts6D
```

### **Passo 2: Acesse GitHub Actions**

```
https://github.com/torresdesenv/Aventura-no-tempo/actions
```

### **Passo 3: Execute o workflow**

1. Clique em "Build Android APK" (menu lateral)
2. "Run workflow" → Selecione o branch → "Run workflow"
3. Aguarde ~10-15 minutos
4. Baixe o APK dos Artifacts

### **Passo 4: Instale no celular e teste!** 🚀

---

**É o método mais fácil e confiável!**
