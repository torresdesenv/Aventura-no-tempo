import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { colors } from '../styles/colors';
import { globalStyles } from '../styles/globalStyles';

export const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={[colors.primary, colors.primaryDark]}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>LipRead Translator</Text>
        <Text style={styles.headerSubtitle}>
          Leitura Labial e Tradução em Tempo Real
        </Text>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.sectionTitle}>Como você deseja começar?</Text>

        <Card
          icon="📹"
          title="Carregar Vídeo"
          description="Faça upload de um vídeo e selecione a pessoa para leitura labial"
          onPress={() => navigation.navigate('UploadVideo')}
          style={styles.card}
        />

        <Card
          icon="📷"
          title="Câmera em Tempo Real"
          description="Use a câmera para fazer leitura labial ao vivo"
          onPress={() => navigation.navigate('RealtimeCamera')}
          style={styles.card}
        />

        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>Recursos do App</Text>

          <View style={styles.featureRow}>
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>🗣️</Text>
              <Text style={styles.featureText}>Leitura Labial IA</Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>🌍</Text>
              <Text style={styles.featureText}>Múltiplos Idiomas</Text>
            </View>
          </View>

          <View style={styles.featureRow}>
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>🔊</Text>
              <Text style={styles.featureText}>Text-to-Speech</Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>👥</Text>
              <Text style={styles.featureText}>Múltiplas Pessoas</Text>
            </View>
          </View>

          <View style={styles.featureRow}>
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>⚡</Text>
              <Text style={styles.featureText}>Tempo Real</Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>♿</Text>
              <Text style={styles.featureText}>Acessibilidade</Text>
            </View>
          </View>
        </View>

        <Button
          title="Configurações"
          variant="outline"
          icon="⚙️"
          onPress={() => navigation.navigate('Settings')}
          style={styles.settingsButton}
        />

        <View style={styles.infoBox}>
          <Text style={styles.infoIcon}>💡</Text>
          <Text style={styles.infoText}>
            Dica: Para melhores resultados, certifique-se de que os lábios
            estão bem visíveis e com boa iluminação.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 30,
    paddingTop: 40,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
  },
  card: {
    marginBottom: 16,
  },
  featuresContainer: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  feature: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: colors.background,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  featureIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  settingsButton: {
    marginBottom: 20,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: colors.info + '20',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: colors.info,
  },
  infoIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
});
