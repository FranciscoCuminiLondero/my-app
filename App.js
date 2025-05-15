import { useState, useRef, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

import Icon from './assets/logo-dark.png';

export default function App() {
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { from: 'bot', text: '¡Hola! ¿En qué puedo ayudarte?' },
  ]);
  const chatScrollRef = useRef();

  // Simulación de llamada a API
  const fetchBotResponse = async (userMessage) => {
    try {
      const res = await fetch('https://dummyjson.com/products/1 ');
      const data = await res.json();
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
  };

  // Scroll automático al enviar mensaje
  useEffect(() => {
    setTimeout(() => {
      chatScrollRef.current?.scrollToEnd({ animated: true });
    }, 50);
  }, [chatMessages]);

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

        {/* Historial del chat */}
        <View style={styles.chatContainer}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'flex-end',
            }}
            ref={chatScrollRef}
            onLayout={() =>
              chatScrollRef.current?.scrollToEnd({ animated: false })
            }
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

        {/* Campo de entrada fijo abajo */}
        <View style={styles.chatInputRowFixed}>
          <TextInput
            style={styles.chatInput}
            placeholder="Escribe tu mensaje..."
            placeholderTextColor="#bbb"
            value={chatInput}
            onChangeText={setChatInput}
            onSubmitEditing={handleSendChat}
            returnKeyType="send"
            multiline={true}
            maxHeight={100}
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
  chatContainer: {
    flex: 1,
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 10,
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
