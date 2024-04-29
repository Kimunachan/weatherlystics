"use client";

import { useEffect, useState } from "react";
import Select from "react-select";



export default function Page() {
  const [location, setLocation] = useState({ latitude: '', longitude: '', timezone: ''});
  const [timezones, setTimezones] = useState([]);
  const [selectedTimezone, setSelectedTimezone] = useState('');
  const [error, setError] = useState('');
  const [city, setCity] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  

  useEffect(() => {
    const fetchTimezones = async () => {
      const res = await fetch('http://worldtimeapi.org/api/timezone');
      const data = await res.json();
      setTimezones(data.map(timezone => ({ value: timezone, label: timezone })));
    };
    fetchTimezones();
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, handleError);
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);
  const handleTimezoneChange = (selectedOption) => {
    setSelectedTimezone(selectedOption.value);
  };

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    setLocation({ latitude, longitude, timezone });
  }

  function handleError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setError('User denied the request for Geolocation.');
        break;
      case error.POSITION_UNAVAILABLE:
        setError('Location information is unavailable.');
        break;
      case error.TIMEOUT:
        setError('The request to get user location timed out.');
        break;
      default:
        setError('An unknown error occurred.');
        break;
    }
  }

  const customStyles = {
    control: (provided) => ({
      ...provided,
      height: 30,
      minHeight: 30,
      width: 150,
      fontSize: 12,
      borderRadius: '5px',
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
    }),
    input: (provided) => ({
      ...provided,
      color: '#fff',
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
  
  return (
    <>
    <header>
      <div className="header">Weatherlystics</div>
    </header>
      
      <main>
        <div className="card">
          <form className="form">
            <div className="form-row">
              <label>
                Lat:
                <input type="text" name="lat" value={location.latitude} />
              </label>
              <label>
                StartDate:
                <input type="date" name="startDate" />
              </label>
            </div>
            <div className="form-row">
              <label>
                Long:
                <input type="text" name="long" value={location.longitude} />
              </label>
              <label>
                EndDate:
                <input type="date" name="endDate" />
              </label>
            </div>
            <div className="form-row">
              <label>
              Timezone:
                <Select
                styles={customStyles}
                  options={timezones}
                  onChange={handleTimezoneChange}
                  value={timezones.find(timezone => timezone.value === selectedTimezone)}
                  classNamePrefix="react-select"
                />
              </label>
              <label>
                Pick city
                <input type="Text" name="endDate" />
              </label>
            </div>
          </form>
        </div>
      </main>
      <footer>

      </footer>
    </>
  );
}