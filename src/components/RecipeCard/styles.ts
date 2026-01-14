import { Dimensions, StyleSheet } from "react-native";
import {
  BORDER_RADIUS,
  COLORS,
  PADDING,
  SHADOWS,
  TEXT_TYPES,
} from "../../constants/colors";

const { width } = Dimensions.get("window");
const cardWidth = width - 32; // Ancho completo menos padding horizontal (16 * 2)

export const recipeCardStyles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: PADDING.sm,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    // overflow: "hidden",
    ...SHADOWS.sm,
  },
  image: {
    width: 120,
    height: 170,
    borderRadius: BORDER_RADIUS.sm,
  },
  infoContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    // backgroundColor: "red",
    marginLeft: PADDING.xs,
  },

  infoContainer_header: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 5,
    marginTop: PADDING.sm,
    // backgroundColor: "blue",
  },
  infoContainer_header_title: {
    ...TEXT_TYPES.titleSmall,
    textAlign: "left",
  },
  infoContainer_header_number: {
    flexDirection: "row",
    gap: 5,
    // backgroundColor: "red",
  },
  infoContainer_header_number_text: {
    fontSize: 12,
  },
  description: {
    ...TEXT_TYPES.bodySmall,
    color: COLORS.textLight,
    marginTop: PADDING.xs,
    lineHeight: 16,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
    marginTop: PADDING.xs,
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    marginTop: PADDING.xs,
  },
  addButton: {
    backgroundColor: COLORS.button,
    paddingVertical: PADDING.xs,
    paddingHorizontal: PADDING.sm,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    ...TEXT_TYPES.button,
    color: COLORS.text,
  },
});
