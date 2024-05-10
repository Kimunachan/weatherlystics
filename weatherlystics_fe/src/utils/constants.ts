export const customStyles = {
  control: (provided: any) => ({
    ...provided,
    height: 35,
    width: 150,
    fontSize: 12,
    borderRadius: "15px",
    borderColor: "#fff",
    backgroundColor: "#121212",
    color: "#fff",
    "&:hover": {
      borderColor: "#ccc",
    },
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  input: (provided: any) => ({
    ...provided,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    color: "#fff",
  }),
  clearIndicator: (provided: any) => ({
    ...provided,
    color: "#fff",
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "#121212",
    color: "#fff",
    fontSize: 13,
    width: 250,

    // Verstecken Sie die Scrollbar
    overflow: "auto",
    scrollbarWidth: "none", // Für Firefox
    "&::-webkit-scrollbar": {
      display: "none", // Für Chrome, Safari und Opera
    },
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    color: state.isSelected ? "#121212" : "#fff",
    backgroundColor: state.isSelected ? "#fff" : "#121212",
    "&:hover": {
      color: "#121212",
      backgroundColor: "#ccc",
    },
  }),
};

export const BASE_URL = "http://localhost:3001/api/v1";
