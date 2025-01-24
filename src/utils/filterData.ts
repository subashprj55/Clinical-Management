export const filterData = (data: any, name: string) => {
  return data.filter((item: any) =>
    item.patientName.toLowerCase().includes(name.toLowerCase())
  );
};
