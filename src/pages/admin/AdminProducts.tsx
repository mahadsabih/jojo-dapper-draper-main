import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2, MoreHorizontal, ArrowUp, ArrowDown } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import DataTable from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getProducts, deleteProduct, reorderItem, setItemOrder, saveAllItemsOrder, Product } from "@/lib/adminData";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const AdminProducts = () => {
  const [products, setProducts] = useState(getProducts);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = () => {
    if (deleteId) {
      deleteProduct(deleteId);
      setProducts(getProducts());
      toast.success("Product deleted");
      setDeleteId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "outline"> = {
      active: "default",
      draft: "secondary",
      archived: "outline",
    };
    return <Badge variant={variants[status] || "outline"}>{status}</Badge>;
  };

  const handleReorder = (id: string, direction: "up" | "down") => {
    reorderItem("products", id, direction);
    setProducts(getProducts());
  };

  const handleSetOrder = (id: string, newPosition: string) => {
    const pos = parseInt(newPosition);
    if (isNaN(pos) || pos < 1 || pos > products.length) return;
    setItemOrder("products", id, pos);
    setProducts(getProducts());
    toast.success("Order updated");
  };

  const handleBulkReorder = (newOrderedProducts: Product[]) => {
    saveAllItemsOrder("products", newOrderedProducts);
    setProducts(getProducts());
    toast.success("Order updated");
  };

  const columns = [
    {
      key: "order",
      header: "Order",
      render: (product: Product) => {
        const index = products.findIndex((p) => p.id === product.id);
        return (
          <div className="flex items-center gap-2">
            <Input
              key={`${product.id}-${index}`}
              type="number"
              className="w-16 h-8 text-center"
              defaultValue={index + 1}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSetOrder(product.id, e.currentTarget.value);
                }
              }}
              onBlur={(e) => {
                if (parseInt(e.target.value) !== index + 1) {
                  handleSetOrder(product.id, e.target.value);
                }
              }}
            />
            <div className="flex flex-col gap-0.5">
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0"
                onClick={() => handleReorder(product.id, "up")}
                disabled={index === 0}
              >
                <ArrowUp className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0"
                onClick={() => handleReorder(product.id, "down")}
                disabled={index === products.length - 1}
              >
                <ArrowDown className="h-3 w-3" />
              </Button>
            </div>
          </div>
        );
      },
    },
    {
      key: "name",
      header: "Product",
      render: (product: Product) => (
        <div className="flex items-center gap-3">
          <img
            src={product.image}
            alt={product.name}
            className="h-10 w-10 rounded object-cover"
          />
          <div>
            <p className="font-medium">{product.name}</p>
            <p className="text-sm text-muted-foreground">{product.collection}</p>
          </div>
        </div>
      ),
    },
    {
      key: "price",
      header: "Price",
      render: (product: Product) => `Rs.${product.price.toFixed(2)}`,
    },
    {
      key: "inventory",
      header: "Inventory",
      render: (product: Product) => (
        <span className={product.inventory < 10 ? "text-red-600" : ""}>
          {product.inventory} units
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (product: Product) => getStatusBadge(product.status),
    },
    {
      key: "actions",
      header: "",
      render: (product: Product) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link to={`/admin/products/${product.id}`}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => setDeleteId(product.id)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif font-semibold">Products</h1>
            <p className="text-muted-foreground">Manage your product catalog</p>
          </div>
          <Button asChild>
            <Link to="/admin/products/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Link>
          </Button>
        </div>

        <DataTable
          data={products}
          columns={columns}
          searchPlaceholder="Search products..."
          searchKey="name"
          isDraggable={true}
          onReorder={handleBulkReorder}
        />
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminProducts;
