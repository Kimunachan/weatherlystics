import { WeatherDataType } from '@/utils/types';
import { render } from '@testing-library/react';
import Chart from './chart';

describe('Chart', () => {
  it('renders without crashing', () => {
    const mockData: WeatherDataType = {
        latitude: 0,
        longitude: 0,
        timezone: '',
        timezoneAbbreviation: '',
        current: {
            time: new Date(),
            temperature2m: 0,
            relativeHumidity2m: 0,
            apparentTemperature: 0,
        },
        hourly: [],
        daily: []
    };

    const { getByTestId } = render(<Chart weatherData={mockData} />);
    expect(getByTestId('chart_temp')).toBeInTheDocument();
    expect(getByTestId('chart_humidity')).toBeInTheDocument();
    expect(getByTestId('chart_appTemp')).toBeInTheDocument();
  });

  it('renders without crashing when weatherData is undefined', () => {
    const { container } = render(<Chart weatherData={undefined} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});