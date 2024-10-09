import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
//import { useNavigation } from '@react-navigation/native';


//const navigation = useNavigation();

const HelpScreen = ({ navigation }) => {
  // Sample FAQs data
  const faqs = [
    { question: 'How do I create an account?', answer: 'To create an account, go to the registration page...' },
    { question: 'What is the return policy?', answer: 'You can return items within 30 days of purchase...' },
    { question: 'How can I track my order?', answer: 'You can track your order using the tracking page...' },
    { question: 'What payment methods are accepted?', answer: 'We accept credit cards, debit cards, and PayPal...' },
  ];

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleFAQ = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleSubsectionPress = () => {
    // Navigate to contact page (this can be updated later)
    navigation.navigate('Contact');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* First Section */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Get Help</Text>
        {['Accounts', 'Logistics Query', 'Shopping Guide', 'Payments', 'Return and Refund'].map((title, index) => (
          <TouchableOpacity key={index} style={styles.subsection} onPress={handleSubsectionPress}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>🔍</Text> {/* Replace with your icon */}
            </View>
            <Text style={styles.subsectionTitle}>{title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Second Section */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>FAQs</Text>
        {faqs.map((faq, index) => (
          <View key={index}>
            <TouchableOpacity onPress={() => toggleFAQ(index)} style={styles.faqQuestion}>
              <Text style={styles.faqText}>{faq.question}</Text>
            </TouchableOpacity>
            {expandedIndex === index && (
              <Text style={styles.faqAnswer}>{faq.answer}</Text>
            )}
            <View style={styles.separator} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#D3D3D3', // Light grey background
    paddingVertical: 20,
  },
  section: {
    backgroundColor: '#fff', // White background for sections
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subsection: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#D3D3D3', // Light grey for subsections
    borderRadius: 10,
    padding: 10,
    marginBottom: 10, // Space between subsections
  },
  iconContainer: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 30,
  },
  subsectionTitle: {
    marginLeft: 10,
    fontSize: 16,
  },
  faqQuestion: {
    paddingVertical: 10,
  },
  faqText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  faqAnswer: {
    fontSize: 14,
    marginBottom: 10,
    paddingLeft: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#D3D3D3', // Light grey for separator
    marginVertical: 5,
  },
});

export default HelpScreen;
