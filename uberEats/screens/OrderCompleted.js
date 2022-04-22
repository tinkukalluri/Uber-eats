import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Platform, StatusBar } from "react-native";
import { useSelector } from "react-redux";
import LottieView from "lottie-react-native";
import db from "../firebase_firestone";
import MenuItems from "../components/restaurantDetail/MenuItems";

export default function OrderCompleted({ navigation, routes, ...props }) {

    const { items_data } = useSelector((state) => {
        // console.log(' state.cartUpdate::', state.cartUpdate);
        return state.cartUpdate
    })


    const { items, restaurantName } = items_data.selectedItems

    const total = items
        .map((item) => Number(item.price.replace("$", "")))
        .reduce((prev, curr) => prev + curr, 0);

    const totalUSD = total.toLocaleString("en", {
        style: "currency",
        currency: "USD",
    });

    // useEffect(() => {
    //     const db = firebase.firestore();
    //     const unsubscribe = db
    //         .collection("orders")
    //         .orderBy("createdAt", "desc")
    //         .limit(1)
    //         .onSnapshot((snapshot) => {
    //             snapshot.docs.map((doc) => {
    //                 setLastOrder(doc.data());
    //             });
    //         });

    //     return () => unsubscribe();
    // }, []);


    return (
        <SafeAreaView style={styles.container}>
            {/* green checkmark */}
            <View
                style={{
                    margin: 15,
                    alignItems: "center",
                    height: "100%",
                }}
            >
                <LottieView
                    style={{ height: 100, alignSelf: "center", marginBottom: 30 }}
                    source={require("../assets/animations/check-mark.json")}
                    autoPlay
                    speed={0.5}
                    loop={false}
                />
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    Your order at {restaurantName} has been placed for {totalUSD}
                </Text>
                <ScrollView style={{ marginBottom: 20 }}>
                    <MenuItems
                        foods={items}
                        hideCheckbox={true}
                        marginLeft={10}
                    />
                    {/* lottie files is the place where u can all this amazing animated json

                    */}
                    <LottieView
                        style={{ height: 200, alignSelf: "center" }}
                        source={require("../assets/animations/cooking.json")}
                        autoPlay
                        speed={0.5}
                    />
                </ScrollView>
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    }
})
