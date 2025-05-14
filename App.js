import { useState } from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from './assets/logo-dark.png';

export default function App() {
  const [text, setText] = useState('');
  const [viewPassword, setViewPassword] = useState(false);
  const handleTextChange = (text) => {
    setText(text);
  };
  const handleViewPassword = () => {
    setViewPassword((prev) => !prev);
    console.log(viewPassword);
  };
  return (
    <View style={styles.rootScreen}>
      <View>
        <Image style={styles.logo} resizeMode="contain" source={Icon} />
      </View>
      <View>
        <View style={{ marginBlock: 25 }}>
          <Text style={styles.text}>Correo electronico *</Text>
          <TextInput
            placeholderTextColor={'#bbb'}
            style={styles.textInput}
            placeholder="usuario@mail.com"
            onChangeText={handleTextChange}
            required
          />
        </View>
        <View style={{ marginBottom: 25 }}>
          <Text style={styles.text}>Constraseña *</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              placeholderTextColor={'#bbb'}
              style={styles.passwordInput}
              placeholder="*********"
              onChangeText={handleTextChange}
              required
              secureTextEntry={!viewPassword}
            />
            <TouchableOpacity
              onPress={handleViewPassword}
              style={styles.toggleButton}
              activeOpacity={0.7}
            >
              <Text style={styles.toggleButtonText}>
                {viewPassword ? 'Ocultar' : 'Ver'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
        <Button
          title="Iniciar sesion"
          onPress={() => alert(text)}
          color={'#FF6F00'}
        ></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    padding: 50,
    backgroundColor: '#111111',
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  textInput: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#3A3A3A',
    backgroundColor: '#2A2A2A',
    color: '#FFFFFF',
    borderRadius: 6,
    fontSize: 16,
    placeholderTextColor: '#FFFFFF',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3A3A3A',
    backgroundColor: '#2A2A2A',
    borderRadius: 6,
    padding: 8,
    flexWrap: 'nowrap',
  },
  passwordInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
  },
  toggleButton: {
    marginLeft: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: '#3A3A3A', // Fondo sutil para hacerlo más táctil
    justifyContent: 'center',
    height: 36, // Altura fija para evitar saltos
  },
  toggleButtonText: {
    color: '#FF6F00',
    fontSize: 14,
    fontWeight: 'bold',
  },
  textContainer: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
});
