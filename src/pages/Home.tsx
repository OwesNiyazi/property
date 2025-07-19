import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Heart,
  Filter,
  Building2,
  Home as HomeIcon,
  Briefcase,
  TreePine,
  Hotel,
  Store
} from "lucide-react";
import { getProperties } from "@/lib/api";

const propertyTypes = [
  "All Types",
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

const getPropertyIcon = (type: string) => {
  switch (type) {
    case "Flats":
    case "Builder Floors":
      return Building2;
    case "House Villas":
      return HomeIcon;
    case "Office Spaces":
      return Briefcase;
    case "Farmhouses":
    case "Plots":
    case "Lands":
      return TreePine;
    case "Hotels":
    case "Hostels":
      return Hotel;
    case "Shops Showrooms":
      return Store;
    default:
      return Building2;
  }
};

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [priceRange, setPriceRange] = useState("All Prices");
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProperties().then((data) => {
      setProperties(data);
      setLoading(false);
    });
  }, []);

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}/month`;
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "All Types" || property.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Perfect{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Property
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover amazing properties for rent and sale. Your dream home is just a click away.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto bg-card/80 backdrop-blur p-6 rounded-2xl shadow-card border">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by location or property name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  {propertyTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Prices">All Prices</SelectItem>
                  <SelectItem value="0-30000">Under ₹30,000</SelectItem>
                  <SelectItem value="30000-60000">₹30,000 - ₹60,000</SelectItem>
                  <SelectItem value="60000-100000">₹60,000 - ₹1,00,000</SelectItem>
                  <SelectItem value="100000+">Above ₹1,00,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Properties</h2>
              <p className="text-muted-foreground">
                Showing {filteredProperties.length} properties
              </p>
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>More Filters</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProperties.map((property) => {
              const PropertyIcon = getPropertyIcon(property.type);
              const imageUrl = property.images && property.images.length > 0 ? `http://localhost:5000${property.images[0]}` : "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
              return (
                <Card key={property._id} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-0 bg-card/50 backdrop-blur">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={imageUrl}
                      alt={property.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {property.featured && (
                      <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
                        Featured
                      </Badge>
                    )}
                    <Button
                      size="sm"
                      variant="secondary"
                      className="absolute top-3 right-3 h-8 w-8 p-0 bg-background/80 backdrop-blur hover:bg-background"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-1">{property.title}</CardTitle>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {property.location}
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 text-xs bg-muted px-2 py-1 rounded-full">
                        <PropertyIcon className="h-3 w-3" />
                        <span>{property.type}</span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <CardDescription className="text-sm mb-3 line-clamp-2">
                      {property.description}
                    </CardDescription>
                    
                    <div className="flex justify-between items-center text-sm text-muted-foreground mb-3">
                      {property.bedrooms > 0 && (
                        <div className="flex items-center space-x-1">
                          <Bed className="h-3 w-3" />
                          <span>{property.bedrooms}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1">
                        <Bath className="h-3 w-3" />
                        <span>{property.bathrooms}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Square className="h-3 w-3" />
                        <span>{property.area} sq ft</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-xl font-bold text-primary">
                        {formatPrice(property.price)}
                      </div>
                      <Button size="sm" asChild>
                        <Link to={`/property/${property.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredProperties.length === 0 && (
            <div className="text-center py-12">
              <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No properties found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or browse all properties.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to List Your Property?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of property owners who trust PropertyHub to find the right tenants and buyers.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/add-property">
              List Your Property
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;