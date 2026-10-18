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
import { getCollections, deleteCollection, reorderItem, setItemOrder, saveAllItemsOrder, Collection } from "@/lib/adminData";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const AdminCollections = () => {
  const [collections, setCollections] = useState(getCollections);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = () => {
    if (deleteId) {
      deleteCollection(deleteId);
      setCollections(getCollections());
      toast.success("Collection deleted");
      setDeleteId(null);
    }
  };

  const handleReorder = (id: string, direction: "up" | "down") => {
    reorderItem("collections", id, direction);
    setCollections(getCollections());
  };

  const handleSetOrder = (id: string, newPosition: string) => {
    const pos = parseInt(newPosition);
    if (isNaN(pos) || pos < 1 || pos > collections.length) return;
    setItemOrder("collections", id, pos);
    setCollections(getCollections());
    toast.success("Order updated");
  };

  const handleBulkReorder = (newOrderedCollections: Collection[]) => {
    saveAllItemsOrder("collections", newOrderedCollections);
    setCollections(getCollections());
    toast.success("Order updated");
  };

  const columns = [
    {
      key: "order",
      header: "Order",
      render: (collection: Collection) => {
        const index = collections.findIndex((c) => c.id === collection.id);
        return (
          <div className="flex items-center gap-2">
            <Input
              key={`${collection.id}-${index}`}
              type="number"
              className="w-16 h-8 text-center"
              defaultValue={index + 1}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSetOrder(collection.id, e.currentTarget.value);
                }
              }}
              onBlur={(e) => {
                if (parseInt(e.target.value) !== index + 1) {
                  handleSetOrder(collection.id, e.target.value);
                }
              }}
            />
            <div className="flex flex-col gap-0.5">
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0"
                onClick={() => handleReorder(collection.id, "up")}
                disabled={index === 0}
              >
                <ArrowUp className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0"
                onClick={() => handleReorder(collection.id, "down")}
                disabled={index === collections.length - 1}
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
      header: "Collection",
      render: (collection: Collection) => (
        <div className="flex items-center gap-3">
          <img
            src={collection.image}
            alt={collection.name}
            className="h-10 w-10 rounded object-cover"
          />
          <div>
            <p className="font-medium">{collection.name}</p>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {collection.description}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "productCount",
      header: "Products",
      render: (collection: Collection) => `${collection.productCount} products`,
    },
    {
      key: "status",
      header: "Status",
      render: (collection: Collection) => (
        <Badge variant={collection.status === "active" ? "default" : "secondary"}>
          {collection.status}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "",
      render: (collection: Collection) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link to={`/admin/collections/${collection.id}`}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => setDeleteId(collection.id)}
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
            <h1 className="text-2xl font-serif font-semibold">Collections</h1>
            <p className="text-muted-foreground">Organize products into collections</p>
          </div>
          <Button asChild>
            <Link to="/admin/collections/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Collection
            </Link>
          </Button>
        </div>

        <DataTable
          data={collections}
          columns={columns}
          searchPlaceholder="Search collections..."
          searchKey="name"
          isDraggable={true}
          onReorder={handleBulkReorder}
        />
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Collection</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this collection? This action cannot be undone.
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

export default AdminCollections;
