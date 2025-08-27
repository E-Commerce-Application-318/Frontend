"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import type { Product } from "@/components/products/product-card"
import Image from "next/image"

interface SellerDashboardProps {
  user: {
    name: string
    email: string
    userType: "customer" | "seller"
  }
  products: Product[]
  onAddProduct: (product: Omit<Product, "id">) => void
  onUpdateProduct: (productId: string, updates: Partial<Product>) => void
  onDeleteProduct: (productId: string) => void
}

export function SellerDashboard({
  user,
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
}: SellerDashboardProps) {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    image: null as File | null,
    inStock: true,
  })

  const totalProducts = products.length
  const inStockProducts = products.filter((p) => p.inStock).length
  const outOfStockProducts = products.filter((p) => !p.inStock).length

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.category) {
      const product = {
        name: newProduct.name,
        price: Number.parseInt(newProduct.price),
        category: newProduct.category,
        image: newProduct.image ? URL.createObjectURL(newProduct.image) : "/placeholder.svg?height=40&width=40",
        inStock: newProduct.inStock,
        seller: user.name,
        rating: 0,        // add default
      reviewCount: 0,
      }
      onAddProduct(product)
      setNewProduct({
        name: "",
        price: "",
        category: "",
        image: null,
        inStock: true,
      })
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewProduct({ ...newProduct, image: file })
    }
  }

  const handleDeleteProduct = (id: string) => {
    onDeleteProduct(id)
  }

  const handleToggleStock = (id: string) => {
    const product = products.find((p) => p.id === id)
    if (product) {
      onUpdateProduct(id, { inStock: !product.inStock })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Seller Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Add New Product Section */}
        <Card>
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="productName">Product Name</Label>
              <Input
                id="productName"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                placeholder="Enter product name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="productPrice">Price ($)</Label>
              <Input
                id="productPrice"
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="productCategory">Category</Label>
              <Select
                value={newProduct.category}
                onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Clothing">Clothing</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                  <SelectItem value="Shoes">Shoes</SelectItem>
              
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="productImage">Product Image</Label>
              <Input
                id="productImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="cursor-pointer"
              />
              {newProduct.image && <p className="text-sm text-muted-foreground">Selected: {newProduct.image.name}</p>}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="inStock"
                checked={newProduct.inStock}
                onCheckedChange={(checked) => setNewProduct({ ...newProduct, inStock: checked as boolean })}
              />
              <Label htmlFor="inStock">In Stock</Label>
            </div>

            <Button onClick={handleAddProduct} className="w-full bg-green-600 hover:bg-green-700">
              Add Product
            </Button>
          </CardContent>
        </Card>

        {/* My Products Section */}
        <Card>
          <CardHeader>
            <CardTitle>My Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        ${product.price} • {product.category}
                      </p>
                      <Badge className={product.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleStock(product.id)}
                      className={!product.inStock ? "text-green-600" : "text-red-600"}
                    >
                      {product.inStock ? "Mark Out of Stock" : "Mark In Stock"}
                    </Button>
                    <Button variant="outline" size="sm" className="text-blue-600 bg-transparent">
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-600"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
              {products.length === 0 && <p className="text-center text-muted-foreground py-8">No products added yet</p>}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sales Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">{totalProducts}</div>
              <p className="text-sm text-muted-foreground">Total Products</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">{inStockProducts}</div>
              <p className="text-sm text-muted-foreground">In Stock</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600">{outOfStockProducts}</div>
              <p className="text-sm text-muted-foreground">Out of Stock</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
