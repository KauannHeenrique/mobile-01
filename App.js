import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import { TaskCard } from './TaskCard';
import { useState, useEffect } from 'react';
import { getRequest } from './api/Api';

export default function App() {
  const [task, setTask] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [alert1, setAlert1] = useState(false);
  const [alert2, setAlert2] = useState(false);

  const onMessage = () => {
    if (!taskName.trim()) {
      setAlert1(true);

      setTimeout(() => {
        setAlert1(false);
      }, 4000);

      return false;
    }

    if (taskDescription.length < 10) {
      setAlert2(true);

      setTimeout(() => {
        setAlert2(false);
      }, 4000);

      return false;
    }

    setTask([
      ...task,
      {
        id: task.length + 1,
        taskName,
        taskDescription
      }
    ]);

    setTaskName("");
    setTaskDescription("");
  }


  const deleteTask = (index) => {
    const updateTasks = [...task];
    updateTasks.splice(index, 1);
    setTask([]);

    setTask(updateTasks);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await getRequest();
        setTask(resp)
      } catch (ex) {
        console.error(ex)
      }
    };

    fetchData();
  }, [])

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <View style={styles.container}>
        <Text style={styles.label}>App de Tarefas</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome da tarefa:"
          value={taskName}
          onChangeText={(value) => setTaskName(value)}
        />
        {alert1 ? <Text style={styles.errorText}>Valor do nome da tarefa está vazio.</Text> : <></>}

        <Text>Tarefa Descrição:</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder='Descrição da tarefa:'
          multiline
          value={taskDescription}
          onChangeText={(value) => setTaskDescription(value)}
        />
        {alert2 ? <Text style={styles.errorText}>Descrição presisa ser maior que 10 caracteres.</Text> : <></>}


        <View style={styles.buttonContainer}>
          <Button style={styles.buttonElement} color="darkgreen" title='Salvar' onPress={() => onMessage()} />
        </View>
        {
          task.length > 0 ? <View style={styles.separator} /> : <></>
        }
        <ScrollView>
          {
            task.map((values, index) => (
              <>
                <TaskCard
                  key={values.id}
                  title={values.taskName}
                  description={values.taskDescription}
                  status={"Done"}
                  onClick={() => {
                    deleteTask(index)
                  }}
                />
              </>
            ))
          }
        </ScrollView>
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
  },
  separator: {
    marginTop: 16,
    width: "100%",
    height: 1,
    backgroundColor: "#222"
  },
  errorText: {
    color: "red",
    fontSize: 12,
    fontStyle: "italic"
  }
});