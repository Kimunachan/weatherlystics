import { customStyles } from "@/utils/constants";
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import Select from "react-select";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { z } from 'zod';
import "../styles/globals.scss";
import styles from "../styles/pages/page.module.scss";

type FormProps = {
  location: { latitude: number; longitude: number };
  DateValue: string;
  showSecondDate: boolean;
  toggleSecondDate: (event: React.MouseEvent<HTMLButtonElement>) => void;
  getGeolocation: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const schema = z.object({
  lat: z.number(),
  long: z.number(),
  timezone: z.string(),
  date: z.string(),
  secondDate: z.string().optional(),
});

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
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };
  


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
    if (isError) toast.error("Error fetching timezones");

  return (
    <>
    <form className="form" onSubmit={handleSubmit(onSubmit)} >
      <div className="form-row">
        <label>
            Latitude:
            <input type="text" {...register('lat')} defaultValue={location?.latitude || ''} />
            {errors.lat && <p>{String(errors.lat.message)}</p>}
        </label>
        <label>
            Longitude:
            <input type="text" {...register('long')} defaultValue={location?.longitude || ''} />
            {errors.long && <p>{String(errors.long.message)}</p>}
        </label>
        
      </div>
      <div className="form-row">
        <label>
          Timezone:
        <Select
          isLoading={isLoadingTimezones}
          options={timezones}
          styles={customStyles}
          onChange={handleTimezoneChange}
          value={selectedTimezone}
        />
        </label>
        <button className={styles.normalButton} onClick={getGeolocation}>Use my location</button>
      </div>
      <div className="form-row">
        <label>
          Date:
          <input type="date" {...register('date')} defaultValue={DateValue} />
          {errors.date && <p>{String(errors.date.message)}</p>}
        </label>
        {showSecondDate && (
          <label>
            Second Date
            <input type="date" {...register('secondDate')} defaultValue={DateValue}/>
            {errors.secondDate && <p>{String(errors.secondDate.message)}</p>}
          </label>
        )}
        <button className={styles.circleButton} onClick={toggleSecondDate}>
          {showSecondDate ? '-' : 'add'}
        </button>
      </div>
      <button className={styles.longButton} type="submit">Submit</button>
    </form>
    <ToastContainer />
    </>
  );
};

export default Form;
