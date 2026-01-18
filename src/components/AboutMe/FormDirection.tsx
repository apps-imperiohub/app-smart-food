import { COLORS } from "@/constants/colors";
import { favoritesStyles } from "@/styles/favorites.styles";
import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import configureData from "./useAboutMe";

const FormDirection = () => {
  const { CIUDADES } = configureData();
  return (
    <View>
      <View style={styles.header}>
        <Svg viewBox="0 0 24 24" width="24" height="24">
          <Path
            d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"
            fill="#000000"
          />
        </Svg>
        <Text style={{ ...favoritesStyles.title, fontSize: 22 }}>
          Editar la Direccion
        </Text>
        <Text style={[favoritesStyles.title, { fontSize: 22, color: "red" }]}>
          Borrar
        </Text>
      </View>

      <View>
        <Formik
          initialValues={{
            nombre: "",
            codigo: "+52",
            numero: "",
            pais: "",
            Sectores: "",
            ciudad: "",
            numeroCasa: "",
            direccion: "",
          }}
          onSubmit={(values) => console.log(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            setFieldValue,
          }) => (
            <View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 10,
                }}
              >
                <Text style={{ ...favoritesStyles.title, fontSize: 14 }}>
                  Informacion del contacto
                </Text>
                <Text
                  style={{
                    ...favoritesStyles.title,
                    fontSize: 14,
                    color: COLORS.textLight,
                  }}
                >
                  Use solo letras inglesas.
                </Text>
              </View>
              <View style={styles.card}>
                <TextInput
                  style={styles.input}
                  placeholder="nombre"
                  onChangeText={handleChange("nombre")}
                  onBlur={handleBlur("nombre")}
                  value={values.nombre}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 10,
                  }}
                >
                  <Picker
                    style={{ ...styles.input, width: "30%" }}
                    placeholder="+52"
                    onValueChange={handleChange("codigo")}
                    onBlur={handleBlur("codigo")}
                    selectedValue={values.codigo}
                  >
                    <Picker.Item label="+1" value="+1" />
                  </Picker>
                  <TextInput
                    style={{ ...styles.input, width: "65%" }}
                    placeholder="numero"
                    onChangeText={handleChange("numero")}
                    onBlur={handleBlur("numero")}
                    value={values.numero}
                  />
                </View>
              </View>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 10,
                }}
              >
                <Text style={{ ...favoritesStyles.title, fontSize: 14 }}>
                  Direccion de entrega
                </Text>
                <Text
                  style={{
                    ...favoritesStyles.title,
                    fontSize: 14,
                    color: COLORS.textLight,
                  }}
                >
                  Use ubicacion actual
                </Text>
              </View>

              <View style={styles.card}>
                <Picker
                  style={styles.input}
                  placeholder="pais"
                  onValueChange={handleChange("pais")}
                  onBlur={handleBlur("pais")}
                  selectedValue={values.pais}
                >
                  <Picker.Item
                    label="Selecciona un país"
                    value=""
                    enabled={false}
                  />
                  <Picker.Item
                    label="Repoblica Dominicana"
                    value="Repoblica Dominicana"
                  />
                </Picker>
                <Picker
                  style={styles.input}
                  placeholder="ciudad"
                  onValueChange={handleChange("ciudad")}
                  onBlur={handleBlur("ciudad")}
                  selectedValue={values.ciudad}
                >
                  <Picker.Item
                    label="Selecciona una Ciudad"
                    value=""
                    enabled={false}
                  />
                  <Picker.Item label="Santo Domingo" value="Santo Domingo" />
                </Picker>
                <Picker
                  style={styles.input}
                  placeholder="Sectores"
                  onValueChange={handleChange("Sectores")}
                  onBlur={handleBlur("Sectores")}
                  selectedValue={values.Sectores}
                >
                  <Picker.Item
                    label={`Selecciona Un Sector`}
                    value=""
                    enabled={false}
                  />
                  {CIUDADES.map((ciudad, index) => (
                    <Picker.Item key={index} label={ciudad} value={ciudad} />
                  ))}
                </Picker>
                <TextInput
                  style={styles.input}
                  placeholder="Direccion"
                  onChangeText={handleChange("direccion")}
                  onBlur={handleBlur("direccion")}
                  value={values.direccion}
                />
                <TextInput
                  style={styles.input}
                  placeholder="numero De Casa"
                  onChangeText={handleChange("numeroCasa")}
                  onBlur={handleBlur("numeroCasa")}
                  value={values.numeroCasa}
                />
              </View>

              <Text
                style={{
                  color: COLORS.textLight,
                  margin: 10,
                  fontWeight: "500",
                  fontSize: 14,
                }}
              >
                Asegurate de que toda la informacion proporcionada sea correcta
                antes de guardar la direccion. Esto nos ayudara a garantizar que
                tus pedidos se entreguen de manera oportuna y precisa.
              </Text>

              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    {
                      justifyContent: "center",
                      alignItems: "center",
                    },
                  ]}
                  onPress={() => console.log("Pressed")}
                >
                  <Text style={{ ...favoritesStyles.title, fontSize: 16 }}>
                    Guardar Dirección
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    margin: 10,
    padding: 10,
  },
  card: {
    backgroundColor: COLORS.white,
    padding: 15,
    margin: 10,
    borderRadius: 10,
    // Sombra
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    width: "100%",
    // Para que el texto esté más arriba:
    textAlignVertical: "top", // Android
    paddingTop: 10, // Reduce padding superior
    paddingBottom: 10, // Mantén padding inferior
    height: 48, // Altura fija opcional
    includeFontPadding: false, // Elimina padding extra de la fuente (Android)
  },
  button: {
    marginTop: 10,
    borderRadius: 20,
    backgroundColor: COLORS.button,
    width: 300,
    height: 40,
  },
  phoneContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    height: 48,
  },
  phoneTextContainer: {
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    paddingVertical: 0,
    height: 46,
  },
  phoneInput: {
    fontSize: 16,
    height: 46,
    color: "#000",
  },
  phoneCodeText: {
    fontSize: 16,
    color: "#000",
  },
  phoneFlagButton: {
    width: 60,
    borderRightWidth: 1,
    borderRightColor: "#ddd",
  },
});
export default FormDirection;
