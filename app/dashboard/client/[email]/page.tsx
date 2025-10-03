"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Calendar, CheckCircle2, FileStack, LineChart, MessagesSquare, Sparkles, Upload, Users, Workflow, Plus, Eye, Edit, Trash2 } from "lucide-react";

type ClientData = {
  name: string;
  email: string;
  status: string;
  lastLogin: string;
};

export default function ClientManagementPage() {
  const params = useParams();
  const clientEmail = decodeURIComponent(params.email as string);
  
  const [activeTab, setActiveTab] = useState("overview");
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock client data - in real app, fetch from API
  useEffect(() => {
    console.log("Client email from params:", clientEmail);
    const mockClients = {
      "sarah@techstartup.com": { name: "Sarah Johnson", email: "sarah@techstartup.com", status: "Active", lastLogin: "2 days ago" },
      "mike@restaurant.com": { name: "Mike Chen", email: "mike@restaurant.com", status: "Active", lastLogin: "1 day ago" },
      "emma@fashionbrand.com": { name: "Emma Wilson", email: "emma@fashionbrand.com", status: "Pending", lastLogin: "Never" },
    };
    
    const client = mockClients[clientEmail as keyof typeof mockClients];
    console.log("Found client:", client);
    setClientData(client || null);
    setLoading(false);
  }, [clientEmail]);

  const tabs = [
    { id: "overview", name: "Overview", icon: Users },
    { id: "assets", name: "Centralized Assets", icon: Upload },
    { id: "onboarding", name: "Client Onboarding", icon: Users },
    { id: "calendar", name: "Content Calendar", icon: Calendar },
    { id: "approvals", name: "Approvals", icon: CheckCircle2 },
    { id: "ideas", name: "Ideas Generator", icon: Sparkles },
    { id: "reports", name: "Monthly Reports", icon: LineChart },
    { id: "workflow", name: "Workflow Stages", icon: Workflow },
    { id: "announcements", name: "Announcements", icon: MessagesSquare },
  ];

  if (loading) {
    return <div className="mx-auto max-w-7xl px-6 py-10">Loading...</div>;
  }

  if (!clientData) {
    return <div className="mx-auto max-w-7xl px-6 py-10">Client not found</div>;
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Manage Client: {clientData.name}</h1>
          <p className="text-white/70">{clientData.email} • {clientData.status} • Last login: {clientData.lastLogin}</p>
        </div>
        <div className="flex gap-3">
          <button className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/5">
            Send Message
          </button>
          <button className="rounded-lg bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-white/90">
            Generate Report
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition ${
              activeTab === tab.id
                ? "bg-white text-black"
                : "border border-white/20 hover:bg-white/5"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        {activeTab === "overview" && <OverviewTab clientEmail={clientEmail} />}
        {activeTab === "assets" && <AssetsTab clientEmail={clientEmail} />}
        {activeTab === "onboarding" && <OnboardingTab clientEmail={clientEmail} />}
        {activeTab === "calendar" && <CalendarTab clientEmail={clientEmail} />}
        {activeTab === "approvals" && <ApprovalsTab clientEmail={clientEmail} />}
        {activeTab === "ideas" && <IdeasTab clientEmail={clientEmail} />}
        {activeTab === "reports" && <ReportsTab clientEmail={clientEmail} />}
        {activeTab === "workflow" && <WorkflowTab clientEmail={clientEmail} />}
        {activeTab === "announcements" && <AnnouncementsTab clientEmail={clientEmail} />}
      </div>
    </div>
  );
}

// Overview Tab
function OverviewTab({ clientEmail }: { clientEmail: string }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Client Overview</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <div className="text-white/60 text-sm">Total Assets</div>
          <div className="text-2xl font-bold">24</div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <div className="text-white/60 text-sm">Pending Approvals</div>
          <div className="text-2xl font-bold text-orange-400">3</div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <div className="text-white/60 text-sm">Content Ideas</div>
          <div className="text-2xl font-bold">12</div>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <h3 className="font-semibold mb-3">Recent Activity</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>New content approved</span>
              <span className="text-white/60">2 hours ago</span>
            </div>
            <div className="flex justify-between">
              <span>Asset uploaded</span>
              <span className="text-white/60">1 day ago</span>
            </div>
            <div className="flex justify-between">
              <span>Ideas generated</span>
              <span className="text-white/60">3 days ago</span>
            </div>
          </div>
        </div>
        
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <h3 className="font-semibold mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full text-left rounded-lg border border-white/20 px-3 py-2 text-sm hover:bg-white/5">
              Generate Content Ideas
            </button>
            <button className="w-full text-left rounded-lg border border-white/20 px-3 py-2 text-sm hover:bg-white/5">
              Create Calendar Event
            </button>
            <button className="w-full text-left rounded-lg border border-white/20 px-3 py-2 text-sm hover:bg-white/5">
              Send Announcement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Assets Tab
function AssetsTab({ clientEmail }: { clientEmail: string }) {
  const [assets, setAssets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);

  useEffect(() => {
    fetchAssets();
    fetchCategories();
  }, [clientEmail, selectedCategory, selectedType]);

  const fetchAssets = async () => {
    try {
      const params = new URLSearchParams({
        clientEmail,
        ...(selectedCategory !== "all" && { category: selectedCategory }),
        ...(selectedType !== "all" && { type: selectedType })
      });
      
      const response = await fetch(`/api/assets?${params}`);
      if (response.ok) {
        const data = await response.json();
        setAssets(data.assets);
      }
    } catch (error) {
      console.error("Error fetching assets:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/assets/categories");
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const deleteAsset = async (assetId) => {
    if (!confirm("Are you sure you want to delete this asset?")) return;
    
    try {
      const response = await fetch(`/api/assets?id=${assetId}`, {
        method: "DELETE"
      });
      
      if (response.ok) {
        setAssets(prev => prev.filter(asset => asset.id !== assetId));
      }
    } catch (error) {
      console.error("Error deleting asset:", error);
    }
  };

  const downloadAsset = (asset) => {
    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = asset.url;
    link.download = asset.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const viewAsset = (asset) => {
    setSelectedAsset(asset);
  };

  if (loading) {
    return <div className="text-center py-8">Loading assets...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Centralized Assets</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowCategoryModal(true)}
            className="flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/5"
          >
            <Plus className="h-4 w-4" />
            Add Category
          </button>
          <button 
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 rounded-lg bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-white/90"
          >
            <Upload className="h-4 w-4" />
            Upload Asset
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white text-sm"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.name}>{category.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Type</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white text-sm"
          >
            <option value="all">All Types</option>
            <option value="image">Images</option>
            <option value="document">Documents</option>
            <option value="video">Videos</option>
            <option value="brand-kit">Brand Kit</option>
          </select>
        </div>
      </div>

      {/* Assets Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {assets.map((asset) => (
          <div key={asset.id} className="rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between mb-2">
              <button 
                onClick={() => viewAsset(asset)}
                className="font-medium truncate hover:text-blue-400 transition-colors text-left"
                title="Click to preview"
              >
                {asset.name}
              </button>
              <div className="flex gap-1">
                <button 
                  onClick={() => viewAsset(asset)}
                  className="p-1 hover:bg-white/10 rounded"
                  title="View Asset"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => downloadAsset(asset)}
                  className="p-1 hover:bg-white/10 rounded"
                  title="Download Asset"
                >
                  <FileStack className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => deleteAsset(asset.id)}
                  className="p-1 hover:bg-white/10 rounded text-red-400"
                  title="Delete Asset"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span 
                className="px-2 py-1 rounded text-xs text-white"
                style={{ backgroundColor: categories.find(cat => cat.name === asset.category)?.color || "#6B7280" }}
              >
                {asset.category}
              </span>
              <span className="text-sm text-white/60 capitalize">{asset.type.replace("-", " ")}</span>
            </div>
            <div className="text-xs text-white/50">
              {asset.fileSize} • {asset.format} • {asset.uploadedAt}
            </div>
            {asset.description && (
              <div className="text-xs text-white/70 mt-2">{asset.description}</div>
            )}
          </div>
        ))}
      </div>

      {assets.length === 0 && (
        <div className="text-center py-12">
          <Upload className="h-12 w-12 mx-auto text-white/40 mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Assets Found</h3>
          <p className="text-white/70 mb-4">Upload your first asset to get started.</p>
          <button 
            onClick={() => setShowUploadModal(true)}
            className="rounded-lg bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-white/90"
          >
            Upload Asset
          </button>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadAssetModal 
          clientEmail={clientEmail}
          categories={categories}
          onClose={() => setShowUploadModal(false)}
          onUpload={(newAsset) => {
            setAssets(prev => [newAsset, ...prev]);
            setShowUploadModal(false);
          }}
        />
      )}

      {/* Category Modal */}
      {showCategoryModal && (
        <AddCategoryModal 
          onClose={() => setShowCategoryModal(false)}
          onAdd={(newCategory) => {
            setCategories(prev => [...prev, newCategory]);
            setShowCategoryModal(false);
          }}
        />
      )}

      {/* Asset View Modal */}
      {selectedAsset && (
        <AssetViewModal 
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
          onDownload={() => downloadAsset(selectedAsset)}
        />
      )}
    </div>
  );
}

// Upload Asset Modal
function UploadAssetModal({ clientEmail, categories, onClose, onUpload }) {
  const [formData, setFormData] = useState({
    name: "",
    type: "image",
    category: categories[0]?.name || "",
    description: "",
    tags: ""
  });
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const response = await fetch("/api/assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientEmail,
          ...formData,
          tags: formData.tags.split(",").map(tag => tag.trim()).filter(Boolean)
        })
      });

      if (response.ok) {
        const data = await response.json();
        onUpload(data.asset);
      }
    } catch (error) {
      console.error("Error uploading asset:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Upload New Asset</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Asset Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white"
            >
              <option value="image">Image</option>
              <option value="document">Document</option>
              <option value="video">Video</option>
              <option value="brand-kit">Brand Kit</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white"
            >
              {categories.map(category => (
                <option key={category.id} value={category.name}>{category.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Tags (comma-separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white"
              placeholder="logo, branding, primary"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={uploading}
              className="flex-1 rounded-lg bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-white/90 disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Upload Asset"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/5"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Add Category Modal
function AddCategoryModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    color: "#3B82F6"
  });
  const [adding, setAdding] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAdding(true);

    try {
      const response = await fetch("/api/assets/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        onAdd(data.category);
      }
    } catch (error) {
      console.error("Error adding category:", error);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Add New Category</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Category Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Color</label>
            <input
              type="color"
              value={formData.color}
              onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
              className="w-full h-10 rounded-lg bg-white/5 border border-white/10"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={adding}
              className="flex-1 rounded-lg bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-white/90 disabled:opacity-50"
            >
              {adding ? "Adding..." : "Add Category"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/5"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Asset View Modal
function AssetViewModal({ asset, onClose, onDownload }) {
  const getPreviewContent = () => {
    const fileType = asset.type.toLowerCase();
    const format = asset.format.toLowerCase();

    // For demo purposes, we'll show placeholder previews
    // In a real app, you'd load the actual file content
    
    if (fileType === 'image' || ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(format)) {
      return (
        <div className="mb-6">
          <div className="text-sm text-white/60 mb-2">Preview</div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4 flex items-center justify-center min-h-[200px]">
            {/* Demo image placeholder */}
            <div className="text-center">
              <div className="w-48 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-3 flex items-center justify-center">
                <span className="text-white font-medium">Image Preview</span>
              </div>
              <div className="text-sm text-white/60">
                {asset.name} • {asset.fileSize}
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (fileType === 'video' || ['mp4', 'mov', 'avi', 'mkv'].includes(format)) {
      return (
        <div className="mb-6">
          <div className="text-sm text-white/60 mb-2">Preview</div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4 flex items-center justify-center min-h-[200px]">
            <div className="text-center">
              <div className="w-64 h-36 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg mb-3 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2 mx-auto">
                    <div className="w-0 h-0 border-l-[8px] border-l-white border-y-[6px] border-y-transparent ml-1"></div>
                  </div>
                  <span className="text-white font-medium">Video Preview</span>
                </div>
              </div>
              <div className="text-sm text-white/60">
                {asset.name} • {asset.fileSize}
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (fileType === 'document' || ['pdf', 'doc', 'docx', 'txt'].includes(format)) {
      return (
        <div className="mb-6">
          <div className="text-sm text-white/60 mb-2">Preview</div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4 min-h-[200px]">
            <div className="text-center mb-4">
              <div className="w-32 h-40 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg mb-3 flex items-center justify-center mx-auto">
                <div className="text-center">
                  <FileStack className="h-8 w-8 text-white mb-2" />
                  <span className="text-white font-medium text-sm">Document</span>
                </div>
              </div>
              <div className="text-sm text-white/60">
                {asset.name} • {asset.fileSize}
              </div>
            </div>
            
            {/* Mock document content */}
            <div className="bg-white/5 rounded p-3 text-sm text-white/80">
              <div className="space-y-2">
                <div className="h-2 bg-white/20 rounded w-full"></div>
                <div className="h-2 bg-white/20 rounded w-4/5"></div>
                <div className="h-2 bg-white/20 rounded w-3/4"></div>
                <div className="h-2 bg-white/20 rounded w-full"></div>
                <div className="h-2 bg-white/20 rounded w-2/3"></div>
              </div>
              <div className="text-center text-white/50 text-xs mt-3">
                Document preview - Click download to view full content
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (fileType === 'brand-kit') {
      return (
        <div className="mb-6">
          <div className="text-sm text-white/60 mb-2">Preview</div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4 min-h-[200px]">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg mb-2 flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-lg">LOGO</span>
                </div>
                <div className="text-xs text-white/60">Primary Logo</div>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg mb-2 flex items-center justify-center mx-auto">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
                <div className="text-xs text-white/60">Brand Colors</div>
              </div>
            </div>
            <div className="text-center text-white/50 text-xs mt-4">
              Brand kit preview - Download for complete assets
            </div>
          </div>
        </div>
      );
    }

    // Default preview for unknown types
    return (
      <div className="mb-6">
        <div className="text-sm text-white/60 mb-2">Preview</div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-4 flex items-center justify-center min-h-[200px]">
          <div className="text-center">
            <FileStack className="h-12 w-12 text-white/40 mb-3 mx-auto" />
            <div className="text-white/60">Preview not available</div>
            <div className="text-sm text-white/50 mt-1">
              {asset.name} • {asset.fileSize}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{asset.name}</h3>
          <button onClick={onClose} className="text-white/60 hover:text-white text-xl">✕</button>
        </div>
        
        <div className="space-y-6">
          {/* Preview Section */}
          {getPreviewContent()}

          {/* Asset Details */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <div className="text-sm text-white/60">Type</div>
              <div className="font-medium capitalize">{asset.type.replace("-", " ")}</div>
            </div>
            <div>
              <div className="text-sm text-white/60">Category</div>
              <div className="font-medium">{asset.category}</div>
            </div>
            <div>
              <div className="text-sm text-white/60">File Size</div>
              <div className="font-medium">{asset.fileSize}</div>
            </div>
            <div>
              <div className="text-sm text-white/60">Format</div>
              <div className="font-medium">{asset.format}</div>
            </div>
            <div>
              <div className="text-sm text-white/60">Uploaded</div>
              <div className="font-medium">{asset.uploadedAt}</div>
            </div>
            <div>
              <div className="text-sm text-white/60">Uploaded By</div>
              <div className="font-medium">{asset.uploadedBy}</div>
            </div>
          </div>

          {asset.description && (
            <div>
              <div className="text-sm text-white/60 mb-1">Description</div>
              <div className="text-white/80">{asset.description}</div>
            </div>
          )}

          {asset.tags && asset.tags.length > 0 && (
            <div>
              <div className="text-sm text-white/60 mb-2">Tags</div>
              <div className="flex flex-wrap gap-2">
                {asset.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-white/10 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4 border-t border-white/10">
            <button
              onClick={onDownload}
              className="flex items-center gap-2 rounded-lg bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-white/90"
            >
              <FileStack className="h-4 w-4" />
              Download
            </button>
            <button
              onClick={onClose}
              className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/5"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Onboarding Tab
function OnboardingTab({ clientEmail }: { clientEmail: string }) {
  const [onboardingData, setOnboardingData] = useState({
    completed: true,
    summary: "Client goals: Increase brand awareness and drive app downloads. Target audience: Tech-savvy millennials and Gen Z. Platforms: Instagram, TikTok, LinkedIn. Suggested cadence: Daily posts on Instagram, 3x/week on TikTok. Brand voice/notes: Modern, innovative, approachable tech company.",
    completedAt: "2024-01-10"
  });

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Client Onboarding</h2>
      
      {onboardingData.completed ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle2 className="h-5 w-5" />
            <span>Onboarding Completed on {onboardingData.completedAt}</span>
          </div>
          
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <h3 className="font-semibold mb-2">AI Summary</h3>
            <p className="text-white/80 text-sm">{onboardingData.summary}</p>
          </div>
          
          <button className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/5">
            Regenerate Summary
          </button>
        </div>
      ) : (
        <div className="text-center py-8">
          <Users className="h-12 w-12 mx-auto text-white/40 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Onboarding Not Started</h3>
          <p className="text-white/70 mb-4">Send an onboarding link to collect client information.</p>
          <button className="rounded-lg bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-white/90">
            Send Onboarding Link
          </button>
        </div>
      )}
    </div>
  );
}

// Calendar Tab
function CalendarTab({ clientEmail }: { clientEmail: string }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarContent, setCalendarContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showContentModal, setShowContentModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);

  useEffect(() => {
    fetchCalendarContent();
  }, [clientEmail, currentDate]);

  const fetchCalendarContent = async () => {
    try {
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      
      const response = await fetch(`/api/calendar?clientEmail=${clientEmail}&month=${month}&year=${year}`);
      if (response.ok) {
        const data = await response.json();
        setCalendarContent(data.content);
      }
    } catch (error) {
      console.error("Error fetching calendar content:", error);
    } finally {
      setLoading(false);
    }
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getContentForDate = (date) => {
    if (!date) return [];
    const dateString = date.toISOString().split('T')[0];
    return calendarContent.filter(content => content.scheduledDate === dateString);
  };

  const handleDateClick = (date) => {
    if (!date) return;
    setSelectedDate(date);
    setSelectedContent(null);
    setShowContentModal(true);
  };

  const handleContentClick = (content, date) => {
    setSelectedDate(date);
    setSelectedContent(content);
    setShowContentModal(true);
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  if (loading) {
    return <div className="text-center py-8">Loading calendar...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Content Calendar</h2>
        <button 
          onClick={() => {
            setSelectedDate(new Date());
            setSelectedContent(null);
            setShowContentModal(true);
          }}
          className="flex items-center gap-2 rounded-lg bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-white/90"
        >
          <Plus className="h-4 w-4" />
          Add Content
        </button>
      </div>

      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigateMonth(-1)}
          className="p-2 hover:bg-white/10 rounded-lg"
        >
          <span className="text-xl">←</span>
        </button>
        <h3 className="text-lg font-semibold">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <button 
          onClick={() => navigateMonth(1)}
          className="p-2 hover:bg-white/10 rounded-lg"
        >
          <span className="text-xl">→</span>
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="rounded-lg border border-white/10 bg-white/5 overflow-hidden">
        {/* Day Headers */}
        <div className="grid grid-cols-7 border-b border-white/10">
          {dayNames.map(day => (
            <div key={day} className="p-3 text-center text-sm font-medium text-white/60 border-r border-white/10 last:border-r-0">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7">
          {getDaysInMonth(currentDate).map((date, index) => {
            const dayContent = date ? getContentForDate(date) : [];
            const isToday = date && date.toDateString() === new Date().toDateString();
            const isPastDate = date && date < new Date().setHours(0, 0, 0, 0);

            return (
              <div 
                key={index}
                className={`min-h-[120px] border-r border-b border-white/10 last:border-r-0 p-2 ${
                  date ? 'hover:bg-white/5 cursor-pointer' : ''
                } ${isToday ? 'bg-blue-500/10' : ''}`}
                onClick={() => handleDateClick(date)}
              >
                {date && (
                  <>
                    <div className={`text-sm font-medium mb-2 ${
                      isToday ? 'text-blue-400' : isPastDate ? 'text-white/40' : 'text-white/80'
                    }`}>
                      {date.getDate()}
                    </div>
                    
                    <div className="space-y-1">
                      {dayContent.slice(0, 3).map((content) => (
                        <div 
                          key={content.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleContentClick(content, date);
                          }}
                          className={`text-xs p-1 rounded cursor-pointer hover:opacity-80 ${
                            content.status === 'scheduled' ? 'bg-blue-500/20 text-blue-400' :
                            content.status === 'draft' ? 'bg-orange-500/20 text-orange-400' :
                            content.status === 'declined' ? 'bg-red-500/20 text-red-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}
                        >
                          <div className="font-medium truncate">{content.title}</div>
                          <div className="text-white/60">{content.platforms?.join(', ') || content.platform}</div>
                          {content.contentUrl && (
                            <div className="text-white/50">📎 Has content</div>
                          )}
                        </div>
                      ))}
                      
                      {dayContent.length > 3 && (
                        <div className="text-xs text-white/50 text-center">
                          +{dayContent.length - 3} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-blue-500/20"></div>
          <span className="text-white/60">Scheduled</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-orange-500/20"></div>
          <span className="text-white/60">Draft</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-emerald-500/20"></div>
          <span className="text-white/60">Published</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-red-500/20"></div>
          <span className="text-white/60">Declined</span>
        </div>
      </div>

      {/* Content Modal */}
      {showContentModal && (
        <ContentModal 
          clientEmail={clientEmail}
          selectedDate={selectedDate}
          selectedContent={selectedContent}
          onClose={() => setShowContentModal(false)}
          onSave={(newContent) => {
            if (selectedContent) {
              // Update existing content
              setCalendarContent(prev => prev.map(content => 
                content.id === selectedContent.id ? newContent : content
              ));
            } else {
              // Add new content
              setCalendarContent(prev => [...prev, newContent]);
            }
            setShowContentModal(false);
          }}
          onDelete={(contentId) => {
            setCalendarContent(prev => prev.filter(content => content.id !== contentId));
            setShowContentModal(false);
          }}
        />
      )}
    </div>
  );
}

// Content Modal Component
function ContentModal({ clientEmail, selectedDate, selectedContent, onClose, onSave, onDelete }) {
  const [formData, setFormData] = useState({
    title: selectedContent?.title || "",
    description: selectedContent?.description || "",
    platforms: selectedContent?.platforms || [selectedContent?.platform || "Instagram"],
    contentType: selectedContent?.contentType || "Post",
    scheduledDate: selectedDate ? selectedDate.toISOString().split('T')[0] : "",
    scheduledTime: selectedContent?.scheduledTime || "09:00",
    status: selectedContent?.status || "draft",
    approvalStatus: selectedContent?.approvalStatus || "pending",
    tags: selectedContent?.tags?.join(", ") || ""
  });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [contentFile, setContentFile] = useState(null);
  const [contentUrl, setContentUrl] = useState(selectedContent?.contentUrl || null);
  const [agencySettings, setAgencySettings] = useState(null);

  const allPlatforms = ["Instagram", "TikTok", "LinkedIn", "Facebook", "Twitter", "YouTube"];
  const contentTypes = ["Post", "Story", "Reel", "Video", "Carousel", "IGTV"];
  const statuses = ["draft", "scheduled", "published", "declined"];
  const approvalStatuses = ["pending", "approved", "revision-requested", "declined"];

  useEffect(() => {
    fetchAgencySettings();
  }, []);

  const fetchAgencySettings = async () => {
    try {
      const response = await fetch("/api/agency/settings");
      if (response.ok) {
        const data = await response.json();
        setAgencySettings(data.settings);
      }
    } catch (error) {
      console.error("Error fetching agency settings:", error);
    }
  };

  const handlePlatformToggle = (platform) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
  };

  const handleFileUpload = async (file) => {
    setUploading(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      if (selectedContent) {
        uploadFormData.append('contentId', selectedContent.id);
      }

      const response = await fetch("/api/calendar/upload", {
        method: "POST",
        body: uploadFormData
      });

      if (response.ok) {
        const data = await response.json();
        setContentUrl(data.upload.url);
        return data.upload.url;
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      let finalContentUrl = contentUrl;

      // Upload file if one was selected
      if (contentFile) {
        finalContentUrl = await handleFileUpload(contentFile);
      }

      const method = selectedContent ? "PUT" : "POST";
      const body = {
        ...formData,
        clientEmail,
        tags: formData.tags.split(",").map(tag => tag.trim()).filter(Boolean),
        contentUrl: finalContentUrl,
        ...(selectedContent && { id: selectedContent.id })
      };

      const response = await fetch("/api/calendar", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        const data = await response.json();
        onSave(data.content);
      }
    } catch (error) {
      console.error("Error saving content:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedContent || !confirm("Are you sure you want to delete this content?")) return;
    
    setDeleting(true);
    try {
      const response = await fetch(`/api/calendar?id=${selectedContent.id}`, {
        method: "DELETE"
      });

      if (response.ok) {
        onDelete(selectedContent.id);
      }
    } catch (error) {
      console.error("Error deleting content:", error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            {selectedContent ? "Edit Content" : "Add New Content"}
          </h3>
          <button onClick={onClose} className="text-white/60 hover:text-white text-xl">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Platforms (Select multiple)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {allPlatforms.map(platform => (
                <label key={platform} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.platforms.includes(platform)}
                    onChange={() => handlePlatformToggle(platform)}
                    className="rounded border-white/10 bg-white/5 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-white/80">{platform}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white"
              rows={3}
            />
          </div>

          {/* Content Upload Section */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Content Upload</label>
            <div className="space-y-3">
              {contentUrl && (
                <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">📎 Content attached</span>
                      <button
                        type="button"
                        onClick={() => window.open(contentUrl, '_blank')}
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        View
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => setContentUrl(null)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={(e) => setContentFile(e.target.files[0])}
                  className="hidden"
                  id="content-upload"
                />
                <label
                  htmlFor="content-upload"
                  className="cursor-pointer rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/5"
                >
                  {uploading ? "Uploading..." : "Choose File"}
                </label>
                {contentFile && (
                  <span className="text-sm text-white/60">
                    {contentFile.name}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Content Type</label>
              <select
                value={formData.contentType}
                onChange={(e) => setFormData(prev => ({ ...prev, contentType: e.target.value }))}
                className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white"
              >
                {contentTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Scheduled Date</label>
              <input
                type="date"
                value={formData.scheduledDate}
                onChange={(e) => setFormData(prev => ({ ...prev, scheduledDate: e.target.value }))}
                className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Scheduled Time</label>
              <input
                type="time"
                value={formData.scheduledTime}
                onChange={(e) => setFormData(prev => ({ ...prev, scheduledTime: e.target.value }))}
                className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Approval Status</label>
              <select
                value={formData.approvalStatus}
                onChange={(e) => setFormData(prev => ({ ...prev, approvalStatus: e.target.value }))}
                className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white"
              >
                {approvalStatuses.filter(status => 
                  // Hide declined option if agency settings don't allow it
                  status !== 'declined' || agencySettings?.allowClientDecline !== false
                ).map(status => (
                  <option key={status} value={status}>
                    {status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Tags (comma-separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white"
              placeholder="product, launch, announcement"
            />
          </div>

          {/* Client Feedback & Revision Notes */}
          {selectedContent && (selectedContent.clientFeedback || selectedContent.revisionNotes) && (
            <div className="space-y-3">
              {selectedContent.clientFeedback && (
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Client Feedback</label>
                  <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white/80">
                    {selectedContent.clientFeedback}
                  </div>
                </div>
              )}
              
              {selectedContent.revisionNotes && (
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Revision Notes</label>
                  <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white/80">
                    {selectedContent.revisionNotes}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Client Approval Actions */}
          {selectedContent && contentUrl && formData.approvalStatus === 'pending' && (
            <div className="rounded-lg border border-blue-500/50 bg-blue-500/10 p-4">
              <h4 className="font-semibold mb-3">Client Approval Required</h4>
              <p className="text-sm text-white/70 mb-4">
                This content is ready for client review. The client can view the content and provide approval or feedback.
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    // In a real app, this would send a notification to the client
                    alert("Client notification sent!");
                  }}
                  className="rounded-lg bg-blue-500 text-white px-3 py-2 text-sm hover:bg-blue-600"
                >
                  Notify Client
                </button>
                <button
                  type="button"
                  onClick={() => window.open(`/client/approve/${selectedContent.id}`, '_blank')}
                  className="rounded-lg border border-white/20 px-3 py-2 text-sm hover:bg-white/5"
                >
                  Preview Client View
                </button>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4 border-t border-white/10">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-lg bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-white/90 disabled:opacity-50"
            >
              {saving ? "Saving..." : selectedContent ? "Update Content" : "Add Content"}
            </button>
            
            {selectedContent && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-lg bg-red-500 text-white px-4 py-2 text-sm font-semibold hover:bg-red-600 disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            )}
            
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/5"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Approvals Tab
function ApprovalsTab({ clientEmail }: { clientEmail: string }) {
  const [approvals, setApprovals] = useState([
    { id: "1", contentTitle: "Instagram Post - Product Launch", platform: "Instagram", status: "pending", submittedAt: "2024-01-15" },
    { id: "2", contentTitle: "TikTok Video - Behind the Scenes", platform: "TikTok", status: "approved", submittedAt: "2024-01-14" },
    { id: "3", contentTitle: "LinkedIn Article - Industry Insights", platform: "LinkedIn", status: "revision-requested", submittedAt: "2024-01-13" },
  ]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Content Approvals</h2>
      
      <div className="space-y-3">
        {approvals.map((approval) => (
          <div key={approval.id} className="rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="font-medium">{approval.contentTitle}</div>
                <div className="text-sm text-white/60">{approval.platform} • Submitted {approval.submittedAt}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded text-xs ${
                  approval.status === "pending" ? "bg-orange-500/20 text-orange-400" :
                  approval.status === "approved" ? "bg-emerald-500/20 text-emerald-400" :
                  "bg-red-500/20 text-red-400"
                }`}>
                  {approval.status.replace("-", " ")}
                </span>
                {approval.status === "pending" && (
                  <div className="flex gap-1">
                    <button className="px-3 py-1 bg-emerald-500 text-white rounded text-xs hover:bg-emerald-600">
                      Approve
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600">
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
            {approval.status === "revision-requested" && (
              <div className="mt-2 p-2 bg-orange-500/10 rounded text-sm">
                <strong>Revision Notes:</strong> Please adjust the color scheme to match brand guidelines.
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Ideas Tab
function IdeasTab({ clientEmail }: { clientEmail: string }) {
  const [ideas, setIdeas] = useState([
    { id: "1", title: "Hook for Instagram", platform: "Instagram", category: "hook", description: "Did you know that 90% of fitness businesses fail because of this one mistake? Here's the secret that changed everything for my gym clients...", used: false },
    { id: "2", title: "Script for TikTok", platform: "TikTok", category: "script", description: "Setup: Create intrigue about a restaurant secret or trend (first 3 seconds)\n\nBuild: Show the common restaurant mistake everyone makes\n\nRevelation: Reveal the correct restaurant approach that actually works\n\nTransformation: Show the dramatic difference this makes\n\nCTA: Encourage viewers to try this restaurant strategy and share results", used: true },
    { id: "3", title: "Caption for LinkedIn", platform: "LinkedIn", category: "caption", description: "The real estate industry is evolving rapidly, and here's what I'm seeing:\n\n[Share your real estate industry insight]\n\nAfter working with dozens of real estate professionals, I've noticed:\n• Market shifts are happening faster than ever\n• Digital marketing is now essential for success\n• Personal branding separates top agents from the rest\n\nFor real estate businesses looking to scale, my advice is: Focus on building genuine relationships, not just transactions.\n\nWhat trends are you seeing in real estate? I'd love to hear your perspective! 👇", used: false },
  ]);
  const [generating, setGenerating] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("Instagram");
  const [selectedCategory, setSelectedCategory] = useState("hook");
  const [niche, setNiche] = useState("");

  const platforms = ["Instagram", "TikTok", "LinkedIn", "Facebook"];
  const categories = [
    { id: "hook", name: "Hook" },
    { id: "script", name: "Script" },
    { id: "caption", name: "Caption" },
    { id: "outline", name: "Outline" }
  ];

  const generateIdea = async () => {
    setGenerating(true);
    try {
      const response = await fetch("/api/ideas/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform: selectedPlatform,
          category: selectedCategory,
          clientEmail: clientEmail,
          niche: niche.trim()
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setIdeas(prev => [data.idea, ...prev]);
        setShowGenerator(false);
      } else {
        console.error("Failed to generate idea");
        alert("Failed to generate idea. Please try again.");
      }
    } catch (error) {
      console.error("Error generating idea:", error);
      alert("Error generating idea. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  const markAsUsed = async (ideaId: string) => {
    setIdeas(prev => prev.map(idea => 
      idea.id === ideaId ? { ...idea, used: true } : idea
    ));
    
    // Auto-generate a new idea when one is used
    if (niche.trim()) {
      await generateIdea();
    }
  };

  const dislikeIdea = (ideaId: string) => {
    setIdeas(prev => prev.filter(idea => idea.id !== ideaId));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Content Ideas Generator</h2>
        <button 
          onClick={() => setShowGenerator(!showGenerator)}
          className="flex items-center gap-2 rounded-lg bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-white/90"
        >
          <Sparkles className="h-4 w-4" />
          Generate New Ideas
        </button>
      </div>

      {showGenerator && (
        <div className="rounded-lg border border-white/10 bg-white/5 p-6">
          <h3 className="font-semibold mb-4">Generate AI Content Ideas</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-white/80 mb-2">
              Client Niche/Industry <span className="text-white/50">(e.g., fitness, real estate, restaurants, tech startup)</span>
            </label>
            <input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="Enter client's business niche or industry..."
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-white/50 focus:border-white/30 focus:outline-none"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Platform</label>
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white"
              >
                {platforms.map(platform => (
                  <option key={platform} value={platform}>{platform}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Content Type</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={generateIdea}
              disabled={generating}
              className="rounded-lg bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-white/90 disabled:opacity-50"
            >
              {generating ? "Generating..." : "Generate Idea"}
            </button>
            <button
              onClick={() => setShowGenerator(false)}
              className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/5"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
      <div className="space-y-3">
        {ideas.map((idea) => (
          <div key={idea.id} className="rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="font-medium">{idea.title}</div>
                <div className="text-sm text-white/60">{idea.platform} • {idea.category}</div>
              </div>
              <div className="flex items-center gap-2">
                {idea.used ? (
                  <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-xs">Used</span>
                ) : (
                  <>
                    <button 
                      onClick={() => markAsUsed(idea.id)}
                      className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                    >
                      Use Idea
                    </button>
                    <button 
                      onClick={() => dislikeIdea(idea.id)}
                      className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs hover:bg-red-500/30"
                      title="Remove this idea"
                    >
                      ✕
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="text-sm text-white/80 whitespace-pre-line">{idea.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Reports Tab
function ReportsTab({ clientEmail }: { clientEmail: string }) {
  const [reports, setReports] = useState([
    { id: "1", period: "December 2023", metrics: { totalPosts: 15, engagementRate: 4.2, totalReach: 28500, totalEngagement: 2100 }, generatedAt: "2024-01-01", recommendations: ["Increase video content by 30%", "Post more consistently on weekdays", "Engage more with comments and DMs"] },
    { id: "2", period: "November 2023", metrics: { totalPosts: 12, engagementRate: 3.8, totalReach: 22000, totalEngagement: 1800 }, generatedAt: "2023-12-01", recommendations: ["Focus on educational content", "Optimize posting times", "Use more trending hashtags"] },
  ]);
  const [generating, setGenerating] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const generateNewReport = async () => {
    setGenerating(true);
    try {
      const response = await fetch("/api/reports/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientEmail: clientEmail,
          reportType: "monthly"
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setReports(prev => [data.report, ...prev]);
        setSelectedReport(data.report);
      } else {
        console.error("Failed to generate report");
        alert("Failed to generate report. Please try again.");
      }
    } catch (error) {
      console.error("Error generating report:", error);
      alert("Error generating report. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Monthly Reports</h2>
        <button 
          onClick={generateNewReport}
          disabled={generating}
          className="flex items-center gap-2 rounded-lg bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-white/90 disabled:opacity-50"
        >
          <LineChart className="h-4 w-4" />
          {generating ? "Generating..." : "Generate Report"}
        </button>
      </div>

      {selectedReport && (
        <div className="rounded-lg border border-blue-500/50 bg-blue-500/10 p-6">
          <h3 className="text-lg font-semibold mb-4">Latest Report - {selectedReport.period}</h3>
          
          <div className="grid gap-4 md:grid-cols-4 mb-6">
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <div className="text-white/60 text-sm">Total Posts</div>
              <div className="text-2xl font-bold">{selectedReport.metrics.totalPosts}</div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <div className="text-white/60 text-sm">Total Reach</div>
              <div className="text-2xl font-bold">{selectedReport.metrics.totalReach?.toLocaleString()}</div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <div className="text-white/60 text-sm">Engagement</div>
              <div className="text-2xl font-bold">{selectedReport.metrics.totalEngagement?.toLocaleString()}</div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <div className="text-white/60 text-sm">Engagement Rate</div>
              <div className="text-2xl font-bold">{selectedReport.metrics.engagementRate}%</div>
            </div>
          </div>

          {selectedReport.platformBreakdown && (
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Platform Performance</h4>
              <div className="grid gap-3 md:grid-cols-2">
                {selectedReport.platformBreakdown.map((platform, index) => (
                  <div key={index} className="rounded-lg border border-white/10 bg-white/5 p-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{platform.platform}</span>
                      <span className="text-sm text-white/60">{platform.posts} posts</span>
                    </div>
                    <div className="text-sm text-white/80 mt-1">
                      {platform.engagement.toLocaleString()} engagements • {platform.reach.toLocaleString()} reach
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedReport.topPerformingPosts && (
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Top Performing Content</h4>
              <div className="space-y-2">
                {selectedReport.topPerformingPosts.slice(0, 3).map((post, index) => (
                  <div key={index} className="rounded-lg border border-white/10 bg-white/5 p-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{post.title}</span>
                      <span className="text-sm text-white/60">{post.platform} • {post.type}</span>
                    </div>
                    <div className="text-sm text-white/80 mt-1">
                      {post.engagement} engagements • {post.reach.toLocaleString()} reach
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h4 className="font-semibold mb-3">AI Recommendations</h4>
            <ul className="text-sm text-white/80 space-y-1">
              {selectedReport.recommendations?.slice(0, 5).map((rec, index) => (
                <li key={index}>• {rec}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-sm text-white/70">{selectedReport.summary}</p>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Previous Reports</h3>
        {reports.map((report) => (
          <div key={report.id} className="rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold">{report.period}</h4>
              <span className="text-sm text-white/60">Generated {report.generatedAt}</span>
            </div>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <div className="text-white/60 text-sm">Total Posts</div>
                <div className="text-xl font-bold">{report.metrics.totalPosts}</div>
              </div>
              <div>
                <div className="text-white/60 text-sm">Engagement Rate</div>
                <div className="text-xl font-bold">{report.metrics.engagementRate}%</div>
              </div>
              <div>
                <div className="text-white/60 text-sm">Total Reach</div>
                <div className="text-xl font-bold">{report.metrics.totalReach?.toLocaleString()}</div>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="text-white/60 text-sm mb-2">Key Recommendations</div>
              <ul className="text-sm text-white/80 space-y-1">
                {report.recommendations?.slice(0, 3).map((rec, index) => (
                  <li key={index}>• {rec}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Workflow Tab
function WorkflowTab({ clientEmail }: { clientEmail: string }) {
  const [workflowItems, setWorkflowItems] = useState([
    { id: "1", contentTitle: "Instagram Post", currentStage: "editing", assignedTo: "John Doe", startedAt: "2024-01-15" },
    { id: "2", contentTitle: "TikTok Video", currentStage: "review", assignedTo: "Jane Smith", startedAt: "2024-01-14" },
    { id: "3", contentTitle: "LinkedIn Article", currentStage: "approved", assignedTo: "Mike Johnson", startedAt: "2024-01-13" },
  ]);

  const stages = ["briefing", "editing", "review", "approved", "scheduled"];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Workflow Stages</h2>
      
      <div className="space-y-4">
        {workflowItems.map((item) => (
          <div key={item.id} className="rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="font-medium">{item.contentTitle}</div>
                <div className="text-sm text-white/60">Assigned to {item.assignedTo} • Started {item.startedAt}</div>
              </div>
              <span className={`px-2 py-1 rounded text-xs ${
                item.currentStage === "briefing" ? "bg-gray-500/20 text-gray-400" :
                item.currentStage === "editing" ? "bg-blue-500/20 text-blue-400" :
                item.currentStage === "review" ? "bg-orange-500/20 text-orange-400" :
                item.currentStage === "approved" ? "bg-emerald-500/20 text-emerald-400" :
                "bg-purple-500/20 text-purple-400"
              }`}>
                {item.currentStage}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              {stages.map((stage, index) => (
                <div key={stage} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                    stages.indexOf(item.currentStage) >= index
                      ? "bg-white text-black"
                      : "bg-white/20 text-white/60"
                  }`}>
                    {index + 1}
                  </div>
                  {index < stages.length - 1 && (
                    <div className={`w-8 h-0.5 ${
                      stages.indexOf(item.currentStage) > index
                        ? "bg-white"
                        : "bg-white/20"
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Announcements Tab
function AnnouncementsTab({ clientEmail }: { clientEmail: string }) {
  const [announcements, setAnnouncements] = useState([
    { id: "1", title: "New Content Strategy", message: "We're implementing a new content strategy based on your feedback...", priority: "high", sentAt: "2024-01-15", readAt: "2024-01-15" },
    { id: "2", title: "Monthly Report Ready", message: "Your December monthly report is ready for review...", priority: "medium", sentAt: "2024-01-10", readAt: null },
    { id: "3", title: "Holiday Schedule", message: "Please note our holiday schedule for the upcoming week...", priority: "low", sentAt: "2024-01-05", readAt: "2024-01-06" },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Announcements</h2>
        <button className="flex items-center gap-2 rounded-lg bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-white/90">
          <MessagesSquare className="h-4 w-4" />
          Send Announcement
        </button>
      </div>
      
      <div className="space-y-3">
        {announcements.map((announcement) => (
          <div key={announcement.id} className={`rounded-lg border p-4 ${
            announcement.readAt ? "border-white/10 bg-white/5" : "border-blue-500/50 bg-blue-500/10"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{announcement.title}</h3>
                <span className={`px-2 py-1 rounded text-xs ${
                  announcement.priority === "high" ? "bg-red-500/20 text-red-400" :
                  announcement.priority === "medium" ? "bg-orange-500/20 text-orange-400" :
                  "bg-gray-500/20 text-gray-400"
                }`}>
                  {announcement.priority}
                </span>
              </div>
              <div className="text-sm text-white/60">
                {announcement.readAt ? `Read ${announcement.readAt}` : "Unread"}
              </div>
            </div>
            <p className="text-white/80 text-sm mb-2">{announcement.message}</p>
            <div className="text-xs text-white/60">Sent {announcement.sentAt}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
