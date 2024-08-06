import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllOrdersQuery } from "@/redux/features/order/orderApi";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { TOrder } from "@/types";

function calculateTotal(orders: TOrder[]): number {
  return orders.reduce((overallTotal, order) => {
    const orderTotal = order.products.reduce((total, product) => {
      return total + product.price * (product.quantity || 1);
    }, 0);
    return overallTotal + orderTotal;
  }, 0);
}
export function BasicDashboard() {
  const { data, isFetching, isLoading } = useGetAllProductsQuery("page=1");

  const {
    data: orderData,
    isLoading: isOrderLoading,
    isFetching: isOrderFetching,
  } = useGetAllOrdersQuery(undefined);

  if (isFetching || isLoading || isOrderLoading || isOrderFetching) {
    return (
      <div className="min-h-screen text-center mt-5 text-lg text-gray-600">
        Loading...
      </div>
    );
  }

  const orders: TOrder[] = orderData?.data;

  const totalSales = calculateTotal(orders);

  const rounded = Math.ceil(totalSales);

  const totalProducts = data?.totalData;
  const totalOrders = orderData?.totalData;

  return (
    <div className="flex flex-col h-full w-full bg-background text-foreground">
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">${rounded}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{totalProducts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>New Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{totalOrders}</div>
          </CardContent>
        </Card>
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order Number</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders?.map((order: TOrder) => {
                  return (
                    <TableRow key={order._id}>
                      <TableCell>{order.orderData.orderNumber}</TableCell>
                      <TableCell>
                        {order.orderData.firstName} {order.orderData.lastName}
                      </TableCell>
                      <TableCell>{order.orderData.time}</TableCell>
                      <TableCell>${calculateTotal([order])}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {order.orderData.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
