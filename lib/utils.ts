import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//For stripe it cannot use relative url
export function absoluteUrl(path: string): string {
  return `${process.env.NEXT_PUBLIC_URL}${path}`;
}
