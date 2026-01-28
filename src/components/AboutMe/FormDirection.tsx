import { COLORS } from "@/constants/colors";
import { favoritesStyles } from "@/styles/favorites.styles";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRouter } from "expo-router";
import { Formik } from "formik";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import useFormDirection from "./useFormDirection";

const FormDirection = () => {
  const { CIUDADES, agregarDireccion, entregaData } = useFormDirection(); // AÑADIR entregaData aquí
  const navigation = useNavigation();
  const router = useRouter();

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Svg viewBox="0 0 24 24" width="24" height="24">
            <Path
              d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"
              fill="#000000"
            />
          </Svg>
        </TouchableOpacity>
        <Text style={{ ...favoritesStyles.title, fontSize: 22 }}>
          Agregar Dirección
        </Text>
        <TouchableOpacity
          onPress={() => Alert.alert("Borrar", "Función de borrar")}
        >
          <Text style={[favoritesStyles.title, { fontSize: 16, color: "red" }]}>
            Borrar
          </Text>
        </TouchableOpacity>
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
          onSubmit={(values) => {
            console.log("Valores del formulario:", values); // Para depurar

            // Validaciones básicas
            if (!values.nombre.trim()) {
              Alert.alert("Error", "El nombre es requerido");
              return;
            }
            if (!values.numero.trim()) {
              Alert.alert("Error", "El número es requerido");
              return;
            }
            if (!values.pais) {
              Alert.alert("Error", "Selecciona un país");
              return;
            }
            if (!values.ciudad) {
              Alert.alert("Error", "Selecciona una ciudad");
              return;
            }
            if (!values.Sectores) {
              Alert.alert("Error", "Selecciona un sector");
              return;
            }
            if (!values.direccion.trim()) {
              Alert.alert("Error", "La dirección es requerida");
              return;
            }
            if (!values.numeroCasa.trim()) {
              Alert.alert("Error", "El número de casa es requerido");
              return;
            }

            // Calcular el próximo ID (si hay datos)
            const nextId =
              entregaData.length > 0
                ? Math.max(...entregaData.map((d) => d.id)) + 1
                : 1;

            // Crear nueva dirección
            const nuevaDireccion = {
              id: nextId,
              nombre: values.nombre,
              codigo: values.codigo,
              numero: values.numero,
              pais: values.pais,
              Sectores: values.Sectores,
              ciudad: values.ciudad,
              numeroCasa: values.numeroCasa,
              direccion: values.direccion,
            };

            console.log("Nueva dirección a agregar:", nuevaDireccion);

            // Agregar la dirección
            agregarDireccion(nuevaDireccion);

            // Mostrar mensaje de éxito
            Alert.alert("¡Éxito!", "Dirección agregada correctamente", [
              {
                text: "OK",
                onPress: () => {
                  // Regresar a la pantalla anterior
                  navigation.goBack();
                },
              },
            ]);
          }}
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
                  placeholder="Nombre *"
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
                    onValueChange={handleChange("codigo")}
                    onBlur={handleBlur("codigo")}
                    selectedValue={values.codigo}
                  >
                    <Picker.Item label="+52" value="+52" />
                  </Picker>
                  <TextInput
                    style={{ ...styles.input, width: "65%" }}
                    placeholder="Número *"
                    onChangeText={handleChange("numero")}
                    onBlur={handleBlur("numero")}
                    value={values.numero}
                    keyboardType="phone-pad"
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
                <TouchableOpacity>
                  <Text
                    style={{
                      ...favoritesStyles.title,
                      fontSize: 14,
                      color: COLORS.textLight,
                    }}
                  >
                    Use ubicacion actual
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.card}>
                <Picker
                  style={styles.input}
                  onValueChange={handleChange("pais")}
                  onBlur={handleBlur("pais")}
                  selectedValue={values.pais}
                  enabled={false}
                >
                  <Picker.Item
                    label="República Dominicana"
                    value="República Dominicana"
                  />
                </Picker>
                <Picker
                  style={styles.input}
                  onValueChange={handleChange("ciudad")}
                  onBlur={handleBlur("ciudad")}
                  selectedValue={values.ciudad}
                  enabled={false}
                >
                  <Picker.Item label="Santo Domingo" value="Santo Domingo" />
                </Picker>
                <Picker
                  style={styles.input}
                  onValueChange={handleChange("Sectores")}
                  onBlur={handleBlur("Sectores")}
                  selectedValue={values.Sectores}
                >
                  <Picker.Item
                    label={`Selecciona Un Sector *`}
                    value=""
                    enabled={false}
                  />
                  {CIUDADES.map((ciudad, index) => (
                    <Picker.Item key={index} label={ciudad} value={ciudad} />
                  ))}
                </Picker>
                <TextInput
                  style={styles.input}
                  placeholder="Dirección *"
                  onChangeText={handleChange("direccion")}
                  onBlur={handleBlur("direccion")}
                  value={values.direccion}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Número de Casa *"
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
                  onPress={() => {
                    console.log("Botón presionado"); // Para depurar
                    handleSubmit();
                    router.push("/orders/earring");
                  }}
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
});
export default FormDirection;
