import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { updateProperty } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { 
  MapPin,
  DollarSign,
  Home,
  FileText,
  Save,
  Upload,
  X,
  ImagePlus
} from "lucide-react";

const propertyTypes = [
  "Flats",
  "Builder Floors", 
  "House Villas",
  "Plots",
  "Farmhouses",
  "Hotels",
  "Lands",
  "Office Spaces",
  "Hostels",
  "Shops Showrooms"
];

const EditProperty = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    type: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
  });
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Fetch property by ID
    const fetchProperty = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/properties/${id}`);
        const data = await res.json();
        if (data && !data.error) {
          setFormData({
            title: data.title || "",
            description: data.description || "",
            price: data.price?.toString() || "",
            type: data.type || "",
            location: data.location || "",
            bedrooms: data.bedrooms?.toString() || "",
            bathrooms: data.bathrooms?.toString() || "",
            area: data.area?.toString() || "",
          });
          setExistingImages(data.images || []);
        } else {
          toast({ title: "Error", description: "Property not found", variant: "destructive" });
          navigate("/my-listings");
        }
      } catch (error) {
        toast({ title: "Error", description: "Failed to load property", variant: "destructive" });
        navigate("/my-listings");
      }
      setLoading(false);
    };
    fetchProperty();
  }, [id, navigate, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const totalImages = existingImages.length + newImages.length;
    const availableSlots = 5 - totalImages;
    
    if (availableSlots <= 0) {
      toast({ title: "Image Limit", description: "Maximum 5 images allowed", variant: "destructive" });
      return;
    }

    const filesToAdd = files.slice(0, availableSlots);
    const newImagesToAdd = [...newImages, ...filesToAdd];
    const newPreviews = newImagesToAdd.map(file => URL.createObjectURL(file));
    
    setNewImages(newImagesToAdd);
    setNewImagePreviews(newPreviews);
  };

  const removeNewImage = (index: number) => {
    const newImagesToRemove = newImages.filter((_, i) => i !== index);
    const newPreviewsToRemove = newImagePreviews.filter((_, i) => i !== index);
    
    setNewImages(newImagesToRemove);
    setNewImagePreviews(newPreviewsToRemove);
  };

  const removeExistingImage = (index: number) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const result = await updateProperty(id!, {
        ...formData,
        price: Number(formData.price),
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        area: Number(formData.area),
      }, newImages, existingImages);
      
      if (result.error) {
        toast({ title: "Update Failed", description: result.error, variant: "destructive" });
      } else {
        toast({ title: "Property Updated", description: "Your property has been updated successfully!" });
        navigate("/my-listings");
      }
    } catch (error) {
      toast({ title: "Update Failed", description: "Something went wrong", variant: "destructive" });
    }
    setIsSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading property details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Edit Property</h1>
          <p className="text-muted-foreground">
            Update the details of your property listing
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card className="shadow-card border-0 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-primary" />
                <span>Basic Information</span>
              </CardTitle>
              <CardDescription>
                Update the essential details about your property
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Label htmlFor="title">Property Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Modern 2BHK Apartment with City View"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="type">Property Type *</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="price">Monthly Rent (₹) *</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      placeholder="50000"
                      value={formData.price}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="location">Location *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      name="location"
                      placeholder="e.g., Bandra West, Mumbai"
                      value={formData.location}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your property, amenities, nearby facilities..."
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Property Details */}
          <Card className="shadow-card border-0 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Home className="h-5 w-5 text-primary" />
                <span>Property Details</span>
              </CardTitle>
              <CardDescription>
                Update the size and layout of your property
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input
                    id="bedrooms"
                    name="bedrooms"
                    type="number"
                    placeholder="2"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="bathrooms">Bathrooms *</Label>
                  <Input
                    id="bathrooms"
                    name="bathrooms"
                    type="number"
                    placeholder="2"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    min="1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="area">Area (sq ft) *</Label>
                  <Input
                    id="area"
                    name="area"
                    type="number"
                    placeholder="1200"
                    value={formData.area}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Property Images */}
          <Card className="shadow-card border-0 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ImagePlus className="h-5 w-5 text-primary" />
                <span>Property Images</span>
              </CardTitle>
              <CardDescription>
                Manage your property images (max 5 total)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Existing Images */}
                {existingImages.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Current Images</Label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {existingImages.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={`http://localhost:5000${image}`}
                            alt={`Property ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeExistingImage(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                          {index === 0 && (
                            <Badge className="absolute bottom-1 left-1 text-xs">
                              Main
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* New Images */}
                {newImagePreviews.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium mb-3 block">New Images</Label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {newImagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview}
                            alt={`New ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeNewImage(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upload Area */}
                {(existingImages.length + newImages.length) < 5 && (
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <div className="text-sm">
                        <span className="font-medium text-primary">Click to upload</span> or drag and drop
                      </div>
                      <div className="text-xs text-muted-foreground">
                        PNG, JPG, JPEG up to 10MB each (max 5 images total)
                      </div>
                    </label>
                  </div>
                )}

                {/* Image Count Info */}
                <div className="text-sm text-muted-foreground text-center">
                  {existingImages.length + newImages.length} of 5 images used
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/my-listings")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-primary hover:opacity-90 transition-opacity"
              disabled={isSaving}
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProperty;