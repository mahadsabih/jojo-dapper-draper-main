import { Package, ShoppingCart, Users, DollarSign, TrendingUp, Clock } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import StatsCard from "@/components/admin/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getDashboardStats, getOrders } from "@/lib/adminData";

const AdminDashboard = () => {
  const stats = getDashboardStats();
  const recentOrders = getOrders().slice(0, 5);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      pending: "outline",
      processing: "secondary",
      shipped: "default",
      delivered: "default",
      cancelled: "destructive",
    };
    return <Badge variant={variants[status] || "outline"}>{status}</Badge>;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-serif font-semibold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your store overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Revenue"
            value={`Rs.${stats.totalRevenue.toFixed(2)}`}
            change="+12.5% from last month"
            changeType="positive"
            icon={DollarSign}
          />
          <StatsCard
            title="Total Orders"
            value={stats.totalOrders}
            change={`${stats.pendingOrders} pending`}
            changeType="neutral"
            icon={ShoppingCart}
          />
          <StatsCard
            title="Products"
            value={stats.totalProducts}
            change={`${stats.activeProducts} active`}
            changeType="neutral"
            icon={Package}
          />
          <StatsCard
            title="Customers"
            value={stats.totalCustomers}
            change="+3 this week"
            changeType="positive"
            icon={Users}
          />
        </div>

        {/* Recent Orders & Quick Actions */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between py-2 border-b last:border-0"
                  >
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.customer}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Rs.${order.total.toFixed(2)}</p>
                      {getStatusBadge(order.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Quick Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-muted-foreground">Average Order Value</span>
                  <span className="font-medium">
                    Rs.${stats.totalOrders > 0 ? (stats.totalRevenue / stats.totalOrders).toFixed(2) : "0.00"}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-muted-foreground">Products per Collection</span>
                  <span className="font-medium">
                    {(stats.totalProducts / 3).toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-muted-foreground">Customer Lifetime Value</span>
                  <span className="font-medium">
                    Rs.${stats.totalCustomers > 0 ? (stats.totalRevenue / stats.totalCustomers).toFixed(2) : "0.00"}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-muted-foreground">Order Fulfillment Rate</span>
                  <span className="font-medium text-green-600">94%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
