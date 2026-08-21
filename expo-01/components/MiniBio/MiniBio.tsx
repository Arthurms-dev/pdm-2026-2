import { Text, View, Image } from 'react-native';
import Profile from '../Profile/Profile';

export default function MiniBio() {
    return (
        <View
        style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
          <Profile/>
         <Text>Estou no cargo de Estagiário de TI no Ministério da Saúde</Text>
    </View>
    );
}