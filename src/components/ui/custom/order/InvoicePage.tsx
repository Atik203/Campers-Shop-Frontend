import { useGetSingleOrderQuery } from "@/redux/features/order/orderApi";
import { TOrder } from "@/types";
import { PDFViewer } from "@react-pdf/renderer";
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
      <PDFViewer style={{ width: "100%", height: "800px" }}>
        <InvoiceDocument order={order} />
      </PDFViewer>
    </div>
  );
};

export default InvoicePage;
