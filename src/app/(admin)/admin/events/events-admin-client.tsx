"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Calendar } from "lucide-react";
import { createEvent, deleteEvent } from "./actions";
import { formatRelativeTime } from "@/lib/utils";

interface Event {
  id: string;
  title: string;
  location: string;
  organizer: string;
  start_date: string;
  end_date: string;
  created_at: string;
}

export function EventsAdminClient({ events }: { events: Event[] }) {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setError(null);
    const result = await createEvent(formData);
    if (!result.success) {
      setError(typeof result.error === "string" ? result.error : "Failed to create event");
    } else {
      setShowForm(false);
    }
    setIsSubmitting(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this event?")) return;
    await deleteEvent(id);
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setShowForm(!showForm)} className="bg-brand-primary hover:bg-brand-primary/90 gap-2">
          <Plus className="h-4 w-4" /> Create Event
        </Button>
      </div>

      {showForm && (
        <form action={handleSubmit} className="rounded-lg border border-stroke bg-white p-4 space-y-4">
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="title">Title *</Label>
              <Input id="title" name="title" required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="location">Location *</Label>
              <Input id="location" name="location" required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="organizer">Organizer *</Label>
              <Input id="organizer" name="organizer" required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="start_date">Start Date *</Label>
              <Input id="start_date" name="start_date" type="datetime-local" required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="end_date">End Date *</Label>
              <Input id="end_date" name="end_date" type="datetime-local" required />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="description">Description *</Label>
            <Textarea id="description" name="description" rows={4} required />
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={isSubmitting} className="bg-brand-primary hover:bg-brand-primary/90">
              {isSubmitting ? "Creating..." : "Create Event"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {events.length === 0 ? (
          <div className="rounded-lg border border-stroke bg-white p-8 text-center text-body">No events yet.</div>
        ) : (
          events.map((ev) => (
            <div key={ev.id} className="rounded-lg border border-stroke bg-white p-4 flex items-center justify-between">
              <div>
                <h3 className="font-medium text-[#1C2434]">{ev.title}</h3>
                <p className="text-sm text-body">{ev.location} &middot; {ev.organizer}</p>
                <p className="text-xs text-bodydark2 mt-1 flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(ev.start_date).toLocaleDateString()} - {new Date(ev.end_date).toLocaleDateString()}
                </p>
              </div>
              <Button variant="ghost" size="icon" className="text-red-600 hover:bg-red-50" onClick={() => handleDelete(ev.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
