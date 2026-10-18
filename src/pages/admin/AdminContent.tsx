import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2, MoreHorizontal, FileText, ArrowUp, ArrowDown } from "lucide-react";
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
import { getContentPages, deleteContentPage, reorderItem, setItemOrder, saveAllItemsOrder, ContentPage } from "@/lib/adminData";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const AdminContent = () => {
  const [pages, setPages] = useState(getContentPages);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = () => {
    if (deleteId) {
      deleteContentPage(deleteId);
      setPages(getContentPages());
      toast.success("Page deleted");
      setDeleteId(null);
    }
  };

  const handleReorder = (id: string, direction: "up" | "down") => {
    reorderItem("content", id, direction);
    setPages(getContentPages());
  };

  const handleSetOrder = (id: string, newPosition: string) => {
    const pos = parseInt(newPosition);
    if (isNaN(pos) || pos < 1 || pos > pages.length) return;
    setItemOrder("content", id, pos);
    setPages(getContentPages());
    toast.success("Order updated");
  };

  const handleBulkReorder = (newOrderedPages: ContentPage[]) => {
    saveAllItemsOrder("content", newOrderedPages);
    setPages(getContentPages());
    toast.success("Order updated");
  };

  const columns = [
    {
      key: "order",
      header: "Order",
      render: (page: ContentPage) => {
        const index = pages.findIndex((p) => p.id === page.id);
        return (
          <div className="flex items-center gap-2">
            <Input
              key={`${page.id}-${index}`}
              type="number"
              className="w-16 h-8 text-center"
              defaultValue={index + 1}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSetOrder(page.id, e.currentTarget.value);
                }
              }}
              onBlur={(e) => {
                if (parseInt(e.target.value) !== index + 1) {
                  handleSetOrder(page.id, e.target.value);
                }
              }}
            />
            <div className="flex flex-col gap-0.5">
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0"
                onClick={() => handleReorder(page.id, "up")}
                disabled={index === 0}
              >
                <ArrowUp className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0"
                onClick={() => handleReorder(page.id, "down")}
                disabled={index === pages.length - 1}
              >
                <ArrowDown className="h-3 w-3" />
              </Button>
            </div>
          </div>
        );
      },
    },
    {
      key: "title",
      header: "Page",
      render: (page: ContentPage) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
            <FileText className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium">{page.title}</p>
            <p className="text-sm text-muted-foreground">/{page.slug}</p>
          </div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (page: ContentPage) => (
        <Badge variant={page.status === "published" ? "default" : "secondary"}>
          {page.status}
        </Badge>
      ),
    },
    {
      key: "lastModified",
      header: "Last Modified",
    },
    {
      key: "actions",
      header: "",
      render: (page: ContentPage) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link to={`/admin/content/${page.id}`}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => setDeleteId(page.id)}
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
            <h1 className="text-2xl font-serif font-semibold">Content Pages</h1>
            <p className="text-muted-foreground">Manage your website content</p>
          </div>
          <Button asChild>
            <Link to="/admin/content/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Page
            </Link>
          </Button>
        </div>

        <DataTable
          data={pages}
          columns={columns}
          searchPlaceholder="Search pages..."
          searchKey="title"
          isDraggable={true}
          onReorder={handleBulkReorder}
        />
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Page</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this page? This action cannot be undone.
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

export default AdminContent;
