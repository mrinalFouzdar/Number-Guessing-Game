import React, { Children } from 'react'
import { StyleSheet, View } from 'react-native'
import Colors from '../../constants/color'

const Card = ({children}) => {
  return (
    <View style={styles.card}>
      {children}
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
    card: {
        alignItems: "center",
        marginTop: 20,
        marginHorizontal: 24,
        padding: 16,
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        // work on andriod
        elevation: 4,
    
        // for ios shadow
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
      },
})