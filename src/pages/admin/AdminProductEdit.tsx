import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Plus, X, Upload } from "lucide-react";
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
import { getProduct, saveProduct, getCollections } from "@/lib/adminData";
import { toast } from "sonner";

const AdminProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "new";
  const collections = getCollections();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    salePrice: "",
    collection: "",
    status: "draft" as "active" | "draft" | "archived",
    inventory: "",
    image: "/src/assets/product-1.jpg",
    images: [] as string[],
    description: "",
    details: "",
    composition: "",
    width: "",
    weight: "",
    origin: "",
    isNew: false,
    isSale: false,
    sortOrder: undefined as number | undefined,
  });

  const [newImageUrl, setNewImageUrl] = useState("");

  useEffect(() => {
    if (!isNew && id) {
      const product = getProduct(id);
      if (product) {
        setFormData({
          name: product.name,
          price: product.price.toString(),
          salePrice: product.salePrice?.toString() || "",
          collection: product.collection,
          status: product.status,
          inventory: product.inventory.toString(),
          image: product.image,
          images: product.images && product.images.length > 0 ? product.images : [product.image],
          description: product.description,
          details: product.details.join("\n"),
          composition: product.composition,
          width: product.width,
          weight: product.weight,
          origin: product.origin,
          isNew: product.isNew || false,
          isSale: product.isSale || false,
          sortOrder: product.sortOrder,
        });
      }
    }
  }, [id, isNew]);

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImageUrl.trim()]
      }));
      setNewImageUrl("");
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure we have at least one image
    const finalImages = formData.images.length > 0 ? formData.images : [formData.image];

    saveProduct({
      id: isNew ? undefined : id,
      name: formData.name,
      price: parseFloat(formData.price) || 0,
      salePrice: formData.salePrice ? parseFloat(formData.salePrice) : undefined,
      collection: formData.collection,
      status: formData.status,
      inventory: parseInt(formData.inventory) || 0,
      image: finalImages[0], // Main image is the first one
      images: finalImages,
      description: formData.description,
      details: formData.details.split("\n").filter(Boolean),
      composition: formData.composition || "100% Wool",
      width: formData.width || "150 cm",
      weight: formData.weight || "280 g/m²",
      origin: formData.origin || "Italy",
      isNew: formData.isNew,
      isSale: formData.isSale,
      sortOrder: formData.sortOrder,
    });

    toast.success(isNew ? "Product created" : "Product updated");
    navigate("/admin/products");
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-2xl">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin/products")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-serif font-semibold">
              {isNew ? "Add Product" : "Edit Product"}
            </h1>
            <p className="text-muted-foreground">
              {isNew ? "Create a new product" : "Update product details"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Premium Italian Wool"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (Rs.)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="89.99"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salePrice">Sale Price (Rs.)</Label>
                  <Input
                    id="salePrice"
                    type="number"
                    step="0.01"
                    value={formData.salePrice}
                    onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="collection">Collection</Label>
                  <Select
                    value={formData.collection}
                    onValueChange={(value) => setFormData({ ...formData, collection: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select collection" />
                    </SelectTrigger>
                    <SelectContent>
                      {collections.map((col) => (
                        <SelectItem key={col.id} value={col.name}>
                          {col.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inventory">Inventory</Label>
                  <Input
                    id="inventory"
                    type="number"
                    value={formData.inventory}
                    onChange={(e) => setFormData({ ...formData, inventory: e.target.value })}
                    placeholder="100"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="origin">Origin</Label>
                  <Input
                    id="origin"
                    value={formData.origin}
                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    placeholder="Italy"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="composition">Composition</Label>
                  <Input
                    id="composition"
                    value={formData.composition}
                    onChange={(e) => setFormData({ ...formData, composition: e.target.value })}
                    placeholder="100% Wool"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="width">Width</Label>
                  <Input
                    id="width"
                    value={formData.width}
                    onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                    placeholder="150 cm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight</Label>
                  <Input
                    id="weight"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    placeholder="280 g/m²"
                  />
                </div>
              </div>

              {/* Multi-Image Upload Section */}
              <div className="space-y-4">
                <Label>Product Images</Label>

                {/* Images List */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {formData.images.map((img, index) => (
                    <div key={index} className="relative group aspect-square border rounded-md overflow-hidden bg-muted">
                      <img src={img} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}

                  {/* Empty state if no images */}
                  {formData.images.length === 0 && (
                    <div className="aspect-square border border-dashed rounded-md flex items-center justify-center text-muted-foreground text-sm">
                      No images
                    </div>
                  )}
                </div>

                {/* Add Image Input */}
                <div className="flex gap-2">
                  <Input
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="Enter image URL..."
                    className="flex-1"
                  />
                  <Button type="button" variant="outline" onClick={handleAddImage}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Added {formData.images.length} images. The first image will be used as the main cover.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the product..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="details">Details (one per line)</Label>
                <Textarea
                  id="details"
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Premium Italian wool&#10;Classic herringbone weave"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button type="submit">{isNew ? "Create Product" : "Save Changes"}</Button>
            <Button type="button" variant="outline" onClick={() => navigate("/admin/products")}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminProductEdit;
