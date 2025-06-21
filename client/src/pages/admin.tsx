import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useNewAuth } from "@/hooks/use-new-auth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Users, DollarSign, TrendingUp, Calendar, Edit, Trash2, Pause, Play, FileText, Activity, UserCheck, UserX } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import PersistentLanguageSelector from "@/components/persistent-language-selector";

interface AdminUser {
  id: number;
  username: string;
  nationality: string;
  isActive: boolean;
  isAdmin: boolean;
  totalPaid: string;
  createdAt: string;
  updatedAt: string;
  dataProcessingConsent: boolean;
}

interface UserStats {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: string;
}

interface MonthlyRevenue {
  month: string;
  revenue: string;
  userCount: number;
}

interface DocumentAnalysisLog {
  id: number;
  userId: number;
  sessionId: string;
  originalFileName: string;
  fileType: string;
  fileSize: number;
  detectedDocumentType: string;
  confidenceScore: number;
  uploadedAt: string;
}

export default function AdminPanel() {
  const { user, logoutMutation } = useNewAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState<Partial<AdminUser> & { password?: string; sendEmail?: boolean }>({});

  // Redirect non-admin users
  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-red-600">Access denied. Admin privileges required.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { data: users = [], isLoading: usersLoading } = useQuery<AdminUser[]>({
    queryKey: ["/api/admin/users"],
  });

  const { data: stats } = useQuery<UserStats>({
    queryKey: ["/api/admin/stats"],
  });

  const { data: revenue = [] } = useQuery<MonthlyRevenue[]>({
    queryKey: ["/api/admin/revenue"],
  });

  const updateUserMutation = useMutation({
    mutationFn: async ({ userId, updates }: { userId: number; updates: Partial<AdminUser> }) => {
      const res = await apiRequest("PUT", `/api/admin/users/${userId}`, updates);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      setEditDialogOpen(false);
      toast({
        title: "User updated",
        description: "User status has been updated successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async ({ userId, newPassword, sendEmail }: { userId: number; newPassword: string; sendEmail: boolean }) => {
      const res = await apiRequest("POST", "/api/admin/reset-password", { userId, newPassword, sendEmail });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({
        title: "Password Reset",
        description: "Password has been reset successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Reset failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const toggleUserStatus = (userId: number, isActive: boolean) => {
    updateUserMutation.mutate({ userId, updates: { isActive } });
  };

  const { data: documents = [], isLoading: documentsLoading } = useQuery<DocumentAnalysisLog[]>({
    queryKey: ["/api/admin/documents"],
  });

  const handleEditUser = (user: AdminUser) => {
    setSelectedUser(user);
    setEditForm({
      username: user.username,
      nationality: user.nationality,
      isActive: user.isActive,
      isAdmin: user.isAdmin,
      totalPaid: user.totalPaid,
    });
    setEditDialogOpen(true);
  };

  const handleSaveUser = () => {
    if (selectedUser) {
      updateUserMutation.mutate({
        userId: selectedUser.id,
        updates: editForm,
      });
    }
  };

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(parseFloat(amount));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (usersLoading || documentsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <PersistentLanguageSelector />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t("adminDashboard")}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t("manageUsersAndMonitor")}
            </p>
          </div>
          <Button onClick={() => logoutMutation.mutate()} variant="outline">
            {t("logout")}
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="reports">Final Reports</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t("totalUsers")}</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.totalUsers || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats?.activeUsers || 0} active users
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${stats?.totalRevenue || "0.00"}</div>
                  <p className="text-xs text-muted-foreground">
                    From all users
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">This Month</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${revenue[0]?.revenue || "0.00"}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {revenue[0]?.userCount || 0} new users
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Users</CardTitle>
                <CardDescription>Latest registered users</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Username</TableHead>
                      <TableHead>Nationality</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joined</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.slice(0, 5).map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.username}</TableCell>
                        <TableCell>{user.nationality}</TableCell>
                        <TableCell>
                          <Badge variant={user.isActive ? "default" : "secondary"}>
                            {user.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(user.createdAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage user accounts and permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {usersLoading ? (
                  <div className="text-center py-8">Loading users...</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Username</TableHead>
                        <TableHead>Nationality</TableHead>
                        <TableHead>Total Paid</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.id}</TableCell>
                          <TableCell className="font-medium">{user.username}</TableCell>
                          <TableCell>{user.nationality}</TableCell>
                          <TableCell>${user.totalPaid}</TableCell>
                          <TableCell>
                            <Badge variant={user.isActive ? "default" : "secondary"}>
                              {user.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(user.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditUser(user)}
                              >
                                <Edit className="h-3 w-3 mr-1" />
                                Edit
                              </Button>
                              
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    🔑 Reset
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Reset Password for {user.username}</DialogTitle>
                                    <DialogDescription>
                                      Enter a new password for this user. You can also send it to info@dldv.nl
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <Label htmlFor="newPassword">New Password</Label>
                                      <Input
                                        id="newPassword"
                                        type="password"
                                        placeholder="Enter new password"
                                        onChange={(e) => setEditForm({...editForm, password: e.target.value})}
                                      />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <input
                                        type="checkbox"
                                        id="sendEmail"
                                        onChange={(e) => setEditForm({...editForm, sendEmail: e.target.checked})}
                                      />
                                      <Label htmlFor="sendEmail">Send password to info@dldv.nl</Label>
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button
                                      onClick={() => {
                                        if (editForm.password) {
                                          resetPasswordMutation.mutate({
                                            userId: user.id,
                                            newPassword: editForm.password,
                                            sendEmail: editForm.sendEmail || false
                                          });
                                        }
                                      }}
                                      disabled={resetPasswordMutation.isPending || !editForm.password}
                                    >
                                      {resetPasswordMutation.isPending ? "Resetting..." : "Reset Password"}
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>

                              <Switch
                                checked={user.isActive}
                                onCheckedChange={(checked) => toggleUserStatus(user.id, checked)}
                                disabled={updateUserMutation.isPending}
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Document Analysis Logs</CardTitle>
                <CardDescription>
                  AI-detected document types from user uploads (files are not stored)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {documentsLoading ? (
                  <div className="text-center py-8">Loading document analysis logs...</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User ID</TableHead>
                        <TableHead>Original Filename</TableHead>
                        <TableHead>AI Detected Type</TableHead>
                        <TableHead>Confidence</TableHead>
                        <TableHead>File Size</TableHead>
                        <TableHead>Upload Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {documents.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell>{doc.userId}</TableCell>
                          <TableCell className="font-medium">{doc.originalFileName}</TableCell>
                          <TableCell>
                            <Badge variant={doc.detectedDocumentType === 'analysis_failed' ? "destructive" : "default"}>
                              {doc.detectedDocumentType === 'analysis_failed' ? 'Failed' : doc.detectedDocumentType}
                            </Badge>
                          </TableCell>
                          <TableCell>{doc.confidenceScore}%</TableCell>
                          <TableCell>{formatFileSize(doc.fileSize)}</TableCell>
                          <TableCell>
                            {new Date(doc.uploadedAt).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                      {documents.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                            No document analysis logs found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Final Reports Tab */}
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Final Validation Reports</CardTitle>
                <CardDescription>
                  Completed validation reports stored permanently (documents auto-deleted after 24 hours)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Final reports storage coming soon - documents are auto-deleted after 24 hours for privacy
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Revenue Tab */}
          <TabsContent value="revenue">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Analytics</CardTitle>
                <CardDescription>
                  Monthly revenue and user acquisition data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>New Users</TableHead>
                      <TableHead>Avg. per User</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {revenue.map((item) => (
                      <TableRow key={item.month}>
                        <TableCell className="font-medium">
                          {new Date(item.month + "-01").toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                          })}
                        </TableCell>
                        <TableCell>${item.revenue}</TableCell>
                        <TableCell>{item.userCount}</TableCell>
                        <TableCell>
                          ${item.userCount > 0
                            ? (parseFloat(item.revenue) / item.userCount).toFixed(2)
                            : "0.00"
                          }
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* User Edit Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User: {selectedUser?.username}</DialogTitle>
              <DialogDescription>
                Update user information and permissions
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="editUsername">Username</Label>
                <Input
                  id="editUsername"
                  value={editForm.username || ""}
                  onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="editNationality">Nationality</Label>
                <Input
                  id="editNationality"
                  value={editForm.nationality || ""}
                  onChange={(e) => setEditForm({...editForm, nationality: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="editTotalPaid">Total Paid ($)</Label>
                <Input
                  id="editTotalPaid"
                  type="number"
                  step="0.01"
                  value={editForm.totalPaid || ""}
                  onChange={(e) => setEditForm({...editForm, totalPaid: e.target.value})}
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="editIsActive"
                  checked={editForm.isActive || false}
                  onChange={(e) => setEditForm({...editForm, isActive: e.target.checked})}
                />
                <Label htmlFor="editIsActive">Account Active</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="editIsAdmin"
                  checked={editForm.isAdmin || false}
                  onChange={(e) => setEditForm({...editForm, isAdmin: e.target.checked})}
                />
                <Label htmlFor="editIsAdmin">Admin Privileges</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSaveUser}
                disabled={updateUserMutation.isPending}
              >
                {updateUserMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}