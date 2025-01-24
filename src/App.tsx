import {
  DownOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  FieldTimeOutlined,
  HomeOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  DatePicker,
  DatePickerProps,
  Input,
  Pagination,
  Select,
  Table,
  Tag,
  Typography,
} from "antd";
import { FaStethoscope } from "react-icons/fa6";
import { FaRegFileExcel } from "react-icons/fa6";
import { GoFilter } from "react-icons/go";
import { FiUser } from "react-icons/fi";
import { FiAlertCircle } from "react-icons/fi";
import { FaBed } from "react-icons/fa6";
import { FaRegCalendarXmark } from "react-icons/fa6";
import { FaGaugeSimpleHigh } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { Dayjs } from "dayjs";
import CMButton from "./components/CMButton";
import CMCards from "./components/CMCards";
import { SearchOutlined } from "@ant-design/icons";
import {
  appointment,
  doctorVisited,
  newPatientsData,
  nurseSeen,
} from "./data/homeData";
import { filterData } from "./utils/filterData";

function App() {
  const [tableData, setTableData] = useState(newPatientsData);
  const [filterTableData, setFilterTableData] = useState<any>();

  useEffect(() => {
    setFilterTableData(tableData);
  }, [tableData]);
  return (
    <div className="mt-3 mx-4 md:mx-5">
      <BreadcrumbSection />
      <HeadingSection />
      <CardsSection />
      <ButtonAndSearchSection
        tableData={tableData}
        setTableData={setTableData}
        setFilterTableData={setFilterTableData}
      />
      <TableSection tableData={filterTableData} />
    </div>
  );
}

export default App;

const BreadcrumbSection = () => {
  const direction = [
    {
      href: "/",
      title: <HomeOutlined />,
    },

    {
      title: "New Patients",
    },
  ];
  return <Breadcrumb separator=">" items={direction} />;
};

const HeadingSection = () => {
  const { Title, Text } = Typography;

  const [fromDate, setFromDate] = useState<Dayjs | null>(null);
  const [toDate, setToDate] = useState<Dayjs | null>(null);
  const [doctorName, setDoctorName] = useState<string | null>(null);
  const [hideFilter, setHideFilter] = useState<boolean>(false);

  const onFromDateChange: DatePickerProps["onChange"] = (date) => {
    setFromDate(date);
  };
  const onToDateChange: DatePickerProps["onChange"] = (date) => {
    setToDate(date);
  };

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
    setDoctorName(value);
  };

  const onHideFilterClick = () => {
    setHideFilter(!hideFilter);
  };

  const handleResetButtonClick = () => {
    setToDate(null);
    setFromDate(null);
    setDoctorName(null);
  };

  return (
    <>
      <div className="flex mt-4 justify-between flex-wrap gap-3">
        <div className="flex items-center flex-wrap gap-2">
          <FaStethoscope className="w-6 h-6" />
          <Title level={3} style={{ margin: 0 }}>
            OPD Department
          </Title>
          <CMButton>
            <GoFilter />
            Filter
          </CMButton>
          <CMButton onClick={handleResetButtonClick}>
            <ReloadOutlined />
          </CMButton>
        </div>

        <div className="flex items-center gap-2 ">
          {hideFilter ? (
            <CMButton onClick={onHideFilterClick}>
              <EyeOutlined />
              Show Filters
            </CMButton>
          ) : (
            <CMButton onClick={onHideFilterClick}>
              <EyeInvisibleOutlined />
              Hide Filters
            </CMButton>
          )}

          <CMButton disabled>
            <FaRegFileExcel />
            Download Excel
          </CMButton>
        </div>
      </div>

      {!hideFilter && (
        <>
          <div className="mt-3">
            <Text>Filters:</Text>
          </div>
          <div className="flex gap-4 flex-wrap">
            <div>
              <Text strong>Period</Text>
              <div className="flex gap-4">
                <DatePicker
                  onChange={onFromDateChange}
                  value={fromDate}
                  className="w-44"
                  placeholder="From Date"
                />
                <DatePicker
                  value={toDate}
                  onChange={onToDateChange}
                  className="w-44"
                  placeholder="To Date"
                />
              </div>
            </div>
            <div>
              <Text strong>Filter Via Doctors</Text>
              <div>
                <Select
                  showSearch
                  placeholder="Select Doctor Name"
                  optionFilterProp="label"
                  className="w-72"
                  value={doctorName}
                  onChange={onChange}
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
        </>
      )}
    </>
  );
};

const CardsSection = () => {
  return (
    <div className="mt-4 flex gap-4 flex-wrap ">
      <CMCards
        firstTitle="New Patients"
        firstIcon={<FiUser />}
        firstValue={"20"}
      />
      <CMCards
        firstTitle="Average Wait Time"
        secondTitle={<FiAlertCircle />}
        firstIcon={<FieldTimeOutlined />}
        firstValue={"25 min"}
      />
      <CMCards
        firstTitle="Patients in Queue"
        secondTitle={"Queue No."}
        firstIcon={<FaBed />}
        firstValue={"10 "}
        secondValue={"11 - 20"}
      />
      <CMCards
        firstTitle="Cancellations"
        firstIcon={<FaRegCalendarXmark />}
        firstValue={"2 "}
      />
      <CMCards
        firstTitle="Urgent Cases"
        secondTitle={"Queue No."}
        firstIcon={<FaGaugeSimpleHigh />}
        firstValue={"10 "}
        secondValue={"4,512"}
      />
    </div>
  );
};

const ButtonAndSearchSection = ({
  tableData,
  setTableData,
  setFilterTableData,
}: any) => {
  const { Text } = Typography;
  const [activeButton, setActiveButton] = useState<string>("new-patients");
  const [numberOfShowData, setNumberOfShowData] = useState<number | string>(15);
  const [searchString, setSearchString] = useState<string>("");

  const handleButtonClick = (id: string) => {
    setSearchString("");
    setActiveButton(id);
    if (id === "new-patients") {
      setTableData(newPatientsData);
    }
    if (id === "nurse-seen") {
      setTableData(nurseSeen);
    }
    if (id === "doctor-visited") {
      setTableData(doctorVisited);
    }
    if (id === "appointment") {
      setTableData(appointment);
    }
  };

  const handleInputFieldValue = (e: any) => {
    const value = e.target.value;
    setSearchString(value);
  };

  useEffect(() => {
    const newData = filterData(tableData, searchString);
    setFilterTableData(newData);
  }, [activeButton, searchString]);

  return (
    <>
      <div className="mt-4 flex flex-wrap gap-3">
        <CMButton
          type={activeButton === "new-patients" ? "primary" : "default"}
          onClick={() => handleButtonClick("new-patients")}
          halfRadius
        >
          New Patients(12)
        </CMButton>
        <CMButton
          type={activeButton === "nurse-seen" ? "primary" : "default"}
          onClick={() => handleButtonClick("nurse-seen")}
          halfRadius
        >
          Nurse Seen(4)
        </CMButton>
        <CMButton
          type={activeButton === "doctor-visited" ? "primary" : "default"}
          onClick={() => handleButtonClick("doctor-visited")}
          halfRadius
        >
          Doctor Visited(6)
        </CMButton>
        <CMButton
          type={activeButton === "appointment" ? "primary" : "default"}
          onClick={() => handleButtonClick("appointment")}
          halfRadius
        >
          Appointment(6)
        </CMButton>
      </div>
      <div className="mt-4 flex justify-between">
        <Input
          className="max-w-96"
          value={searchString}
          onChange={handleInputFieldValue}
          addonBefore={<SearchOutlined />}
          placeholder="Search for modules, submodules, settings, etc."
        />
        <div className="flex items-center gap-2">
          <Text>Show</Text>
          <Input
            type="number"
            className="max-w-12 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            value={numberOfShowData}
            onChange={(e) => setNumberOfShowData(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

const TableSection = ({ tableData }: any) => {
  const columns = [
    {
      title: "S.No",
      dataIndex: "serial",
      key: "serial",
      align: "center" as "center",
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "UHID",
      dataIndex: "uhid",
      key: "uhid",
    },
    {
      title: "Patient Name",
      dataIndex: "patientName",
      key: "patientName",
    },
    {
      title: "Age/Gender",
      dataIndex: "ageGender",
      key: "ageGender",
      align: "center" as "center",
    },
    {
      title: "Billing Date & Time",
      dataIndex: "billingDate",
      key: "billingDate",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Doctor Name",
      dataIndex: "doctorName",
      key: "doctorName",
    },
    {
      title: "Queue No.",
      dataIndex: "queueNo",
      key: "queueNo",
      align: "center" as "center",
      render: (text: string) => <span className="center">{text}</span>,
    },
    {
      title: "Previous Rec.",
      dataIndex: "previousRec",
      key: "previousRec",
      align: "center" as "center",
      render: (text: string) => (
        <Button className="w-14" style={{ height: "25px" }}>
          {text} <DownOutlined />
        </Button>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center" as "center",
      render: (status: string) => {
        let color = "";
        if (status === "Follow Up") color = "blue";
        else if (status === "New") color = "orange";
        else color = "green";

        return (
          <Tag
            style={{ textAlign: "center", borderRadius: "15px" }}
            bordered={false}
            color={color}
            className="w-full"
          >
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      align: "center" as "center",
      render: () => (
        <Button
          type="link"
          style={{ color: "black", border: "1px solid #f1f4f8" }}
        >
          <EyeOutlined />
        </Button>
      ),
    },
  ];

  const { Text } = Typography;
  return (
    <>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={false}
        className="shadow-md mt-4 overflow-x-scroll rounded-lg"
      />
      <div className="mt-4 mb-20 flex items-center justify-between">
        <Text>Showing 1- 10 of 1350 entries</Text>
        <Pagination defaultCurrent={1} total={50} />
      </div>
    </>
  );
};
