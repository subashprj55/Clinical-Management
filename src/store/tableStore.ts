import { create } from "zustand";
import {
  newPatientsData,
  nurseSeen,
  doctorVisited,
  appointment,
} from "../data/homeData";

type TableStore = {
  activeButton: string;
  tableData: typeof newPatientsData;
  originalTableData: typeof newPatientsData;
  searchString: string;
  numberOfShowData: number;
  currentPage: number;
  setActiveButton: (id: string) => void;
  setSearchString: (value: string) => void;
  setNumberOfShowData: (value: number) => void;
  setCurrentPage: (page: number) => void;
  displayText: () => string;
};

const useTableStore = create<TableStore>((set, get) => ({
  activeButton: "new-patients",
  numberOfShowData: 5,
  currentPage: 1,
  originalTableData: newPatientsData,
  tableData: newPatientsData.slice(0, 5),
  searchString: "",

  setActiveButton: (id: string) =>
    set(() => {
      let newData;
      switch (id) {
        case "nurse-seen":
          newData = nurseSeen;
          break;
        case "doctor-visited":
          newData = doctorVisited;
          break;
        case "appointment":
          newData = appointment;
          break;
        default:
          newData = newPatientsData;
      }

      const { numberOfShowData } = get();

      return {
        activeButton: id,
        originalTableData: newData,
        tableData: newData.slice(0, numberOfShowData),
        searchString: "",
        currentPage: 1,
      };
    }),

  setSearchString: (value: string) =>
    set((state) => {
      const filteredData = state.originalTableData.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(value.toLowerCase())
        )
      );

      const { numberOfShowData, currentPage } = state;
      const startIndex = (currentPage - 1) * numberOfShowData;

      return {
        searchString: value,
        tableData: filteredData.slice(
          startIndex,
          startIndex + numberOfShowData
        ),
      };
    }),

  setNumberOfShowData: (value: number) =>
    set((state) => {
      const startIndex = (state.currentPage - 1) * value;

      return {
        numberOfShowData: value,
        tableData: state.originalTableData.slice(
          startIndex,
          startIndex + value
        ),
      };
    }),

  setCurrentPage: (page: number) =>
    set((state) => {
      const { numberOfShowData } = state;
      const startIndex = (page - 1) * numberOfShowData;

      return {
        currentPage: page,
        tableData: state.originalTableData.slice(
          startIndex,
          startIndex + numberOfShowData
        ),
      };
    }),

  displayText: () => {
    const { currentPage, numberOfShowData, originalTableData } = get();
    const totalEntries = originalTableData.length;

    const startIndex = (currentPage - 1) * numberOfShowData + 1;
    const endIndex = Math.min(startIndex + numberOfShowData - 1, totalEntries);

    return `Showing ${startIndex} - ${endIndex} of ${totalEntries} entries`;
  },
}));

export default useTableStore;
