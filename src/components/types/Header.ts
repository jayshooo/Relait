import { ReactNode } from "react";

export interface HeaderInterface {
    onPress?: () => void;
    title?: string;
    renderRight?: ReactNode;
}
