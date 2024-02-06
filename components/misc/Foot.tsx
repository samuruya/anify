import { View, Text } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'

const Foot = () => {
  return (
    <View style={{
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        height: 150,
        backgroundColor: Colors.altbc,
    }}>
    <View style={{
        width: '100%',
        alignItems: 'center'
    }}>
        <Text style={{
            padding: 20,
            color: Colors.wht,
            fontWeight: 'bold',
        }}>Disclamer:</Text>
    </View>
        <Text style={{
            textAlign: 'center',
            color: Colors.wht
        }}>
        We do not possess any rights to, nor do we store, any anime content on our servers. Our app utilizes a public API to provide access to a wide range of anime shows, offering users a native platform to enjoy their favorite show! -Anify Dev Team
        </Text>
    </View>
  )
}

export default Foot