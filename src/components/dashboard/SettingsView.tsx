import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard,
  Upload,
  Crown
} from "lucide-react";

export function SettingsView() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl mb-2" style={{ fontWeight: 700 }}>Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and settings</p>
      </div>

      {/* Profile Settings */}
      <Card>
        <div className="p-6 border-b border-border flex items-center gap-3">
          <User className="w-5 h-5" />
          <h2 style={{ fontWeight: 600 }}>Profile Settings</h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-6">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="bg-gradient-to-br from-blue-600 to-teal-500 text-white text-2xl">
                SC
              </AvatarFallback>
            </Avatar>
            <div>
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Change Photo
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                JPG, PNG or GIF. Max size 2MB.
              </p>
            </div>
          </div>

          <Separator />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input defaultValue="Dr. Sarah Chen" />
            </div>
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input type="email" defaultValue="sarah.chen@university.edu" />
            </div>
            <div className="space-y-2">
              <Label>Institution</Label>
              <Input defaultValue="Stanford University" />
            </div>
            <div className="space-y-2">
              <Label>Department</Label>
              <Input defaultValue="Computer Science" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>ORCID iD</Label>
            <Input defaultValue="0000-0002-1234-5678" />
            <p className="text-xs text-muted-foreground">
              Your unique researcher identifier
            </p>
          </div>

          <div className="flex justify-end">
            <Button className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white">
              Save Changes
            </Button>
          </div>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card>
        <div className="p-6 border-b border-border flex items-center gap-3">
          <Bell className="w-5 h-5" />
          <h2 style={{ fontWeight: 600 }}>Notification Preferences</h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p style={{ fontWeight: 600 }}>Email Notifications</p>
              <p className="text-sm text-muted-foreground">
                Receive email updates about your DOIs
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p style={{ fontWeight: 600 }}>Citation Alerts</p>
              <p className="text-sm text-muted-foreground">
                Get notified when your research is cited
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p style={{ fontWeight: 600 }}>Monthly Reports</p>
              <p className="text-sm text-muted-foreground">
                Receive monthly analytics reports
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p style={{ fontWeight: 600 }}>Marketing Emails</p>
              <p className="text-sm text-muted-foreground">
                Updates about new features and tips
              </p>
            </div>
            <Switch />
          </div>
        </div>
      </Card>

      {/* Security */}
      <Card>
        <div className="p-6 border-b border-border flex items-center gap-3">
          <Shield className="w-5 h-5" />
          <h2 style={{ fontWeight: 600 }}>Security</h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <Label>Current Password</Label>
            <Input type="password" placeholder="Enter current password" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>New Password</Label>
              <Input type="password" placeholder="Enter new password" />
            </div>
            <div className="space-y-2">
              <Label>Confirm Password</Label>
              <Input type="password" placeholder="Confirm new password" />
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="outline">
              Update Password
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p style={{ fontWeight: 600 }}>Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </p>
            </div>
            <Button variant="outline">
              Enable
            </Button>
          </div>
        </div>
      </Card>

      {/* Subscription */}
      <Card>
        <div className="p-6 border-b border-border flex items-center gap-3">
          <CreditCard className="w-5 h-5" />
          <h2 style={{ fontWeight: 600 }}>Subscription & Billing</h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <p className="text-xl" style={{ fontWeight: 600 }}>Premium Plan</p>
                <Badge className="bg-gradient-to-r from-blue-600 to-teal-500 text-white border-0">
                  <Crown className="w-3 h-3 mr-1" />
                  Active
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Unlimited DOI registrations • Advanced analytics • Priority support
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Next billing date: November 20, 2024 • $29/month
              </p>
            </div>
            <Button variant="outline">
              Manage Plan
            </Button>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p style={{ fontWeight: 600 }}>Payment Method</p>
              <Button variant="outline" size="sm">
                Update
              </Button>
            </div>
            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm" style={{ fontWeight: 600 }}>•••• •••• •••• 4242</p>
                <p className="text-xs text-muted-foreground">Expires 12/2025</p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p style={{ fontWeight: 600 }}>Cancel Subscription</p>
              <p className="text-sm text-muted-foreground">
                You'll continue to have access until the end of your billing period
              </p>
            </div>
            <Button variant="outline" className="text-red-600 hover:text-red-700">
              Cancel
            </Button>
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200 dark:border-red-900">
        <div className="p-6 border-b border-red-200 dark:border-red-900">
          <h2 className="text-red-600 dark:text-red-400" style={{ fontWeight: 600 }}>Danger Zone</h2>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p style={{ fontWeight: 600 }}>Delete Account</p>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all associated data
              </p>
            </div>
            <Button variant="outline" className="text-red-600 hover:text-red-700 border-red-200 dark:border-red-900">
              Delete Account
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
