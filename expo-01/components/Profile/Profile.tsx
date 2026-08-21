import { Text, View, Image, StyleSheet } from 'react-native';

export default function Profile() {
    return (

        <View>
            <Image 
                source={require('../../assets/images/foto-perfil.jpg')}
                style={styles.localImage}
            />

            <Text>Arthur Vinícius Moreira da Silva</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    localImage: {
        width: 150,
        height: 150,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        borderRadius: 50,
        marginBottom: 10
    }
})