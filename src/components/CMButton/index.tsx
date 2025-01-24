import { Button } from "antd";
import { ICMButton } from "./type";

const CMButton = ({ halfRadius = false, children, ...props }: ICMButton) => {
  return (
    <Button
      style={{ borderRadius: halfRadius ? "6px 6px 0 0" : "" }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CMButton;
