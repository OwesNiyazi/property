import { useEffect, useState } from "react";
import { getUserProperties, deleteProperty } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const MyListings = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (!user) return;
    getUserProperties(user.id).then((data) => {
      setProperties(data);
      setLoading(false);
    });
  }, [user]);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await deleteProperty(id);
    setProperties((prev) => prev.filter((p) => p._id !== id));
    setDeletingId(null);
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Please log in to view your listings.</div>;
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-3xl font-bold mb-6">My Listings</h1>
      {properties.length === 0 ? (
        <div>No properties found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.map((property) => {
            const imageUrl = property.images && property.images.length > 0 ? `http://localhost:5000${property.images[0]}` : "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
            return (
              <Card key={property._id} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-0 bg-card/50 backdrop-blur">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={imageUrl}
                    alt={property.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{property.title}</CardTitle>
                  <CardDescription>{property.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold mb-2">₹{property.price}/month</div>
                  <div className="text-sm text-muted-foreground mb-2">{property.type}</div>
                  <div className="text-sm mb-4">{property.description}</div>
                  <div className="flex gap-2">
                  <Button 
  size="sm" 
  variant="outline" 
  onClick={() => {
    console.log('Navigating to:', `/edit-property/${property._id}`);
    navigate(`/edit-property/${property._id}`);
  }}
>
  Edit
</Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(property._id)} disabled={deletingId === property._id}>
                      {deletingId === property._id ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyListings;