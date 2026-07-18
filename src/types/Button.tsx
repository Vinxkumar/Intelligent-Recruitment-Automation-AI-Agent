import type { ReactNode } from "react";

export interface ButtonInterface {
    children: ReactNode; 
    w?: string,
    h?: string,
    color?: string
    bg?: string
    className?: string
}