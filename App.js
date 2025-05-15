import { useState, useRef } from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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

  // Estados para el chatbot
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { from: 'bot', text: '¡Hola! ¿En qué puedo ayudarte?' },
  ]);
  const chatScrollRef = useRef();

  // Simulación de llamada a API
  const fetchBotResponse = async (userMessage) => {
    // Aquí puedes cambiar la URL por tu API real
    try {
      const res = await fetch('https://dummyjson.com/products/1');
      const data = await res.json();
      // Simula una respuesta usando un campo del JSON
      return `Respuesta de la API: ${data.title}`;
    } catch (e) {
      return 'Hubo un error al contactar la API.';
    }
  };

  const handleSendChat = async () => {
    if (!chatInput.trim()) return;
    const userMsg = { from: 'user', text: chatInput };
    setChatMessages((msgs) => [...msgs, userMsg]);
    setChatInput('');
    const botReply = await fetchBotResponse(chatInput);
    setChatMessages((msgs) => [...msgs, { from: 'bot', text: botReply }]);
    // Opcional: scroll al final
    chatScrollRef.current?.scrollToEnd({ animated: true });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <View style={styles.rootScreen}>
        {/* Logo */}
        <View>
          <Image style={styles.logo} resizeMode="contain" source={Icon} />
        </View>

        {/* Chat history */}
        <View style={styles.chatContainer}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'flex-end',
            }}
            ref={chatScrollRef}
          >
            {chatMessages.map((msg, idx) => (
              <View
                key={idx}
                style={msg.from === 'user' ? styles.userMsg : styles.botMsg}
              >
                <Text style={styles.chatText}>{msg.text}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Input fijo abajo */}
        <View style={styles.chatInputRowFixed}>
          <TextInput
            style={styles.chatInput}
            placeholder="Escribe tu mensaje..."
            placeholderTextColor="#bbb"
            value={chatInput}
            onChangeText={setChatInput}
            onSubmitEditing={handleSendChat}
            returnKeyType="send"
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendChat}
            activeOpacity={0.7}
          >
            <Text style={styles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    padding: 10,
    backgroundColor: '#111111',
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 30,
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
  chatContainer: {
    flex: 1,
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 10,
  },
  chatHistory: {
    flex: 1,
  },
  userMsg: {
    alignSelf: 'flex-end',
    backgroundColor: '#FF6F00',
    borderRadius: 8,
    marginVertical: 2,
    padding: 8,
    maxWidth: '80%',
  },
  botMsg: {
    alignSelf: 'flex-start',
    backgroundColor: '#333',
    borderRadius: 8,
    marginVertical: 2,
    padding: 8,
    maxWidth: '80%',
  },
  chatText: {
    color: '#fff',
    fontSize: 15,
  },
  chatInputRowFixed: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 10,
    backgroundColor: '#111',
    borderTopWidth: 1,
    borderTopColor: '#222',
    paddingBottom: 10,
  },
  chatInput: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    color: '#fff',
    borderRadius: 6,
    padding: 10,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#3A3A3A',
  },
  sendButton: {
    backgroundColor: '#FF6F00',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
