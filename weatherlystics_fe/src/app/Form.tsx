import { BASE_URL, customStyles } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import "../styles/globals.scss";
import styles from "../styles/pages/page.module.scss";

import { formSchema, rowSchema } from "@/utils/schemas";
import { WeatherDataType } from "@/utils/types";

// Define the schema for each row in the form


type FormProps = {
  setWeatherData: (data: WeatherDataType) => void;
};

type RowType = z.infer<typeof rowSchema>;

export default function Form({ setWeatherData }: FormProps) {
  const [dateValue] = useState(new Date());

  const getCompareWeatherData = useMutation({
    mutationFn: async (
      data: {
        lat: number;
        lon: number;
        date: string;
        timezone: string;
      }[]
    ) => {
      const response = await axios.post(`${BASE_URL}/weather/compare`, {
        requestData: data,
      });
      console.log(response.data);
      return response.data;
      
    },
    mutationKey: ["compareWeatherData"],
    onError: (error) => {
      toast.error(`Error fetching weather data: ${error}`);
    },
    onSuccess: (data) => {
      toast.success(`Weather data fetched successfully`);
      setWeatherData(data);
      console.log(data);
    },
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      rows: [
        { lat: 0, long: 0, timezone: "", date: dateValue.toISOString().split("T")[0] },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "rows",
  });

  const onSubmit = handleSubmit((data) => {
    getCompareWeatherData.mutate(
      data.rows.map((row) => ({
        lat: row.lat,
        lon: row.long,
        date: row.date,
        timezone: row.timezone,
      }))
    );
  });

  const useMyLocation = async (index: number) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setValue(`rows.${index}.lat`, latitude);
        setValue(`rows.${index}.long`, longitude);
      });
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

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
    retry: false,
  });

  const handleTimezoneChange = (
    selectedOption: { value: string; label: string } | null,
    index: number
  ) => {
    if (selectedOption) {
      setSelectedTimezone(selectedOption);
      setValue(`rows.${index}.timezone`, selectedOption.value);
    }
  };
  const minDate = "1940-01-01";
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 8);
  const maxDateString = maxDate.toISOString().split("T")[0];

  const addRow = (index: number) => {
    const lastRow = fields[index];
    append({
      lat: lastRow?.lat ?? 0,
      long: lastRow?.long ?? 0,
      timezone: lastRow?.timezone ?? "",
      date: lastRow?.date ?? dateValue.toISOString().split("T")[0],
    });
  };

  if (isError) toast.error("Error fetching timezones");
  if (isLoadingTimezones) return <div>Loading...</div>;

  return (
    <form data-testid="form" className="form" onSubmit={onSubmit}>
      {fields.map((field, index) => (
        <div key={field.id} className="form-row" data-testid="row">
          <label data-testid="Latitude">
            Latitude:
            <input
              type="number"
              step={0.0000001}
              {...register(`rows.${index}.lat`, { required: true, valueAsNumber: true })}
            />
            {errors.rows?.[index]?.lat && <p role="alert">{errors.rows[index]?.lat?.message}</p>}
          </label>
          <label data-testid="Longitude">
            Longitude:
            <input
              type="number"
              step={0.0000001}
              {...register(`rows.${index}.long`, {
                 required: true, 
                 valueAsNumber: true, 
                 validate: value => value !== 0 || 'Longitude cannot be 0'
                })}
            />
            {errors.rows?.[index]?.long && <p role="alert">{errors.rows[index]?.long?.message}</p>}
          </label>
          <label data-testid="Timezone">
            Timezone:
            <Controller
              control={control}
              name={`rows.${index}.timezone`}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  isLoading={isLoadingTimezones}
                  options={timezones}
                  styles={customStyles}
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption?.value); // notify React Hook Form about the change
                    handleTimezoneChange(selectedOption, index);
                  }}
                  value={timezones?.find(option => option.value === field.value) || null}
                />
              )}
            />
            {errors.rows?.[index]?.timezone && <p role="alert">{errors.rows[index]?.timezone?.message}</p>}
          </label>
          <label>
            Date:
            <input
              type="date"
              min={minDate}
              max={maxDateString}
              defaultValue={dateValue.toISOString().split("T")[0]}
              {...register(`rows.${index}.date`, {
                required: true,
              })}
            />
            {errors.rows?.[index]?.date && <p role="alert">{errors.rows[index]?.date?.message}</p>}
          </label>
          <button className={styles.normalButton} type="button" onClick={() => useMyLocation(index)}>
            Use my location
          </button>
          {fields.length > 1 && (
            <button className={styles.circleButton} type="button" onClick={() => remove(index)}>
              -
            </button>
          )}
          
          <button className={styles.circleButton} type="button" onClick={() => addRow(index)}>
            +
          </button>
        </div>
      ))}
      <button className={styles.longButton} type="submit">
        Submit
      </button>
    </form>
  );
}
