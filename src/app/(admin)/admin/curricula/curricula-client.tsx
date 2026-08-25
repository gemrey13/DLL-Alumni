"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { createCurriculum, deleteCurriculum } from "./actions";
import type { Curriculum } from "@/types/database";

interface Props {
  curricula: Curriculum[];
}

export function CurriculaClient({ curricula }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setError(null);
    const result = await createCurriculum(formData);
    if (!result.success) {
      setError(typeof result.error === "string" ? result.error : "Validation failed");
    } else {
      setShowForm(false);
    }
    setIsSubmitting(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this curriculum?")) return;
    await deleteCurriculum(id);
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-brand-primary hover:bg-brand-primary/90 gap-2"
        >
          <Plus className="h-4 w-4" /> Add Curriculum
        </Button>
      </div>

      {showForm && (
        <form action={handleSubmit} className="rounded-lg border border-stroke bg-white p-4 space-y-4">
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <Label htmlFor="cmo_no">CMO No.</Label>
              <Input id="cmo_no" name="cmo_no" required placeholder="e.g. CMO-01" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="description">Description</Label>
              <Input id="description" name="description" required placeholder="Curriculum description" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="start_year">Start Year</Label>
              <Input id="start_year" name="start_year" type="number" required defaultValue={2020} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="end_year">End Year</Label>
              <Input id="end_year" name="end_year" type="number" required defaultValue={2025} />
            </div>
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={isSubmitting} className="bg-brand-primary hover:bg-brand-primary/90">
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </div>
        </form>
      )}

      <div className="rounded-lg border border-stroke bg-white overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-stroke bg-whiten">
            <tr>
              <th className="px-4 py-3 font-medium text-[#1C2434]">CMO No.</th>
              <th className="px-4 py-3 font-medium text-[#1C2434]">Description</th>
              <th className="px-4 py-3 font-medium text-[#1C2434]">Year Range</th>
              <th className="px-4 py-3 font-medium text-[#1C2434]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {curricula.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-body">
                  No curricula yet. Add one above.
                </td>
              </tr>
            ) : (
              curricula.map((c) => (
                <tr key={c.id} className="border-b border-stroke last:border-0">
                  <td className="px-4 py-3 font-medium">{c.cmo_no}</td>
                  <td className="px-4 py-3 text-body">{c.description}</td>
                  <td className="px-4 py-3 text-body">{c.start_year} - {c.end_year}</td>
                  <td className="px-4 py-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDelete(c.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
