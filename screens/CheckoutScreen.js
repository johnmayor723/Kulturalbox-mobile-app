import { useState } from "react";
import { RootSiblingParent } from "react-native-root-siblings";
import Toast from "react-native-root-toast";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Button,
} from "react-native";
import { Paystack } from "react-native-paystack-webview";
import axios from "axios";

export default function App({ route, navigation }) {
  const [pay, setPay] = useState(false);
  const [checkoutDetails, setCheckoutDetails] = useState({
    email: "",
    name: "",
    shippingAddress: "",
  });

  const totalAmount = route.params?.totalAmount;

  const handleOnchange = (text, field) => {
    setCheckoutDetails((prevState) => ({ ...prevState, [field]: text }));
  };

  const handleSubmit = () => {
    if (checkoutDetails.email && checkoutDetails.name && checkoutDetails.shippingAddress && totalAmount) {
      setPay(true);
    } else {
      Toast.show("Please fill in all fields", {
        duration: Toast.durations.LONG,
      });
    }
  };

  const handlePaymentSuccess = async (response) => {
    const responseObject = response["transactionRef"]["message"];
    if (responseObject === "Approved") {
      Toast.show("Transaction Approved!", {
        duration: Toast.durations.LONG,
      });

      // Send order details to the server
      try {
        await axios.post("https://pantry-hub-server.onrender.com/api/orders", {
          email: checkoutDetails.email,
          name: checkoutDetails.name,
          shippingAddress: checkoutDetails.shippingAddress,
          totalAmount,
        });
        Toast.show("Order submitted successfully!", {
          duration: Toast.durations.LONG,
        });
      } catch (error) {
        Toast.show("Order submission failed!", {
          duration: Toast.durations.LONG,
        });
      }

      // Redirect to Home (or Success Page when ready)
      navigation.replace("Home");
    }
  };

  return (
    <RootSiblingParent>
      <ScrollView style={styles.body}>
        <View style={styles.heroSection}>
          <Text style={styles.heroText}>Checkout</Text>
          <Text style={styles.amountText}>₦{totalAmount}</Text>
        </View>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => handleOnchange(text, "email")}
            value={checkoutDetails?.email}
          />
          <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={(text) => handleOnchange(text, "name")}
            value={checkoutDetails?.name}
          />
          <TextInput
            style={styles.input}
            placeholder="Shipping Address"
            onChangeText={(text) => handleOnchange(text, "shippingAddress")}
            value={checkoutDetails?.shippingAddress}
          />

          <Button
            title="Pay Now"
            color="green"
            accessibilityLabel="pay now"
            onPress={handleSubmit}
          />
          {pay && (
            <View style={{ flex: 1 }}>
              <Paystack
                paystackKey="pk_test_bec2adfc8f46afff889349e2bf76e50477939d74"
                amount={totalAmount}
                billingEmail={checkoutDetails.email}
                activityIndicatorColor="green"
                onCancel={() => {
                  Toast.show("Transaction Cancelled!", {
                    duration: Toast.durations.LONG,
                  });
                }}
                onSuccess={handlePaymentSuccess}
                autoStart={pay}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#f0f0f0",
  },
  heroSection: {
    backgroundColor: "orange",
    padding: 20,
    alignItems: "center",
  },
  heroText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  amountText: {
    fontSize: 20,
    color: "#fff",
    marginTop: 5,
  },
  formContainer: {
    padding: 15,
  },
  input: {
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    marginTop: 15,
    backgroundColor: "white",
  },
});
