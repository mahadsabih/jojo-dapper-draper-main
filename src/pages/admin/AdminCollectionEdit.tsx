import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCollection, saveCollection } from "@/lib/adminData";
import { toast } from "sonner";

const AdminCollectionEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "new";

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    image: "/src/assets/collection-suiting.jpg",
    status: "draft" as "active" | "draft",
    productCount: 0,
    sortOrder: undefined as number | undefined,
  });

  useEffect(() => {
    if (!isNew && id) {
      const collection = getCollection(id);
      if (collection) {
        setFormData({
          name: collection.name,
          slug: collection.slug,
          description: collection.description,
          image: collection.image,
          status: collection.status,
          productCount: collection.productCount,
          sortOrder: collection.sortOrder,
        });
      }
    }
  }, [id, isNew]);

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      slug: isNew ? name.toLowerCase().replace(/\s+/g, "-") : formData.slug,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    saveCollection({
      id: isNew ? undefined : id,
      name: formData.name,
      slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-"),
      description: formData.description,
      image: formData.image,
      status: formData.status,
      productCount: formData.productCount,
      sortOrder: formData.sortOrder,
    });

    toast.success(isNew ? "Collection created" : "Collection updated");
    navigate("/admin/collections");
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-2xl">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin/collections")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-serif font-semibold">
              {isNew ? "Add Collection" : "Edit Collection"}
            </h1>
            <p className="text-muted-foreground">
              {isNew ? "Create a new collection" : "Update collection details"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Collection Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Collection Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Suiting"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="suiting"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the collection..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/src/assets/collection-suiting.jpg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value as typeof formData.status })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button type="submit">{isNew ? "Create Collection" : "Save Changes"}</Button>
            <Button type="button" variant="outline" onClick={() => navigate("/admin/collections")}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminCollectionEdit;
