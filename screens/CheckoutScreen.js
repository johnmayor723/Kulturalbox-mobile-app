import React from 'react';
import { View } from 'react-native';
import PaystackWebView from 'react-native-paystack-webview';

const ChechoutScreen = () => {
  return (
    <View>
      <PaystackWebView
        buttonText="Pay Now"
        paystackKey="pk_test_bec2adfc8f46afff889349e2bf76e50477939d74"
        amount={120000}
        billingEmail="ayoshokz@gmail.com"
        billingMobile="08101274387"
        billingName="Oluwatobi Shokunbi"
        ActivityIndicatorColor="green"
        onSuccess={(tranRef) => {
          console.log(tranRef);
        }}
        onCancel={() => {
          console.log('Something went wrong');
        }}
      />
    </View>
  );
};

export default CheckoutScreen;
