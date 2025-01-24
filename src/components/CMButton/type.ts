import { ButtonProps } from "antd";

export interface ICMButton extends ButtonProps {
  children: React.ReactNode;
  halfRadius?: boolean;
}
