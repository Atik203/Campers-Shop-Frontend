// InvoicePage.jsx
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";
import InvoiceDocument from "./InvoiceDocument";

const InvoicePage = () => {
  const location = useLocation();
  const { order } = location.state;

  return (
    <div>
      <h1>Invoice for Order {order.number}</h1>
      <PDFViewer style={{ width: "100%", height: "500px" }}>
        <InvoiceDocument order={order} />
      </PDFViewer>
      <PDFDownloadLink
        document={<InvoiceDocument order={order} />}
        fileName={`invoice_${order.number}.pdf`}
        className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:w-auto"
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download Invoice"
        }
      </PDFDownloadLink>
    </div>
  );
};

export default InvoicePage;
