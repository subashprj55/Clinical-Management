import {
  EyeInvisibleOutlined,
  FieldTimeOutlined,
  HomeOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Card, DatePicker, Flex, Select, Typography } from "antd";
import { FaDove, FaStethoscope } from "react-icons/fa6";
import { FaRegFileExcel } from "react-icons/fa6";
import { GoFilter } from "react-icons/go";
import { FiUser } from "react-icons/fi";
import { FiAlertCircle } from "react-icons/fi";
import { FaBed } from "react-icons/fa6";
import { FaRegCalendarXmark } from "react-icons/fa6";
import { FaGaugeSimpleHigh } from "react-icons/fa6";

function App() {
  const { Title, Text } = Typography;
  return (
    <div className="mt-3 mx-4 md:mx-5">
      <Breadcrumb
        separator=">"
        items={[
          {
            href: "/",
            title: <HomeOutlined />,
          },

          {
            title: "New Patients",
          },
        ]}
      />
      {/* TODO: Heading section */}
      <div className="flex mt-3 justify-between flex-wrap gap-3">
        <div className="flex items-center flex-wrap gap-2">
          <FaStethoscope className="w-6 h-6" />
          <Title level={3} style={{ margin: 0 }}>
            OPD Department
          </Title>
          <div className="bg-white h-auto py-1 px-4 rounded-md flex  items-center gap-1">
            <GoFilter />
            <Text>Filter</Text>
          </div>
          <div className="bg-white h-auto py-1  px-4 rounded-md flex  items-center">
            <Text>
              <ReloadOutlined />
            </Text>
          </div>
        </div>

        <div className="flex items-center gap-2 ">
          <div className="bg-white px-4 h-auto py-1 rounded-md flex gap-1 items-center">
            <EyeInvisibleOutlined />
            <Text>Hide Filters</Text>
          </div>
          <div className="bg-white px-4 h-auto py-1 rounded-md flex gap-1 items-center">
            <FaRegFileExcel />
            <Text>Download Excel </Text>
          </div>
        </div>
      </div>
      {/* TODO: Filter section */}
      <div className="mt-3">
        <Text>Filters:</Text>
      </div>
      <div className="flex gap-4 flex-wrap">
        <div>
          <Title level={5} style={{ margin: 0 }}>
            Period
          </Title>
          <div className="flex gap-4">
            <DatePicker className="w-44" placeholder="From Date" />
            <DatePicker className="w-44" placeholder="To Date" />
          </div>
        </div>
        <div>
          <Title level={5} style={{ margin: 0 }}>
            Filter Via Doctors
          </Title>
          <div>
            <Select
              showSearch
              placeholder="Select Doctor Name"
              optionFilterProp="label"
              className="w-72"
              options={[
                {
                  value: "jack",
                  label: "Jack",
                },
                {
                  value: "lucy",
                  label: "Lucy",
                },
                {
                  value: "tom",
                  label: "Tom",
                },
              ]}
            />
          </div>
        </div>
      </div>
      {/* //TODO:Info section */}
      <div className="mt-10 flex gap-4 flex-wrap ">
        <Card
          bordered={false}
          className="min-w-56 flex-auto max-w-[280px]"
          size={"small"}
        >
          <Text>New Patients</Text>
          <div className="flex items-center mt-3 gap-2">
            <FiUser />
            <Text strong>20</Text>
          </div>
        </Card>
        <Card
          bordered={false}
          className="min-w-56 flex-auto max-w-[280px]"
          size={"small"}
        >
          <div className="flex justify-between items-center">
            <Text>Average Wait Time</Text>
            <FiAlertCircle />
          </div>
          <div className="flex items-center mt-3 gap-2">
            <FieldTimeOutlined />
            <Text strong>20 min</Text>
          </div>
        </Card>
        <Card
          bordered={false}
          className="min-w-56 flex-auto max-w-[280px]"
          size={"small"}
        >
          <div className="flex justify-between items-center">
            <Text>Patients in Queue</Text>
            <Text>Queue No.</Text>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div className="flex gap-2 items-center">
              <FaBed />
              <Text strong>20</Text>
            </div>
            <div>
              <Text strong>11 - 20</Text>
            </div>
          </div>
        </Card>
        <Card
          bordered={false}
          className="min-w-56 flex-auto max-w-[280px]"
          size={"small"}
        >
          <div>
            <Text>Cancellations</Text>
          </div>
          <div className="flex gap-2 mt-3 items-center">
            <FaRegCalendarXmark />
            <Text strong>2</Text>
          </div>
        </Card>
        <Card
          bordered={false}
          className="min-w-56 flex-auto max-w-[280px]"
          size={"small"}
        >
          <div className="flex justify-between items-center">
            <Text>Urgent Cases</Text>
            <Text>Queue No.</Text>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div className="flex gap-2 items-center">
              <FaGaugeSimpleHigh />
              <Text strong>10</Text>
            </div>
            <div>
              <Text strong>4,712</Text>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default App;
