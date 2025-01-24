import {
  DownOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  HomeOutlined,
  ReloadOutlined,
  SmileOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  DatePicker,
  DatePickerProps,
  Input,
  notification,
  Pagination,
  Select,
  Table,
  Tag,
  Typography,
} from "antd";
import {
  FaStethoscope,
  FaRegFileExcel,
  FaRegCalendarXmark,
  FaBed,
} from "react-icons/fa6";
import { GoFilter } from "react-icons/go";
import { FaUserAlt, FaAmbulance } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";
import { RxLapTimer } from "react-icons/rx";
import { useState } from "react";
import { Dayjs } from "dayjs";
import CMButton from "./components/CMButton";
import CMCards from "./components/CMCards";
import useTableStore from "./store/tableStore";
import {
  appointment,
  doctorsNames,
  doctorVisited,
  newPatientsData,
  numberOfRowsOptions,
  nurseSeen,
} from "./data/homeData";

function App() {
  return (
    <div className="mt-3 mx-4 md:mx-5">
      <BreadcrumbSection />
      <HeadingSection />
      <PatientsInfoSection />
      <ButtonAndSearchSection />
      <TableSection />
    </div>
  );
}

export default App;

//Breadcrumb Section
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

//Heading Section
const HeadingSection = () => {
  const { Title, Text } = Typography;

  const [fromDate, setFromDate] = useState<Dayjs | null>(null);
  const [toDate, setToDate] = useState<Dayjs | null>(null);
  const [doctorName, setDoctorName] = useState<string | null>(null);
  const [hideFilter, setHideFilter] = useState<boolean>(false);
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.open({
      message:
        "This feature is currently unavailable. We’re working on it—please try again later!",
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
      placement: "bottomLeft",
    });
  };

  const onFromDateChange: DatePickerProps["onChange"] = (date) => {
    setFromDate(date);
  };
  const onToDateChange: DatePickerProps["onChange"] = (date) => {
    setToDate(date);
  };

  const onChange = (value: string) => {
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

          {contextHolder}
          <CMButton onClick={openNotification}>
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
              <div className="flex gap-4 flex-wrap">
                <DatePicker
                  onChange={onFromDateChange}
                  value={fromDate}
                  className="md:w-44"
                  placeholder="From Date"
                />
                <DatePicker
                  value={toDate}
                  onChange={onToDateChange}
                  className="md:w-44"
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
                  options={doctorsNames}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

//Patients Info Section
const PatientsInfoSection = () => {
  return (
    <div className="mt-4 flex gap-4 flex-wrap ">
      <CMCards
        firstTitle="New Patients"
        firstIcon={<FaUserAlt />}
        firstValue={"20"}
      />
      <CMCards
        firstTitle="Average Wait Time"
        secondTitle={<FiAlertCircle />}
        firstIcon={<RxLapTimer />}
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
        firstIcon={<FaAmbulance />}
        firstValue={"10 "}
        secondValue={"4,512"}
      />
    </div>
  );
};

// Button and search Section
const ButtonAndSearchSection = () => {
  const { Text } = Typography;
  const {
    activeButton,
    setActiveButton,
    searchString,
    setSearchString,
    numberOfShowData,
    setNumberOfShowData,
  } = useTableStore();

  const handleNumberOfShowDataChange = (value: number) => {
    setNumberOfShowData(value);
  };

  return (
    <>
      <div className="mt-4 flex flex-wrap gap-3">
        <CMButton
          type={activeButton === "new-patients" ? "primary" : "default"}
          onClick={() => setActiveButton("new-patients")}
          halfRadius
        >
          {`New Patients(${newPatientsData.length})`}
        </CMButton>
        <CMButton
          type={activeButton === "nurse-seen" ? "primary" : "default"}
          onClick={() => setActiveButton("nurse-seen")}
          halfRadius
        >
          {`Nurse Seen(${nurseSeen.length})`}
        </CMButton>
        <CMButton
          type={activeButton === "doctor-visited" ? "primary" : "default"}
          onClick={() => setActiveButton("doctor-visited")}
          halfRadius
        >
          {`Doctor Visited(${doctorVisited.length})`}
        </CMButton>
        <CMButton
          type={activeButton === "appointment" ? "primary" : "default"}
          onClick={() => setActiveButton("appointment")}
          halfRadius
        >
          {`Appointment(${appointment.length})`}
        </CMButton>
      </div>
      <div className="mt-4 flex justify-between flex-wrap gap-3">
        <Input
          className="max-w-96"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          addonBefore={<SearchOutlined />}
          placeholder="Search using patient name..."
        />
        <div className="flex items-center gap-2">
          <Text>Show</Text>
          <Select
            className="w-16"
            showSearch
            value={numberOfShowData}
            optionFilterProp="label"
            onChange={handleNumberOfShowDataChange}
            options={numberOfRowsOptions}
          />
        </div>
      </div>
    </>
  );
};

const TableSection = () => {
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
  const {
    tableData,
    originalTableData,
    numberOfShowData,
    currentPage,
    setCurrentPage,
  } = useTableStore();
  const displayText = useTableStore((state) => state.displayText());

  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={false}
        className="shadow-md mt-4 rounded-lg"
        size="small"
        scroll={{ x: "max-content" }}
      />
      <div className="mt-4 mb-20 flex items-center justify-between">
        <Text>{displayText}</Text>
        <Pagination
          current={currentPage}
          total={originalTableData.length}
          pageSize={numberOfShowData}
          onChange={handlePaginationChange}
        />
      </div>
    </>
  );
};
