import { Card, Typography } from "antd";
import { ICMCards } from "./types";

const CMCards = ({
  firstTitle,
  secondTitle,
  firstIcon,
  firstValue,
  secondValue,
}: ICMCards) => {
  const { Text } = Typography;
  return (
    <Card
      bordered={false}
      className="min-w-56 w-56 flex-auto md:max-w-[280px]"
      size={"small"}
    >
      <div className="flex justify-between items-center">
        <Text>{firstTitle}</Text>
        <Text>{secondTitle}</Text>
      </div>
      <div className="flex items-center justify-between mt-3">
        <div className="flex gap-2 items-center">
          {firstIcon}
          <Text strong>{firstValue}</Text>
        </div>
        <div>
          <Text strong>{secondValue}</Text>
        </div>
      </div>
    </Card>
  );
};

export default CMCards;
