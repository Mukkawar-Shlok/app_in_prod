import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Image,
    ToastAndroid,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Items } from '../../database/Database';
import { COLOURS } from '../../database/Database';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const arImage = require('../../assets/images/arImage/arImage.png');
const ProductInfo = ({ route, navigation }) => {
    const { productID } = route.params;

    //states
    const [product, setProduct] = useState({});

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getDataFromDB();
        });
        return unsubscribe;
    }, [navigation]);

    //gettting product by productId

    const getDataFromDB = async () => {
        for (let i = 0; i < Items.length; i++) {
            if (Items[i].id == productID) {
                await setProduct(Items[i]);
                return;
            }
        }
    };

    //add to cart
    const addToCart = async id => {
        let itemArray = await AsyncStorage.getItem('cartItems');
        itemArray = JSON.parse(itemArray);
        if (itemArray) {
            let array = itemArray;
            array.push(id);

            try {
                await AsyncStorage.setItem('cartItems', JSON.stringify(array));
                ToastAndroid.show(
                    'Item Added Successfully to cart',
                    ToastAndroid.SHORT,
                );
                navigation.navigate('Home');
            } catch (error) {
                return error;
            }
        } else {
            let array = [];
            array.push(id);
            try {
                await AsyncStorage.setItem('cartItems', JSON.stringify(array));
                ToastAndroid.show('Item Added Successfully to cart', ToastAndroid.SHORT,);
                navigation.navigate('Home');
            }
            catch (error) {
                return error;
            }
        }
    };

    // console.log(product);
    return (
        <View
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: COLOURS.white,
                position: 'relative',
            }}>
            <StatusBar
                backgroundColor={COLOURS.backgroundDark}
                barStyle='dark-content'
            />
            <ScrollView>
                <View
                    style={{
                        width: '100%',
                        backgroundColor: COLOURS.white,
                        justifyContent: 'center',
                        position: 'relative',
                        alignItems: 'center',
                    }}>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                        }}>
                        <View
                            style={{
                                width: '25%',
                                borderColor: COLOURS.white,
                                borderWidth: 5,
                                borderRadius: 10,
                            }}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Home')}>
                                <Entypo
                                    name='arrow-left'
                                    style={{
                                        color: COLOURS.black,
                                        padding: 10,
                                        borderRadius: 5,
                                        fontSize: 25,
                                    }}></Entypo>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={{
                                width: '75%',
                                alignItems: 'flex-end',
                                paddingRight: 30,
                                paddingTop: 15,
                            }}>
                            <Image
                                source={arImage}
                                style={{
                                    width: 70,
                                    height: 30,
                                    padding: 5,
                                    backgroundColor: COLOURS.backgroundLight,
                                }}
                            />

                        </TouchableOpacity>
                    </View>
                    {/*wrapping entypo and 360 in one view*/}

                    <View
                        style={{
                            width: '95%',
                            borderRadius: 20,
                            backgroundColor: COLOURS.backgroundLight,
                        }}
                    >
                        <View
                            style={{
                                alignSelf: 'center',

                            }}
                        >
                            <Image source={product.productImage} />
                        </View>
                        <Text
                            style={{
                                paddingTop: 10,
                                position: 'absolute',
                                fontSize: 20,
                                fontWeight: '500',
                                alignSelf: 'center',
                            }}>
                            {product.productName}
                        </Text>

                    </View>

                    <View
                    >
                        <Text
                            style={{
                                backgroundColor: COLOURS.backgroundLight,
                                borderRadius: 10,
                                padding: 10,
                                margin: 10,
                                fontSize: 14,
                                fontWeight: '400',
                                color: COLOURS.black,
                                alignSelf: 'center',
                            }}>
                            {product.description}
                        </Text>

                        <View
                            style={{
                                backgroundColor: COLOURS.backgroundLight,
                                borderRadius: 10,
                                margin: 10,
                                paddingHorizontal: 10,
                            }}
                        >
                            <Text
                                style={{
                                    paddingTop: 10,
                                    paddingRight: 10,
                                    paddingLeft: 15,
                                    fontSize: 14,
                                    fontWeight: '600',
                                    color: COLOURS.black,
                                }}
                            >Description:</Text>
                            <Text
                                style={{
                                    paddingTop: 5,
                                    textAlign: 'center',
                                    paddingRight: 10,
                                    paddingLeft: 10,
                                    fontSize: 14,
                                    fontWeight: '400',
                                    color: COLOURS.backgroundDark,
                                }}>
                                {product.subDes}
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View
                style={{
                    height: 50,
                    width: '95%',
                    backgroundColor: COLOURS.backgroundMedium,
                    display: 'flex',
                    flexDirection: 'row',
                    borderRadius: 10,
                    padding: 10,
                    alignSelf: 'center'
                }}>
                <Text
                    style={{
                        width: '30%',
                        alignSelf: 'center',
                        fontWeight: '400',
                        fontSize: 15,
                    }}>
                    ???12233
                </Text>

                {/*buy now touchable opacity*/}
                <TouchableOpacity
                    onPress={() => (addToCart(product.id))}
                    style={{
                        width: '70%',
                        borderLeftWidth: 1,
                        borderLeftColor: COLOURS.black,
                    }}>
                    <Text
                        style={{
                            width: '80%',
                            textAlign: 'center',
                            fontWeight: '400',
                            fontSize: 20,
                        }}>
                        Buy Now
                    </Text>
                </TouchableOpacity>
            </View>
        </View >
    );
};

export default ProductInfo;
