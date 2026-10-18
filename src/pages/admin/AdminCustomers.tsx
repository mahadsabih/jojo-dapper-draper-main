import { useState } from "react";
import { Mail } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import DataTable from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { getCustomers, Customer } from "@/lib/adminData";

const AdminCustomers = () => {
  const [customers] = useState(getCustomers);

  const columns = [
    {
      key: "name",
      header: "Customer",
      render: (customer: Customer) => (
        <div>
          <p className="font-medium">{customer.name}</p>
          <p className="text-sm text-muted-foreground">{customer.email}</p>
        </div>
      ),
    },
    {
      key: "orders",
      header: "Orders",
      render: (customer: Customer) => `${customer.orders} orders`,
    },
    {
      key: "totalSpent",
      header: "Total Spent",
      render: (customer: Customer) => `Rs.${customer.totalSpent.toFixed(2)}`,
    },
    {
      key: "createdAt",
      header: "Member Since",
    },
    {
      key: "actions",
      header: "",
      render: (customer: Customer) => (
        <Button variant="ghost" size="icon" asChild>
          <a href={`mailto:${customer.email}`}>
            <Mail className="h-4 w-4" />
          </a>
        </Button>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-serif font-semibold">Customers</h1>
          <p className="text-muted-foreground">View and manage your customer base</p>
        </div>

        <DataTable
          data={customers}
          columns={columns}
          searchPlaceholder="Search customers..."
          searchKey="name"
        />
      </div>
    </AdminLayout>
  );
};

export default AdminCustomers;
