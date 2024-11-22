import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { TaskCard } from './TaskCard';

export default function App() {
  function onMessage() {
    alert("Hello World");
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <View style={styles.container}>
        <Text style={styles.label}>App de Tarefas</Text>
        <TextInput 
          style={styles.input}
          placeholder="Nome da tarefa:"
        />

        <Text>Tarefa Descrição:</Text>
        <TextInput 
          style={[styles.input, styles.textArea]}
          placeholder='Descrição da tarefa:'
          multiline
        />

        <View style={styles.buttonContainer}>
          <Button style={styles.buttonElement} color="darkgreen" title='Salvar' onPress={() => onMessage()} />
        </View>

        <TaskCard
          title={"Teste"}
          description={"Descrição"}
          status={"Done"}
          onClick={() => {
            alert("Deletar")
          }}
        />
      </View>
    
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40, 
    paddingHorizontal: 16,
    backgroundColor: '#f4f4f4',
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 40,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#ccc',
    marginVertical: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top'
  },
  buttonContainer: {
    marginTop: 16,
  },
  buttonElement: {
    borderRadius: 12
  }
});