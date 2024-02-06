import { View, Text } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'

const Divider = () => {
  return (
    <View style={{
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
    }}>
     <View style={{
        marginTop: 20,
        height: 1,
        width: '80%',
        backgroundColor: '#fff',
        }}>
     </View>
    </View>
  )
}

export default Divider