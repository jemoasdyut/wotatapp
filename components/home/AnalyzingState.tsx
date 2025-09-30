import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { BodySmall, Card, Heading3, Text } from '@/components/ui';
import { Colors, Spacing } from '@/constants';

export default function AnalyzingState() {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const dot1Anim = useRef(new Animated.Value(0.3)).current;
  const dot2Anim = useRef(new Animated.Value(0.3)).current;
  const dot3Anim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    // Pulse animation for the icon
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    // Dot animations with staggered timing
    const dotAnimation = Animated.loop(
      Animated.stagger(200, [
        Animated.sequence([
          Animated.timing(dot1Anim, { toValue: 1, duration: 400, useNativeDriver: true }),
          Animated.timing(dot1Anim, { toValue: 0.3, duration: 400, useNativeDriver: true }),
        ]),
        Animated.sequence([
          Animated.timing(dot2Anim, { toValue: 1, duration: 400, useNativeDriver: true }),
          Animated.timing(dot2Anim, { toValue: 0.3, duration: 400, useNativeDriver: true }),
        ]),
        Animated.sequence([
          Animated.timing(dot3Anim, { toValue: 1, duration: 400, useNativeDriver: true }),
          Animated.timing(dot3Anim, { toValue: 0.3, duration: 400, useNativeDriver: true }),
        ]),
      ])
    );

    pulseAnimation.start();
    dotAnimation.start();

    return () => {
      pulseAnimation.stop();
      dotAnimation.stop();
    };
  }, [pulseAnim, dot1Anim, dot2Anim, dot3Anim]);

  return (
    <View style={styles.container}>
      <Card style={styles.analyzingCard}>
        <View style={styles.analyzingContent}>
          <View style={styles.iconContainer}>
            <Animated.View style={[styles.iconBackground, { transform: [{ scale: pulseAnim }] }]}>
              <Text style={styles.analyzingIcon}>🤖</Text>
            </Animated.View>
          </View>
          <Heading3 style={styles.analyzingTitle}>Analyzing Your Product...</Heading3>
          <BodySmall color="textSecondary" style={styles.analyzingSubtitle}>
            Our AI is analyzing your product details and market data
          </BodySmall>
          <View style={styles.loadingDots}>
            <Animated.View style={[styles.dot, { opacity: dot1Anim }]} />
            <Animated.View style={[styles.dot, { opacity: dot2Anim }]} />
            <Animated.View style={[styles.dot, { opacity: dot3Anim }]} />
          </View>
          <View style={styles.progressIndicator}>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  analyzingCard: {
    marginBottom: Spacing.lg,
  },

  analyzingContent: {
    alignItems: 'center',
    paddingVertical: Spacing['2xl'],
  },

  iconContainer: {
    marginBottom: Spacing.lg,
  },

  iconBackground: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },

  analyzingIcon: {
    fontSize: 40,
    lineHeight: 48,
  },

  analyzingTitle: {
    marginBottom: Spacing.sm,
    textAlign: 'center',
    letterSpacing: -0.3,
  },

  analyzingSubtitle: {
    marginBottom: Spacing.xl,
    textAlign: 'center',
    paddingHorizontal: Spacing.lg,
    lineHeight: 20,
  },

  loadingDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
    marginHorizontal: 6,
  },

  progressIndicator: {
    width: '80%',
    alignItems: 'center',
  },

  progressBar: {
    width: '100%',
    height: 3,
    backgroundColor: Colors.borderLight,
    borderRadius: 2,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    width: '60%',
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
});
