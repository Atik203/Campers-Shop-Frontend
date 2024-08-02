import { useGetSingleOrderQuery } from "@/redux/features/order/orderApi";
import { TOrder } from "@/types";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { isMobile } from "react-device-detect";
import { useParams } from "react-router-dom";
import InvoiceDocument from "./InvoiceDocument";

const InvoicePage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isFetching, isLoading } = useGetSingleOrderQuery(id);

  const order = data?.data as TOrder;

  if (isLoading || isFetching) {
    return <div className="text-center min-h-screen mt-8 ">Loading</div>;
  }

  return (
    <div className="">
      {isMobile ? (
        <PDFDownloadLink
          document={<InvoiceDocument order={order} />}
          fileName={`invoice-${id}.pdf`}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "green",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            textDecoration: "none",
            margin: "80px auto",
            width: "fit-content",
          }}
        >
          {({ loading }) => (loading ? "Generating PDF..." : "Download PDF")}
        </PDFDownloadLink>
      ) : (
        <PDFViewer style={{ width: "100%", height: "800px" }}>
          <InvoiceDocument order={order} />
        </PDFViewer>
      )}
    </div>
  );
};

export default InvoicePage;
