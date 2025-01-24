import { ReactNode } from "react";

export interface ICMCards {
  firstTitle: string;
  secondTitle?: string | ReactNode;
  firstIcon: ReactNode;
  firstValue: string | number;
  secondValue?: string | number;
}
