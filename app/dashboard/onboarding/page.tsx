"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, Copy, Trash2, Clock, CheckCircle, XCircle, AlertCircle, Bell } from "lucide-react";

interface OnboardingLink {
  id: string;
  token: string;
  clientName: string;
  clientEmail: string;
  company?: string;
  phone?: string;
  industry?: string;
  notes?: string;
  status: "pending" | "opened" | "completed" | "cancelled";
  createdAt: string;
  openedAt?: string;
  completedAt?: string;
  submissionData?: any;
  needsApproval?: boolean;
}

export default function OnboardingManagementPage() {
  const [onboardingLinks, setOnboardingLinks] = useState<OnboardingLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    fetchOnboardingLinks();
    fetchNotifications();
  }, []);

  const fetchOnboardingLinks = async () => {
    try {
      const response = await fetch("/api/onboarding");
      if (response.ok) {
        const data = await response.json();
        setOnboardingLinks(data.links);
      }
    } catch (error) {
      console.error("Error fetching onboarding links:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await fetch("/api/notifications");
      if (response.ok) {
        const data = await response.json();
        setNotifications(data.notifications);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const copyLink = (token: string) => {
    const url = `${window.location.origin}/onboard/${token}`;
    navigator.clipboard.writeText(url);
    alert("Onboarding link copied to clipboard!");
  };

  const cancelLink = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this onboarding link?")) return;

    try {
      const response = await fetch(`/api/onboarding/manage/${id}`, {
        method: "DELETE"
      });

      if (response.ok) {
        setOnboardingLinks(prev => prev.map(link => 
          link.id === id ? { ...link, status: "cancelled" } : link
        ));
      }
    } catch (error) {
      console.error("Error cancelling link:", error);
    }
  };

  const approveClient = async (linkId: string, approve: boolean) => {
    try {
      const response = await fetch(`/api/onboarding/manage/${linkId}/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approve })
      });

      if (response.ok) {
        fetchOnboardingLinks();
        fetchNotifications();
        alert(approve ? "Client approved and added to workspace!" : "Client submission rejected.");
      }
    } catch (error) {
      console.error("Error approving client:", error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4 text-orange-400" />;
      case "opened": return <Eye className="h-4 w-4 text-blue-400" />;
      case "completed": return <CheckCircle className="h-4 w-4 text-emerald-400" />;
      case "cancelled": return <XCircle className="h-4 w-4 text-red-400" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-orange-500/20 text-orange-400";
      case "opened": return "bg-blue-500/20 text-blue-400";
      case "completed": return "bg-emerald-500/20 text-emerald-400";
      case "cancelled": return "bg-red-500/20 text-red-400";
      default: return "bg-gray-500/20 text-gray-400";
    }
  };

  const pendingApprovals = notifications.filter(n => n.type === "client_approval");

  if (loading) {
    return <div className="mx-auto max-w-7xl px-6 py-10">Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* Header with Notifications */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Onboarding Management</h1>
          <p className="text-white/70 mt-1">Manage client onboarding links and track their progress</p>
        </div>
        
        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
          >
            <Bell className="h-5 w-5" />
            {pendingApprovals.length > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {pendingApprovals.length}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-gray-900 border border-white/10 rounded-lg shadow-lg z-50">
              <div className="p-4 border-b border-white/10">
                <h3 className="font-semibold">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {pendingApprovals.length === 0 ? (
                  <div className="p-4 text-center text-white/60">
                    No pending approvals
                  </div>
                ) : (
                  pendingApprovals.map((notification) => (
                    <div key={notification.id} className="p-4 border-b border-white/10 last:border-b-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                          <p className="text-xs text-white/70 mt-1">{notification.message}</p>
                          <div className="flex gap-2 mt-3">
                            <button
                              onClick={() => approveClient(notification.linkId, true)}
                              className="px-3 py-1 bg-emerald-500 text-white rounded text-xs hover:bg-emerald-600"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => approveClient(notification.linkId, false)}
                              className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                            >
                              Reject
        </button>
      </div>
                </div>
                </div>
              </div>
                  ))
                )}
              </div>
                </div>
              )}
            </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <div className="rounded-xl border border-white/10 bg-white/5 p-5">
          <div className="text-white/60 text-sm">Total Links</div>
          <div className="mt-1 text-2xl font-bold">{onboardingLinks.length}</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-5">
          <div className="text-white/60 text-sm">Pending</div>
          <div className="mt-1 text-2xl font-bold text-orange-400">
            {onboardingLinks.filter(l => l.status === "pending").length}
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-5">
          <div className="text-white/60 text-sm">Completed</div>
          <div className="mt-1 text-2xl font-bold text-emerald-400">
            {onboardingLinks.filter(l => l.status === "completed").length}
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-5">
          <div className="text-white/60 text-sm">Awaiting Approval</div>
          <div className="mt-1 text-2xl font-bold text-blue-400">
            {onboardingLinks.filter(l => l.needsApproval).length}
          </div>
        </div>
      </div>

      {/* Onboarding Links Table */}
      <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10">
          <h2 className="text-lg font-semibold">Onboarding Links</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-white/10">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-white/60">Client</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-white/60">Status</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-white/60">Created</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-white/60">Last Activity</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-white/60">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {onboardingLinks.map((link) => (
                <tr key={link.id} className="hover:bg-white/5">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium">{link.clientName}</div>
                      <div className="text-sm text-white/60">{link.clientEmail}</div>
                      {link.company && (
                        <div className="text-xs text-white/50">{link.company}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(link.status)}
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(link.status)}`}>
                        {link.status.charAt(0).toUpperCase() + link.status.slice(1)}
                      </span>
                      {link.needsApproval && (
                        <span className="px-2 py-1 rounded text-xs bg-yellow-500/20 text-yellow-400">
                          Needs Approval
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-white/70">
                    {new Date(link.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-white/70">
                    {link.completedAt ? new Date(link.completedAt).toLocaleDateString() :
                     link.openedAt ? new Date(link.openedAt).toLocaleDateString() : 
                     "Never"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyLink(link.token)}
                        className="p-1 hover:bg-white/10 rounded"
                        title="Copy Link"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      <Link
                        href={`/onboard/${link.token}`}
                        target="_blank"
                        className="p-1 hover:bg-white/10 rounded"
                        title="Preview"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      {link.status !== "cancelled" && (
                        <button
                          onClick={() => cancelLink(link.id)}
                          className="p-1 hover:bg-white/10 rounded text-red-400"
                          title="Cancel Link"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {onboardingLinks.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 mx-auto text-white/40 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Onboarding Links</h3>
            <p className="text-white/70 mb-4">Create your first onboarding link to get started.</p>
            <Link
              href="/dashboard"
              className="rounded-lg bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-white/90"
            >
              Add New Client
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}