import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { useFonts, Poppins_700Bold } from "@expo-google-fonts/poppins";

export default function CardChurras({ churras, goTo }) {
  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={() => goTo(churras.custos_outros)}
      style={styles.churrasCriado}
      activeOpacity={0.8}>
      <Image
        source={require('../../../assets/carne.png')}
        style={styles.imagemCarne}
      />
      <Text style={styles.dataChurras}>
        Data do evento: {churras.data.dia}/{churras.data.mes}/{churras.data.ano}
      </Text>
      <Text style={styles.responsavelChurras}>
        Responsável: {churras.responsavel}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  churrasCriado: {
    width: '80%',
    backgroundColor: '#340C0C',
    padding: 20,
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 10,
  },
  imagemCarne: {
    width: 52,
    height: 43,
    marginBottom: 20,
    marginTop: 10,
  },
  dataChurras: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: "Poppins_700Bold",
  },
  responsavelChurras: {
    color: '#FFF',
    fontFamily: "Poppins_700Bold",
    fontSize: 14,
    textTransform: 'capitalize',
    marginTop: 10,
  },
});
