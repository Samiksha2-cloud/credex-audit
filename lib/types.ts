import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// Yeh define karta hai ek "tool entry" kaisi dikhti hai
export type ToolEntry = {
  id: string;          // unique id har tool ke liye
  tool: string;        // tool ka naam e.g. "cursor"
  plan: string;        // plan ka naam e.g. "pro"
  seats: number;       // kitne users/seats
  monthlySpend: number; // user kitna pay kar raha hai monthly
};

// Yeh poora form ka data hai
export type AuditFormData = {
  tools: ToolEntry[];           // multiple tools ki list
  teamSize: number;             // total team size
  useCase: string;              // coding/writing/data/research/mixed
};