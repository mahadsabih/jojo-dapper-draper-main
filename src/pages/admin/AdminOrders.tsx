import { useState } from "react";
import { Eye } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import DataTable from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getOrders, updateOrderStatus, Order } from "@/lib/adminData";
import { toast } from "sonner";

const AdminOrders = () => {
  const [orders, setOrders] = useState(getOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleStatusChange = (orderId: string, status: Order["status"]) => {
    updateOrderStatus(orderId, status);
    setOrders(getOrders());
    toast.success("Order status updated");
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
        {status}
      </span>
    );
  };

  const columns = [
    {
      key: "id",
      header: "Order ID",
      render: (order: Order) => <span className="font-mono">{order.id}</span>,
    },
    {
      key: "customer",
      header: "Customer",
      render: (order: Order) => (
        <div>
          <p className="font-medium">{order.customer}</p>
          <p className="text-sm text-muted-foreground">{order.email}</p>
        </div>
      ),
    },
    {
      key: "items",
      header: "Items",
      render: (order: Order) => `${order.items} item${order.items > 1 ? "s" : ""}`,
    },
    {
      key: "total",
      header: "Total",
      render: (order: Order) => `Rs.${order.total.toFixed(2)}`,
    },
    {
      key: "status",
      header: "Status",
      render: (order: Order) => (
        <Select
          value={order.status}
          onValueChange={(value) => handleStatusChange(order.id, value as Order["status"])}
        >
          <SelectTrigger className="w-32 h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    {
      key: "createdAt",
      header: "Date",
    },
    {
      key: "actions",
      header: "",
      render: (order: Order) => (
        <Button variant="ghost" size="icon" onClick={() => setSelectedOrder(order)}>
          <Eye className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-serif font-semibold">Orders</h1>
          <p className="text-muted-foreground">Manage and track customer orders</p>
        </div>

        <DataTable
          data={orders}
          columns={columns}
          searchPlaceholder="Search by order ID..."
          searchKey="id"
        />
      </div>

      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Order ID</p>
                  <p className="font-mono">{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  {getStatusBadge(selectedOrder.status)}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Customer</p>
                  <p>{selectedOrder.customer}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p>{selectedOrder.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Items</p>
                  <p>{selectedOrder.items}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="font-medium">Rs.${selectedOrder.total.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Order Date</p>
                  <p>{selectedOrder.createdAt}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminOrders;
