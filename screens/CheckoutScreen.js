import PaystackWebView from 'react-native-paystack-webview'
import React, { Component } from 'react'
import { View } from 'react-native'

class MyApp extends Component {
  render () {
    return (
      <View>
        <PaystackWebView
          buttonText='Pay Now'
          paystackKey='pk_test_bec2adfc8f46afff889349e2bf76e50477939d74'
          amount={120000}
          billingEmail='ayoshokz@gmail.com'
          billingMobile='08101274387'
          billingName='Oluwatobi Shokunbi'
          ActivityIndicatorColor='green'
          onSuccess={(tranRef)=>{console.log(tranRef)}}
          onCancel={()=>{console.log('something went wrong')}}
         />
      </View>
    )
  }
            }
