import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Divider } from "react-native-elements";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ADD_TO_CART, REMOVE_FROM_CART } from '../../redux/reducers/cartReducer'

const styles = StyleSheet.create({
    menuItemStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 20,
    },

    titleStyle: {
        fontSize: 19,
        fontWeight: "600",
    },
});

export default function MenuItems({
    restaurantName,
    foods,
    hideCheckbox,
    marginLeft,
}) {


    const dispatch = useDispatch();
    // const selectItem = (item, checkboxValue) =>
    //     dispatch({
    //         type: "ADD_TO_CART",
    //         payload: {
    //             ...item,
    //             restaurantName: restaurantName,
    //             checkboxValue: checkboxValue,
    //         },
    //     });

    const { items_data } = useSelector((state) => {
        // console.log(' state.cartUpdate::', state.cartUpdate);
        return state.cartUpdate
    })

    const selectItem = (food, checkboxValue) => {
        console.log("food in selectItem::", food);
        if (checkboxValue) {
            dispatch(ADD_TO_CART({
                items: { ...food },
                restaurantName: restaurantName,
                checkboxValue: checkboxValue,
            }))
        } else {
            dispatch(REMOVE_FROM_CART({
                items: { ...food },
                restaurantName: restaurantName,
                checkboxValue: checkboxValue,
            }))
        }
    }

    // const cartItems = useSelector(
    //     (state) => state.cartReducer.selectedItems.items
    // );


    //cartItems is an array of objects
    let cartItems = []
    if (items_data.selectedItems.restaurantName === restaurantName) {
        cartItems = items_data.selectedItems.items
    }
    // console.log(cartItems)   
    const isFoodInCart = (food, cartItems) =>
        Boolean(cartItems.find((item) => item?.title === food.title));

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {foods.map((food, index) => (
                <View key={index} >
                    <View style={styles.menuItemStyle}>
                        {hideCheckbox ? (
                            <></>
                        ) : (
                            <BouncyCheckbox
                                iconStyle={{ borderColor: "lightgray", borderRadius: 0 }}
                                fillColor="green"
                                isChecked={isFoodInCart(food, cartItems)}
                                onPress={(checkboxValue) => { console.log("checkboxValue::", checkboxValue); selectItem(food, checkboxValue) }}
                            />
                        )}
                        <FoodInfo food={food} />
                        <FoodImage food={food} marginLeft={marginLeft ? marginLeft : 0} />
                    </View>
                    <Divider
                        width={0.5}
                        orientation="vertical"
                        style={{ marginHorizontal: 20 }}
                    />
                </View>
            ))}
            {hideCheckbox ?
                <></> : (<View style={{ width: '100%', height: 120 }}>
                </View>)}

        </ScrollView>
    );
}

const FoodInfo = (props) => (
    <View style={{ justifyContent: "space-evenly", flex: 1 }}>
        <Text style={styles.titleStyle}>{props.food.title}</Text>
        <Text>{props.food.description}</Text>
        <Text>{props.food.price}</Text>
    </View>
);

const FoodImage = ({ marginLeft, ...props }) => (
    <View>
        <Image
            source={{ uri: props.food.image }}
            style={{
                width: 100,
                height: 100,
                borderRadius: 8,
                marginLeft: marginLeft,
            }}
        />
    </View>
);
