import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.title}>About KulturalBox</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.aboutText}>
          KulturalBox is your gateway to a taste of home, specially designed for Nigerians in the diaspora. We bring you the finest Nigerian foodstuffs, spices, and delicacies, allowing you to stay connected to your roots, no matter where you are in the world.
        </Text>

        {/* Google Map */}
        <Text style={styles.sectionTitle}>Find Us Here</Text>
        <View style={styles.mapContainer}>
          <WebView
            source={{
              uri: `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(
                'The City Mall, Onikan, Lagos, Nigeria'
              )}`,
            }}
            style={styles.map}
          />
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>Contact Us</Text>
        <Text style={styles.footerText}>Address: The City Mall, Onikan, Lagos, Nigeria</Text>
        <Text style={styles.footerText}>Phone: +234 912 390 7060</Text>
        <TouchableOpacity onPress={() => Linking.openURL('mailto:info@kulturalbox.com')}>
          <Text style={[styles.footerText, styles.email]}>info@kulturalbox.com</Text>
        </TouchableOpacity>

        {/* Social Media Links */}
        <View style={styles.socialLinks}>
          <TouchableOpacity onPress={() => Linking.openURL('https://facebook.com/kulturalbox')}>
            <Icon name="facebook" size={24} color="#FFF" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com/kulturalbox')}>
            <Icon name="twitter" size={24} color="#FFF" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://instagram.com/kulturalbox')}>
            <Icon name="instagram" size={24} color="#FFF" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://linkedin.com/company/kulturalbox')}>
            <Icon name="linkedin" size={24} color="#FFF" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AboutScreen;

// Same styles as FoodDeckAbout
