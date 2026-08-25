"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2 } from "lucide-react";
import { createAnnouncement, deleteAnnouncement } from "./actions";
import { formatRelativeTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface Announcement {
  id: string;
  title: string;
  summary: string;
  status: string;
  created_at: string;
  published_at: string | null;
}

export function AnnouncementsClient({ announcements }: { announcements: Announcement[] }) {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setError(null);
    const result = await createAnnouncement(formData);
    if (!result.success) {
      setError(typeof result.error === "string" ? result.error : "Failed");
    } else {
      setShowForm(false);
    }
    setIsSubmitting(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this announcement?")) return;
    await deleteAnnouncement(id);
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setShowForm(!showForm)} className="bg-brand-primary hover:bg-brand-primary/90 gap-2">
          <Plus className="h-4 w-4" /> Create Announcement
        </Button>
      </div>

      {showForm && (
        <form action={handleSubmit} className="rounded-lg border border-stroke bg-white p-4 space-y-4">
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="space-y-1">
            <Label htmlFor="title">Title *</Label>
            <Input id="title" name="title" required />
          </div>
          <div className="space-y-1">
            <Label htmlFor="summary">Summary *</Label>
            <Input id="summary" name="summary" required placeholder="Brief summary (max 500 chars)" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="content">Content *</Label>
            <Textarea id="content" name="content" rows={6} required />
          </div>
          <div className="space-y-1">
            <Label htmlFor="status">Status</Label>
            <select id="status" name="status" className="w-full h-8 rounded-lg border border-input bg-background px-3 text-sm" defaultValue="draft">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={isSubmitting} className="bg-brand-primary hover:bg-brand-primary/90">
              {isSubmitting ? "Creating..." : "Create"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {announcements.length === 0 ? (
          <div className="rounded-lg border border-stroke bg-white p-8 text-center text-body">No announcements yet.</div>
        ) : (
          announcements.map((ann) => (
            <div key={ann.id} className="rounded-lg border border-stroke bg-white p-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-[#1C2434]">{ann.title}</h3>
                  <Badge className={cn(
                    ann.status === "published" ? "bg-brand-success text-white" : "bg-bodydark/10 text-bodydark2"
                  )}>
                    {ann.status}
                  </Badge>
                </div>
                <p className="text-sm text-body mt-1">{ann.summary}</p>
                <p className="text-xs text-bodydark2 mt-1">{formatRelativeTime(ann.created_at)}</p>
              </div>
              <Button variant="ghost" size="icon" className="text-red-600 hover:bg-red-50" onClick={() => handleDelete(ann.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
