import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { BodySmall, Button, Heading2, Logo } from '@/components/ui';
import { Colors, Spacing } from '@/constants';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Logo size="large" />
        <Heading2 style={styles.title}>WorthAI Modal</Heading2>
        <BodySmall color="textSecondary" style={styles.subtitle}>
          This is a modal screen with consistent branding
        </BodySmall>
        <Link href="/" dismissTo asChild>
          <Button title="Go to Home" variant="primary" style={styles.button} />
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  
  content: {
    alignItems: 'center',
    maxWidth: 300,
  },
  
  title: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  
  subtitle: {
    textAlign: 'center',
    marginBottom: Spacing.xl,
    lineHeight: 20,
  },
  
  button: {
    minWidth: 200,
  },
});
