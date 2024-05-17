"use client";
import { BASE_URL, customStyles } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import "../styles/globals.scss";
import styles from "../styles/pages/page.module.scss";

import { WeatherDataType } from "@/utils/types";
import { schema } from "@/utils/schemas";

type FormProps = {
  setWeatherData: (data: WeatherDataType) => void;
};

export default function Form({ setWeatherData }: FormProps) {
  const dateValue = new Date();

  const [showSecondDate, setShowSecondDate] = useState(false);
  const toggleSecondDate = () => setShowSecondDate(!showSecondDate);

  const getWeatherData = useMutation({
    mutationFn: async ({ lat, lon }: { lat: number; lon: number }) => {
      const response = await axios.get(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}`
      );
      return response.data;
    },
    mutationKey: ["weatherData"],
    onError: (error) => {
      toast.error(`Error fetching weather data: ${error}`);
    },
    onSuccess: (data) => {
      toast.success(`Weather data fetched successfully`);
      setWeatherData(data);
    },
  });

  const [selectedTimezone, setSelectedTimezone] = useState<{
    value: string;
    label: string;
  }>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      lat: 0,
      long: 0,
    },
  });

  const onSubmit = handleSubmit((data) => {
    getWeatherData.mutate({
      lat: data.lat,
      lon: data.long,
    });
  });

  const useMyLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setValue("lat", latitude);
        setValue("long", longitude);
      });
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
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
      setValue("timezone", selectedOption.value);
    }
  };
  const handleLatChange = (event: any) => {
    setValue("lat", event.target.value);
  };

  const handleLongChange = (event: any) => {
    setValue("long", event.target.value);
  };

  if (isLoadingTimezones) return <div>Loading...</div>;
  if (isError) toast.error("Error fetching timezones");

  return (
    <>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-row">
          <label>
            Latitude:
            <input
              type="number"
              step={0.0000001}
              {...register("lat", { required: true, valueAsNumber: true })}
              onChange={handleLatChange}
            />
            {errors.lat && <p>{errors.lat.message}</p>}
          </label>
          <label>
            Longitude:
            <input
              type="number"
              step={0.0000001}
              {...register("long", { required: true, valueAsNumber: true })}
              onChange={handleLongChange}
            />
            {errors.long && <p>{errors.long.message}</p>}
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
            {errors.timezone && <p>{errors.timezone.message}</p>}
          </label>
          <button
            type="button"
            className={styles.normalButton}
            onClick={useMyLocation}
          >
            Use my location
          </button>
        </div>
        <div className="form-row">
          <label>
            Date:
            <input
              type="date"
              defaultValue={dateValue.toISOString().split("T")[0]}
              {...register("date", {
                required: true,
                valueAsDate: true,
              })}
            />
            {errors.date && <p>{errors.date.message}</p>}
          </label>
          {showSecondDate && (
            <label>
              Second Date
              <input
                type="date"
                defaultValue={dateValue.toISOString().split("T")[0]}
                {...register("secondDate", { valueAsDate: true })}
              />
              {errors.secondDate && <p>{errors.secondDate.message}</p>}
            </label>
          )}
          <button className={styles.circleButton} onClick={toggleSecondDate}>
            {showSecondDate ? "-" : "add"}
          </button>
        </div>
        <button className={styles.longButton} type="submit">
          Submit
        </button>
      </form>
    </>
  );
}
