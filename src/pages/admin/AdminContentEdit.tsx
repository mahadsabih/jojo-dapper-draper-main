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
import { getContentPage, saveContentPage } from "@/lib/adminData";
import { toast } from "sonner";

const AdminContentEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "new";

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    status: "draft" as "published" | "draft",
    content: "",
    sortOrder: undefined as number | undefined,
  });

  useEffect(() => {
    if (!isNew && id) {
      const page = getContentPage(id);
      if (page) {
        setFormData({
          title: page.title,
          slug: page.slug,
          status: page.status,
          content: page.content,
          sortOrder: page.sortOrder,
        });
      }
    }
  }, [id, isNew]);

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: isNew ? title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") : formData.slug,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    saveContentPage({
      id: isNew ? undefined : id,
      title: formData.title,
      slug: formData.slug,
      status: formData.status,
      content: formData.content,
      sortOrder: formData.sortOrder,
    });

    toast.success(isNew ? "Page created" : "Page updated");
    navigate("/admin/content");
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-3xl">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin/content")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-serif font-semibold">
              {isNew ? "Add Page" : "Edit Page"}
            </h1>
            <p className="text-muted-foreground">
              {isNew ? "Create a new content page" : "Update page content"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Page Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Page Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="About Us"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="about-us"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value as typeof formData.status })
                  }
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Write your page content here..."
                rows={15}
                className="font-mono text-sm"
              />
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button type="submit">{isNew ? "Create Page" : "Save Changes"}</Button>
            <Button type="button" variant="outline" onClick={() => navigate("/admin/content")}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminContentEdit;
