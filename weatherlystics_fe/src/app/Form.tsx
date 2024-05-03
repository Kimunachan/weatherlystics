import { customStyles } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Select from "react-select";
import styles from "../styles/pages/page.module.scss";

type FormProps = {
  location: { latitude: string; longitude: string };
  DateValue: string;
  showSecondDate: boolean;
  toggleSecondDate: (event: React.MouseEvent<HTMLButtonElement>) => void;
  getGeolocation: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Form = ({
  location,
  DateValue,
  showSecondDate,
  toggleSecondDate,
  getGeolocation,
}: FormProps) => {
  const [selectedTimezone, setSelectedTimezone] = useState<{
    value: string;
    label: string;
  }>();

  const {
    data: timezones,
    isLoading: isLoadingTimezones,
    isError,
  } = useQuery({
    queryKey: ["timezones"],
    queryFn: async () => {
      const response = await axios.get<string[]>(
        "http://worldtimeapi.org/api/timezone"
      );
      return response.data.map((timezone) => ({
        value: timezone,
        label: timezone,
      }));
    },
  });
  const handleTimezoneChange = (
    selectedOption: { value: string; label: string } | null
  ) => {
    if (selectedOption) {
      setSelectedTimezone(selectedOption);
    }
  };

  if (isLoadingTimezones) return <div>Loading...</div>;
  if (isError) console.error("Error fetching timezones"); //TODO: Toast

  return (
    <form className="form">
      <div className="form-row">
        <label>
          Latitude:
          <input
            type="text"
            name="lat"
            defaultValue={location?.latitude || ""}
          />
        </label>
        <label>
          Date:
          <input type="date" name="" defaultValue={DateValue} />
        </label>
        <button className={styles.circleButton} onClick={toggleSecondDate}>
          {showSecondDate ? "-" : "+"}
        </button>
        {showSecondDate && (
          <label>
            Second Date:
            <input type="date" name="secondDate" defaultValue={DateValue} />
          </label>
        )}
      </div>
      <div className="form-row">
        <label>
          Long:
          <input
            type="text"
            name="long"
            defaultValue={location?.longitude || ""}
          />
        </label>

        <label>
          Timezone:
          <Select
            styles={customStyles}
            options={timezones!}
            isLoading={isLoadingTimezones}
            onChange={handleTimezoneChange}
            value={selectedTimezone}
          />
        </label>
      </div>
      <div className="form-row">
        <button className={styles.normalButton} onClick={getGeolocation}>
          Use my location
        </button>
        <label>
          Pick city
          <input type="Text" name="City Picker" />
        </label>
        <label>
          <button className={styles.normalButton} type="submit">
            Submit
          </button>
        </label>
      </div>
    </form>
  );
};

export default Form;
