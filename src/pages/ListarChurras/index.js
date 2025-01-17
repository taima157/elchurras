import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import CardChurras from "../../components/CardChurras";
import { useFonts, Poppins_700Bold } from "@expo-google-fonts/poppins";

export default function ListarChurras({ navigation, route }) {
  const [listaChurras, setListaChurras] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const { id } = route.params;

  function goToCriarChurras() {
    navigation.navigate("CriarChurras", { id });
  }

  function goToCustos(custos) {
    navigation.navigate("Resultados", custos);
  }

  async function deletarCardChurras(idChurras) {
    const novoChurras = usuarios[id].churras.filter((item, index) => {
      if (index !== idChurras) {
        return item;
      }
    });

    usuarios[id].churras = novoChurras;
    setListaChurras(novoChurras);

    try {
      await AsyncStorage.setItem("usuarios", JSON.stringify(usuarios));
    } catch (e) {
      console.log(e);
    }
  }

  function alertaDeletar(idChurras) {
    Alert.alert("Deletar churrasco", "Deseja deletar esse churrasco?", [
      {
        text: "Cancelar",
        onPress: () => null,
        style: "cancel",
      },
      { text: "Sim", onPress: () => deletarCardChurras(idChurras) },
    ]);
  }

  useEffect(() => {
    async function getUsuarios() {
      try {
        const usuariosLocal = await AsyncStorage.getItem("usuarios");
        if (usuariosLocal !== null) {
          setUsuarios(JSON.parse(usuariosLocal));
          setListaChurras(JSON.parse(usuariosLocal)[id].churras);
        }
      } catch (e) {
        console.log(e);
      }
    }

    navigation.addListener("focus", () => {
      getUsuarios();
    });

    getUsuarios();
  }, [navigation]); //eslint-disable-line

  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.listarChurras}>
      <View style={styles.listaChurras}>
        <ScrollView>
          <View style={styles.viewScroll}>
            {listaChurras.length !== 0 ? (
              listaChurras.map((churras, index) => {
                return (
                  <CardChurras
                    key={index}
                    churras={churras}
                    goTo={(e) => goToCustos(e)}
                    delChurras={() => alertaDeletar(index)}
                  />
                );
              })
            ) : (
              <View>
                <Text style={styles.textSemChurras}>
                  Você não possui nenhum churrasco
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
      <View style={styles.viewButton}>
        <TouchableOpacity style={styles.buttonCriar} onPress={goToCriarChurras}>
          <Text style={styles.buttonMais}>+</Text>
          <Text style={styles.buttonTexto}>Novo Churrasco</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewScroll: {
    paddingTop: 50,
    width: "100%",
    alignItems: "center",
  },
  listarChurras: {
    display: "flex",
    height: "100%",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingBottom: 50,
  },
  listaChurras: {
    height: "75%",
    width: "100%",
  },
  viewButton: {
    width: "100%",
    height: "25%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  buttonCriar: {
    width: 145,
    height: 110,
    backgroundColor: "#DF1D1D",
    display: "flex",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 50,
  },
  buttonMais: {
    fontSize: 50,
    color: "#FFF",
  },
  buttonTexto: {
    color: "#FFF",
    fontFamily: "Poppins_700Bold",
  },
  textSemChurras: {
    fontFamily: "Poppins_700Bold",
  },
});
