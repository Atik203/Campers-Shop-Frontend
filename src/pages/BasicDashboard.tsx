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
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { TProduct } from "@/types/product.types";

export function BasicDashboard() {
  const { data, isFetching, isLoading } = useGetAllProductsQuery("page=1");

  if (isFetching || isLoading) {
    return (
      <div className="min-h-screen text-center mt-5 text-lg text-gray-600">
        Loading...
      </div>
    );
  }
  const products = data?.data as TProduct[];

  const totalSales = products.reduce((acc, product) => {
    return acc + product.price * product.stock;
  }, 0);

  const rounded = Math.ceil(totalSales);

  const totalProducts = products.length;

  return (
    <div className="flex flex-col h-full w-full bg-background text-foreground">
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">${rounded}</div>
            <p className="text-sm text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{totalProducts}</div>
            <p className="text-sm text-muted-foreground">+5 new this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>New Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">28</div>
            <p className="text-sm text-muted-foreground">+4 from last week</p>
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
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>#1234</TableCell>
                  <TableCell>Jane Doe</TableCell>
                  <TableCell>2024-07-25</TableCell>
                  <TableCell>$49.99</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Fulfilled</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>#1235</TableCell>
                  <TableCell>John Smith</TableCell>
                  <TableCell>2024-08-12</TableCell>
                  <TableCell>$99.99</TableCell>
                  <TableCell>
                    <Badge variant="outline">Pending</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>#1236</TableCell>
                  <TableCell>Sarah Johnson</TableCell>
                  <TableCell>2024-07-30</TableCell>
                  <TableCell>$79.99</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Fulfilled</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
