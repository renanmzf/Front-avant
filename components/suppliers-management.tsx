"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Plus, Building2, Phone, Mail, MapPin } from "lucide-react"

interface Supplier {
  id: string
  name: string
  cnpj: string
  email: string
  phone: string
  address: string
  category: string
  status: "Ativo" | "Inativo"
  createdAt: string
}

interface SuppliersManagementProps {
  onSupplierSelect?: (supplier: Supplier) => void
}

export function SuppliersManagement({ onSupplierSelect }: SuppliersManagementProps) {
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: "1",
      name: "Concreteira São Paulo",
      cnpj: "12.345.678/0001-90",
      email: "contato@concreteira.com",
      phone: "(11) 99999-1111",
      address: "Rua das Obras, 123 - São Paulo/SP",
      category: "Materiais",
      status: "Ativo",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      name: "João Silva Construções",
      cnpj: "98.765.432/0001-10",
      email: "joao@construcoes.com",
      phone: "(11) 88888-2222",
      address: "Av. Construção, 456 - São Paulo/SP",
      category: "Mão de Obra",
      status: "Ativo",
      createdAt: "2024-01-10",
    },
    {
      id: "3",
      name: "Elétrica Santos",
      cnpj: "11.222.333/0001-44",
      email: "contato@eletrica.com",
      phone: "(11) 77777-3333",
      address: "Rua da Energia, 789 - Santos/SP",
      category: "Instalações",
      status: "Ativo",
      createdAt: "2024-02-01",
    },
  ])

  const [isCreating, setIsCreating] = useState(false)
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    cnpj: "",
    email: "",
    phone: "",
    address: "",
    category: "",
  })

  const categories = ["Materiais", "Mão de Obra", "Instalações", "Equipamentos", "Serviços", "Transporte", "Outros"]

  const handleCreateSupplier = () => {
    const newSupplier: Supplier = {
      id: Date.now().toString(),
      ...formData,
      status: "Ativo",
      createdAt: new Date().toISOString().split("T")[0],
    }
    setSuppliers([...suppliers, newSupplier])
    setFormData({ name: "", cnpj: "", email: "", phone: "", address: "", category: "" })
    setIsCreating(false)
  }

  const handleEditSupplier = (supplier: Supplier) => {
    setEditingSupplier(supplier)
    setFormData({
      name: supplier.name,
      cnpj: supplier.cnpj,
      email: supplier.email,
      phone: supplier.phone,
      address: supplier.address,
      category: supplier.category,
    })
    setIsCreating(true)
  }

  const handleUpdateSupplier = () => {
    if (editingSupplier) {
      setSuppliers(suppliers.map((s) => (s.id === editingSupplier.id ? { ...editingSupplier, ...formData } : s)))
      setEditingSupplier(null)
      setFormData({ name: "", cnpj: "", email: "", phone: "", address: "", category: "" })
      setIsCreating(false)
    }
  }

  const handleDeleteSupplier = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este fornecedor?")) {
      setSuppliers(suppliers.filter((s) => s.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Building2 className="h-5 w-5 mr-2 text-blue-600" />
                Cadastro de Fornecedores
              </CardTitle>
              <CardDescription>Gerencie fornecedores e prestadores de serviço</CardDescription>
            </div>
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Fornecedor
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isCreating && (
            <div className="mb-6 p-4 border rounded-lg bg-gray-50">
              <h4 className="font-medium mb-4">{editingSupplier ? "Editar Fornecedor" : "Novo Fornecedor"}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Nome/Razão Social</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nome do fornecedor"
                  />
                </div>
                <div className="space-y-2">
                  <Label>CNPJ</Label>
                  <Input
                    value={formData.cnpj}
                    onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                    placeholder="00.000.000/0000-00"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contato@fornecedor.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Telefone</Label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Endereço</Label>
                  <Input
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Endereço completo"
                  />
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <Button onClick={editingSupplier ? handleUpdateSupplier : handleCreateSupplier}>
                  {editingSupplier ? "Atualizar" : "Criar"} Fornecedor
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsCreating(false)
                    setEditingSupplier(null)
                    setFormData({ name: "", cnpj: "", email: "", phone: "", address: "", category: "" })
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {suppliers.map((supplier) => (
              <div key={supplier.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium">{supplier.name}</h4>
                    <Badge variant="outline">{supplier.category}</Badge>
                    <Badge variant={supplier.status === "Ativo" ? "default" : "secondary"}>{supplier.status}</Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Building2 className="h-4 w-4 mr-1" />
                      {supplier.cnpj}
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      {supplier.email}
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-1" />
                      {supplier.phone}
                    </div>
                  </div>
                  <div className="flex items-center mt-1 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {supplier.address}
                  </div>
                </div>
                <div className="flex space-x-2">
                  {onSupplierSelect && (
                    <Button size="sm" variant="outline" onClick={() => onSupplierSelect(supplier)}>
                      Selecionar
                    </Button>
                  )}
                  <Button size="sm" variant="outline" onClick={() => handleEditSupplier(supplier)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDeleteSupplier(supplier.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
