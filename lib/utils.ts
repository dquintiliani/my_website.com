import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'


// In plain terms, ‎`cn` takes any number of “class-like” values (strings, 
// arrays, objects with conditionals, etc.), combines them into a single class string using 
// ‎`clsx`, and 
// then runs that through ‎`tailwind-merge` to remove conflicting or 
// duplicate Tailwind classes.

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
