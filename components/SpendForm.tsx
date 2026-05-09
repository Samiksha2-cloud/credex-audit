"use client";

import { useState, useEffect } from "react";
import { TOOLS, USE_CASES } from "@/lib/tools-data";
import { AuditFormData, ToolEntry } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const blankTool = (): ToolEntry => ({
  id: crypto.randomUUID(),
  tool: "",
  plan: "",
  seats: 1,
  monthlySpend: 0,
});

const defaultForm = (): AuditFormData => ({
  tools: [blankTool()],
  teamSize: 1,
  useCase: "",
});

export default function SpendForm() {
  // mounted = false matlab abhi server pe hain
  // mounted = true matlab browser mein aa gaye
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState<AuditFormData>(defaultForm);

  // Sirf browser mein chalo — localStorage yahan load karo
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("audit-form");
    if (saved) setFormData(JSON.parse(saved));
  }, []);

  // Jab bhi formData badle, save karo
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("audit-form", JSON.stringify(formData));
    }
  }, [formData, mounted]);

  const updateTool = (
    index: number,
    field: keyof ToolEntry,
    value: string | number
  ) => {
    const updated = [...formData.tools];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, tools: updated });
  };

  const addTool = () => {
    setFormData({ ...formData, tools: [...formData.tools, blankTool()] });
  };

  const removeTool = (index: number) => {
    const updated = formData.tools.filter((_, i) => i !== index);
    setFormData({ ...formData, tools: updated });
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    alert("Audit engine coming soon!");
  };

  // Jab tak mounted nahi, kuch mat dikhao
  if (!mounted) return null;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Spend Auditor</h1>
        <p className="text-gray-500 mt-1">
          Find out where you're overspending on AI tools — free instant audit.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Team</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label>Team Size</Label>
            <Input
              type="number"
              min={1}
              value={formData.teamSize}
              onChange={(e) =>
                setFormData({ ...formData, teamSize: Number(e.target.value) })
              }
            />
          </div>
          <div className="space-y-1">
            <Label>Primary Use Case</Label>
            <Select
              value={formData.useCase}
              onValueChange={(val) =>
                setFormData({ ...formData, useCase: val })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select use case" />
              </SelectTrigger>
              <SelectContent>
                {USE_CASES.map((uc) => (
                  <SelectItem key={uc.id} value={uc.id}>
                    {uc.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {formData.tools.map((entry, index) => (
        <Card key={entry.id}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center text-base">
              <span>Tool {index + 1}</span>
              {formData.tools.length > 1 && (
                <button
                  onClick={() => removeTool(index)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Remove
                </button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>AI Tool</Label>
              <Select
                value={entry.tool}
                onValueChange={(val) => updateTool(index, "tool", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select tool" />
                </SelectTrigger>
                <SelectContent>
                  {TOOLS.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label>Plan</Label>
              <Select
                value={entry.plan}
                onValueChange={(val) => updateTool(index, "plan", val)}
                disabled={!entry.tool}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select plan" />
                </SelectTrigger>
                <SelectContent>
                  {TOOLS.find((t) => t.id === entry.tool)?.plans.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label>Number of Seats</Label>
              <Input
                type="number"
                min={1}
                value={entry.seats}
                onChange={(e) =>
                  updateTool(index, "seats", Number(e.target.value))
                }
              />
            </div>

            <div className="space-y-1">
              <Label>Monthly Spend ($)</Label>
              <Input
                type="number"
                min={0}
                value={entry.monthlySpend}
                onChange={(e) =>
                  updateTool(index, "monthlySpend", Number(e.target.value))
                }
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <Button variant="outline" onClick={addTool} className="w-full">
        + Add Another Tool
      </Button>

      <Button onClick={handleSubmit} className="w-full" size="lg">
        Get My Free Audit →
      </Button>
    </div>
  );
}