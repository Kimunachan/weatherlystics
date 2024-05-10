export const customStyles = {
    control: (provided) => ({
      ...provided,
      height: 35,
      width: 150,
      fontSize: 12,
      borderRadius: '15px',
      borderColor: '#fff',
      backgroundColor: '#121212',
      color: '#fff',
      '&:hover': {
        borderColor: '#ccc',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),
    input: (provided) => ({
      ...provided,
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#fff',
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: '#fff',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#121212',
      color: '#fff',
      fontSize: 13,
      width: 250,
      
      
      // Verstecken Sie die Scrollbar
      overflow: 'auto',
      scrollbarWidth: 'none', // Für Firefox
      '&::-webkit-scrollbar': {
        display: 'none', // Für Chrome, Safari und Opera
      },
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? '#121212' : '#fff',
      backgroundColor: state.isSelected ? '#fff' : '#121212',
      '&:hover': {
        color: '#121212',
        backgroundColor: '#ccc',
      },
    }),
  };