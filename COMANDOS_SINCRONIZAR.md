# 🔧 Comandos para Sincronizar - Execute na Ordem

## Situação Atual
Você tem alterações locais que conflitam com as atualizações do Git.

## Solução: Descartar alterações locais e pegar versões corretas

### **Execute estes comandos no PowerShell:**

```powershell
# 1. Entre na pasta do projeto
cd C:\IA\lip-reading\Aventura-no-tempo

# 2. Descarte as alterações locais e pegue as versões do Git
git checkout -- lip-reading-app/package.json
git checkout -- lip-reading-app/src/services/LipReadingService.js

# 3. Remova o package-lock.json local (será recriado)
Remove-Item lip-reading-app\package-lock.json -Force

# 4. Agora faça o pull
git pull origin claude/lip-reading-translation-app-Zts6D

# 5. Entre na pasta do app
cd lip-reading-app

# 6. Remova node_modules e package-lock.json antigos
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue

# 7. Instale as dependências do SDK 54
npm install

# 8. Verifique que está no SDK 54
Select-String -Path package.json -Pattern '"expo":'

# 9. Inicie o Expo
npm start
```

---

## ✅ O que cada comando faz:

1. **git checkout --** = Descarta alterações locais e restaura versão do Git
2. **Remove-Item** = Remove arquivo temporário
3. **git pull** = Baixa as atualizações (SDK 54)
4. **npm install** = Instala dependências corretas do SDK 54
5. **npm start** = Inicia o servidor Expo

---

## 📋 Copie e cole bloco por bloco:

### **Bloco 1: Preparar**
```powershell
cd C:\IA\lip-reading\Aventura-no-tempo
git checkout -- lip-reading-app/package.json
git checkout -- lip-reading-app/src/services/LipReadingService.js
Remove-Item lip-reading-app\package-lock.json -Force
```

### **Bloco 2: Baixar atualizações**
```powershell
git pull origin claude/lip-reading-translation-app-Zts6D
```

Deve mostrar:
```
Updating 92ba644..f0f308c
Fast-forward
 COMO_TESTAR_AGORA.md                  | 166 +++
 RESUMO_ATUALIZACAO.md                 | 276 +++
 TESTING_GUIDE.md                      | 118 ++
 lip-reading-app/package.json          | 22 +-
 lip-reading-app/package-lock.json     | mudanças...
 ...
```

### **Bloco 3: Reinstalar dependências**
```powershell
cd lip-reading-app
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
npm install
```

Aguarde ~2 minutos instalando...

### **Bloco 4: Verificar e iniciar**
```powershell
Select-String -Path package.json -Pattern '"expo":'
```

Deve mostrar: **"expo": "~54.0.0"**

```powershell
npm start
```

---

## 🎯 Depois que o Expo iniciar:

1. ✅ Vai aparecer o QR code
2. ✅ Abra **Expo Go** no celular
3. ✅ Escaneie o QR code
4. ✅ Aguarde carregar
5. ✅ **TESTE!** 🚀

---

**Execute agora e me avise quando chegar no npm start!**
