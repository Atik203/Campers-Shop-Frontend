import { TOrder } from "@/types";
import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

Font.register({
  family: "Lore",
  src: "https://fonts.gstatic.com/s/lora/v10/4A-myfZX6oDr9CtSTkTGig.ttf",
});

const styles = StyleSheet.create({
  page: {
    padding: 25,
    fontFamily: "Lore",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  leftHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 45,
    height: 45,
    marginRight: 10,
  },
  shopName: {
    fontSize: 18,
    color: "green",
    fontWeight: "bold",
  },
  shopAddress: {
    fontSize: 10,
  },
  invoiceTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 20,
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    lineHeight: 1.2,
  },
  table: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "16.66%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderTopWidth: 0,
    borderLeftWidth: 0,
    backgroundColor: "#f0f0f0",
    textAlign: "center",
    padding: 1,
  },
  tableCol: {
    width: "16.66%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderTopWidth: 0,
    borderLeftWidth: 0,
    textAlign: "center",
    padding: 2,
  },
  tableCellHeader: {
    margin: 1,
    fontSize: 12,
    fontWeight: "bold",
  },
  tableCell: {
    margin: 1,
    fontSize: 11,
  },
  footer: {
    position: "absolute",
    bottom: 30, // Adjust this value to move the footer up or down
    width: "100%",
    borderTop: 1,
    borderColor: "#bfbfbf",
    paddingTop: 5,
    textAlign: "center",
    fontSize: 10,
  },
  watermark: {
    position: "absolute",
    top: "65%", // Adjusted to move upwards
    left: "35%", // Adjusted to move to the left
    transform: "translate(-50%, -50%) rotate(-45deg)",
    fontSize: 50,
    color: "rgba(0, 0, 0, 0.1)", // Adjust the color and opacity for watermark effect
    textAlign: "center",
    zIndex: -1,
  },
});

// Create the PDF document component
const InvoiceDocument = ({ order }: { order: TOrder }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.watermark}>Campers Shop</Text>
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <Image
            src="https://img.icons8.com/color/48/shop.png"
            style={styles.logo}
          />
          <View>
            <Text style={styles.shopName}>Campers Shop</Text>
            <Text style={styles.shopAddress}>
              123 Camping Lane, Adventure Town, 45678
            </Text>
            <Text style={styles.shopAddress}>
              Email: info@campersshop.com | Phone: (123) 456-7890
            </Text>
          </View>
        </View>
        <Text style={styles.invoiceTitle}>Invoice</Text>
      </View>
      <View
        style={[
          styles.section,
          {
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20,
          },
        ]}
      >
        <View style={{ maxWidth: "50%" }}>
          <Text style={styles.text}>
            Customer Name: {order.orderData.firstName}{" "}
            {order.orderData.lastName}
          </Text>
          <Text style={styles.text}>Email: {order.orderData.email}</Text>
          <Text style={styles.text}>Phone: {order.orderData.phone}</Text>
          <Text style={styles.text}>
            Address: {order.orderData.address}, {order.orderData.city},{" "}
            {order.orderData.postalCode}
          </Text>
        </View>
        <View style={{ maxWidth: "40%" }}>
          <Text style={[styles.text, { fontWeight: "bold", color: "green" }]}>
            Order Number: {order.orderData.orderNumber}
          </Text>
          <Text style={styles.text}>Date: {order.orderData.time}</Text>
          <Text style={[styles.text, { fontWeight: "bold" }]}>
            Payment Method: {order.orderData.paymentMethod}
          </Text>
          <Text style={[styles.text, { fontWeight: "bold" }]}>
            Delivery Method: {order.orderData.deliveryMethod}
          </Text>
          {order.orderData.paymentDetails?.paymentType === "Stripe" && (
            <Text style={[styles.text, { fontWeight: "bold", color: "green" }]}>
              Transaction ID:
              {order.orderData.paymentDetails.cardPaymentDetails
                ?.transactionId || " pm-dkhl45435k0934hb2"}
            </Text>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Order Details</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Serial No</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Product Name</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Category</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Quantity</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Price</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Total</Text>
            </View>
          </View>
          {order.products.map((product, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{index + 1}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{product.title}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{product.category}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{product?.quantity || 1}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  ${product.price.toFixed(2)}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  ${(product.price * (product.quantity || 1)).toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
          <View style={styles.tableRow}>
            <View style={[styles.tableCol, { width: "80%" }]}>
              <Text style={[styles.tableCell, { fontWeight: "bold" }]}>
                Total Price
              </Text>
            </View>
            <View style={[styles.tableCol, { width: "20%" }]}>
              <Text style={styles.tableCell}>
                $
                {order.products
                  .reduce(
                    (total, product) =>
                      total + product.price * (product.quantity || 1),
                    0
                  )
                  .toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text>
          Terms and Conditions apply. All sales are final. No refunds or
          exchanges.
        </Text>
        <Text>For any inquiries, please contact our customer service.</Text>
      </View>
    </Page>
  </Document>
);

export default InvoiceDocument;
