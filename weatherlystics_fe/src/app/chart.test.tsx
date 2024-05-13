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

    const { container } = render(<Chart weatherData={mockData} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});