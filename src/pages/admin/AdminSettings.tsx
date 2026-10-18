import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const AdminSettings = () => {
  const [storeSettings, setStoreSettings] = useState({
    storeName: "Fabric Emporium",
    storeEmail: "contact@fabricemporium.com",
    storePhone: "+1 (555) 123-4567",
    storeAddress: "123 Fashion Street, New York, NY 10001",
    currency: "USD",
    taxRate: "8.5",
  });

  const [shippingSettings, setShippingSettings] = useState({
    freeShippingThreshold: "100",
    standardShippingRate: "9.99",
    expressShippingRate: "19.99",
    internationalShipping: true,
  });

  const [notificationSettings, setNotificationSettings] = useState({
    orderConfirmation: true,
    shippingUpdates: true,
    marketingEmails: false,
    lowStockAlerts: true,
  });

  const handleSaveStore = () => {
    localStorage.setItem("store_settings", JSON.stringify(storeSettings));
    toast.success("Store settings saved");
  };

  const handleSaveShipping = () => {
    localStorage.setItem("shipping_settings", JSON.stringify(shippingSettings));
    toast.success("Shipping settings saved");
  };

  const handleSaveNotifications = () => {
    localStorage.setItem("notification_settings", JSON.stringify(notificationSettings));
    toast.success("Notification settings saved");
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="text-2xl font-serif font-semibold">Settings</h1>
          <p className="text-muted-foreground">Manage your store configuration</p>
        </div>

        <Tabs defaultValue="store">
          <TabsList>
            <TabsTrigger value="store">Store</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="store" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Store Information</CardTitle>
                <CardDescription>Basic information about your store</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input
                    id="storeName"
                    value={storeSettings.storeName}
                    onChange={(e) => setStoreSettings({ ...storeSettings, storeName: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="storeEmail">Email</Label>
                    <Input
                      id="storeEmail"
                      type="email"
                      value={storeSettings.storeEmail}
                      onChange={(e) => setStoreSettings({ ...storeSettings, storeEmail: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storePhone">Phone</Label>
                    <Input
                      id="storePhone"
                      value={storeSettings.storePhone}
                      onChange={(e) => setStoreSettings({ ...storeSettings, storePhone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeAddress">Address</Label>
                  <Textarea
                    id="storeAddress"
                    value={storeSettings.storeAddress}
                    onChange={(e) => setStoreSettings({ ...storeSettings, storeAddress: e.target.value })}
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Input
                      id="currency"
                      value={storeSettings.currency}
                      onChange={(e) => setStoreSettings({ ...storeSettings, currency: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxRate">Tax Rate (%)</Label>
                    <Input
                      id="taxRate"
                      type="number"
                      step="0.1"
                      value={storeSettings.taxRate}
                      onChange={(e) => setStoreSettings({ ...storeSettings, taxRate: e.target.value })}
                    />
                  </div>
                </div>
                <Button onClick={handleSaveStore}>Save Store Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shipping" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Options</CardTitle>
                <CardDescription>Configure shipping rates and options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="freeShipping">Free Shipping Threshold (Rs.)</Label>
                  <Input
                    id="freeShipping"
                    type="number"
                    value={shippingSettings.freeShippingThreshold}
                    onChange={(e) =>
                      setShippingSettings({ ...shippingSettings, freeShippingThreshold: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="standardRate">Standard Shipping (Rs.)</Label>
                    <Input
                      id="standardRate"
                      type="number"
                      step="0.01"
                      value={shippingSettings.standardShippingRate}
                      onChange={(e) =>
                        setShippingSettings({ ...shippingSettings, standardShippingRate: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expressRate">Express Shipping (Rs.)</Label>
                    <Input
                      id="expressRate"
                      type="number"
                      step="0.01"
                      value={shippingSettings.expressShippingRate}
                      onChange={(e) =>
                        setShippingSettings({ ...shippingSettings, expressShippingRate: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>International Shipping</Label>
                    <p className="text-sm text-muted-foreground">Enable shipping to international addresses</p>
                  </div>
                  <Switch
                    checked={shippingSettings.internationalShipping}
                    onCheckedChange={(checked) =>
                      setShippingSettings({ ...shippingSettings, internationalShipping: checked })
                    }
                  />
                </div>
                <Button onClick={handleSaveShipping}>Save Shipping Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>Configure which notifications to send</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Order Confirmation</Label>
                    <p className="text-sm text-muted-foreground">Send email when order is placed</p>
                  </div>
                  <Switch
                    checked={notificationSettings.orderConfirmation}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, orderConfirmation: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Shipping Updates</Label>
                    <p className="text-sm text-muted-foreground">Send email when order ships</p>
                  </div>
                  <Switch
                    checked={notificationSettings.shippingUpdates}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, shippingUpdates: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">Send promotional emails to customers</p>
                  </div>
                  <Switch
                    checked={notificationSettings.marketingEmails}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, marketingEmails: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Low Stock Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified when inventory is low</p>
                  </div>
                  <Switch
                    checked={notificationSettings.lowStockAlerts}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, lowStockAlerts: checked })
                    }
                  />
                </div>
                <Button onClick={handleSaveNotifications}>Save Notification Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
