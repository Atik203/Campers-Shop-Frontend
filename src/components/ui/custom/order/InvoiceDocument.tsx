/* eslint-disable @typescript-eslint/no-unused-vars */
import { TOrderProducts } from "@/redux/features/product/productSlice";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
  },
});

// Create the PDF document component
const InvoiceDocument = ({ order }: { order: TOrderProducts }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.heading}>Invoice</Text>
        <Text style={styles.text}>Order Number: {order.orderNumber}</Text>
        <Text style={styles.text}>Date: {order.time}</Text>
      </View>
      {order.products.map((product, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.text}>Product Name: {product.title}</Text>
          <Text style={styles.text}>Description: {product.description}</Text>
          <Text style={styles.text}>Price: {product.price}</Text>
          <Text style={styles.text}>Status: {product.quantity}</Text>
          <Text style={styles.text}>
            Total: {product.price * product.quantity}
          </Text>
        </View>
      ))}
    </Page>
  </Document>
);

export default InvoiceDocument;
