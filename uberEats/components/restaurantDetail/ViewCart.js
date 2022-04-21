import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import OrderItem from "./OrderItem";
import { getFirestore, collection, getDocs, setDoc, doc, addDoc } from 'firebase/firestore/lite';
import db from '../../firebase_firestone';
import LottieView from "lottie-react-native";
import OrderCompleted from "../../screens/OrderCompleted";


export default function ViewCart({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const { items_data } = useSelector((state) => {
        // console.log(' state.cartUpdate::', state.cartUpdate);
        return state.cartUpdate
    })


    const { items, restaurantName } = items_data.selectedItems


    const total = items
        .map((item) => Number(item.price.replace("$", "")))
        .reduce((prev, curr) => prev + curr, 0);
    //  prev hear is the accumulator cur is the current list iteam initiating accumulator with 0
    // tht is the 2nd argument given to reduce method.
    const totalUSD = total.toLocaleString("en", {
        style: "currency",
        currency: "USD",
    });

    const orderListFromFirebase = async () => {
        console.log("called orderListFromFirebase")
    }

    const addOrderToFireBase = async () => {
        setLoading(true)
        try {
            const ordersCollection = collection(db, 'orders')
            const docRef = await addDoc(ordersCollection, {
                items: items,
                restaurantName: restaurantName,
                createdAt: "10"
            })
            setLoading(false)
            console.log("doc data id", docRef.id)
            navigation.navigate("OrderCompleted", { id: docRef.id });
        } catch (err) {
            console.log(err)
            setTimeout(() => {
                navigation.navigate("RestaurantDetail")
            }, 3000)
        }
    };


    const styles = StyleSheet.create({
        modalContainer: {
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0,0,0,0.7)",
        },

        modalCheckoutContainer: {
            backgroundColor: "white",
            padding: 16,
            height: 500,
            borderWidth: 1,
        },

        restaurantName: {
            textAlign: "center",
            fontWeight: "600",
            fontSize: 18,
            marginBottom: 10,
        },

        subtotalContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 15,
        },

        subtotalText: {
            textAlign: "left",
            fontWeight: "600",
            fontSize: 15,
            marginBottom: 10,
        },
    });

    const checkoutModalContent = () => {
        return (
            <>
                <View style={styles.modalContainer}>
                    <View style={styles.modalCheckoutContainer}>
                        <Text style={styles.restaurantName}>{restaurantName}</Text>
                        <ScrollView>
                            {items.map((item, index) => (
                                <OrderItem key={index} item={item} />
                            ))}
                        </ScrollView>
                        <View style={styles.subtotalContainer}>
                            <Text style={styles.subtotalText}>Subtotal</Text>
                            <Text>{totalUSD}</Text>
                        </View>
                        <View style={{ width: '100%', height: 66 }}>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: "black",
                            alignItems: "center",
                            padding: 13,
                            borderRadius: 30,
                            width: 300,
                            position: "absolute",
                            bottom: 30,
                            zIndex: 999,
                        }}
                        onPress={() => {
                            addOrderToFireBase();
                            setModalVisible(false);
                        }}
                    >
                        <Text style={{ color: "white", fontSize: 20 }}>Checkout</Text>
                        <Text
                            style={{
                                position: "absolute",
                                right: 20,
                                color: "white",
                                fontSize: 15,
                                top: 17,
                            }}
                        >
                            {total ? totalUSD : ""}
                        </Text>
                    </TouchableOpacity>
                </View>
            </>
        );
    };

    return (
        <>
            <Modal
                animationType="slide"
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                {checkoutModalContent()}
            </Modal>
            {total ? (
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                        position: "absolute",
                        bottom: 30,
                        zIndex: 999,
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            width: "100%",
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                marginTop: 20,
                                backgroundColor: "black",
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                padding: 15,
                                borderRadius: 30,
                                width: 300,
                                position: "relative",
                            }}
                            onPress={() => setModalVisible(true)}
                        >
                            <Text style={{ color: "white", fontSize: 20, marginRight: 30 }}>
                                View Cart
                            </Text>
                            <Text style={{ color: "white", fontSize: 20 }}>{totalUSD}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <></>
            )}
            {loading ? (
                <View
                    style={{
                        backgroundColor: "black",
                        position: "absolute",
                        opacity: 0.6,
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        width: "100%",
                    }}
                >
                    <LottieView
                        style={{ height: 200 }}
                        source={require("../../assets/animations/scanner.json")}
                        autoPlay
                        speed={3}
                    />
                </View>
            ) : (
                <></>
            )}
        </>
    );
}
