import { h, FunctionComponent } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import { v4 as uuidv4 } from 'uuid';
import IconButton from '@mui/material/IconButton';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { chatInputStyles } from '../styles';

interface LocationInputProps {
  apiKey: string;
  onLocationSelect: (location: { address: string; lat: number; lng: number }) => void;
}

interface Suggestion {
  place_id: string;
  description: string;
}

const LocationInput: FunctionComponent<LocationInputProps> = ({ apiKey, onLocationSelect }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const debounceTimeout = useRef<number | null>(null);

  const fetchSuggestions = async (input: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.olamaps.io/places/v1/autocomplete?input=${encodeURIComponent(input)}&api_key=${apiKey}`,
        {
          method: 'GET',
          headers: {
            'X-Request-Id': uuidv4(),
            'X-Correlation-Id': uuidv4(),
          },
        }
      );
      const data = await response.json();
      setSuggestions(data.predictions || []);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInput = (e: h.JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const value = e.currentTarget.value;
    setInputValue(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (value.length > 3) {
        fetchSuggestions(value);
      } else {
        setSuggestions([]);
      }
    }, 500) as unknown as number;
  };

  const handleSelect = async (placeId: string, description: string) => {
    setInputValue(description);
    setSuggestions([]);
    setIsOpen(false);

    try {
      const response = await fetch(
        `https://api.olamaps.io/places/v1/details?place_id=${placeId}&api_key=${apiKey}`,
        {
          method: 'GET',
          headers: {
            'X-Request-Id': uuidv4(),
            'X-Correlation-Id': uuidv4(),
          },
        }
      );
      const data = await response.json();
      const { lat, lng } = data.result.geometry.location;
      onLocationSelect({ address: description, lat, lng });
    } catch (error) {
      console.error('Error fetching place details:', error);
    }
  };

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  const toggleLocationInput = () => setIsOpen(!isOpen);

  return (
    <div style={locationInputStyles.container}>
      <IconButton onClick={toggleLocationInput} style={chatInputStyles.button}>
        <LocationOnIcon />
      </IconButton>
      {isOpen && (
        <div style={locationInputStyles.inputContainer}>
          <input
            value={inputValue}
            onChange={handleInput}
            placeholder="Enter your location..."
            style={locationInputStyles.input}
          />
          {isLoading && <div style={locationInputStyles.loading}>Loading...</div>}
          {suggestions.length > 0 && (
            <ul style={locationInputStyles.suggestionsList}>
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.place_id}
                  onClick={() => handleSelect(suggestion.place_id, suggestion.description)}
                  style={locationInputStyles.suggestionItem}
                >
                  {suggestion.description}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

const locationInputStyles = {
  container: {
    position: 'relative' as 'relative',
    overflow: 'visible',
  },
  inputContainer: {
    position: 'absolute' as 'absolute',
    bottom: '100%',
    right: '-70px',
    width: '300px',
    backgroundColor: 'white',
    border: '2px solid #ccc',
    borderRadius: '6px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    zIndex: 1000,
  },
  input: {
    width: 'calc(100% - 16px)', // Adjusted width to account for padding
    padding: '8px',
    fontSize: '14px',
    border: 'none',
    borderBottom: '1px solid #eee',
  },
  loading: {
    padding: '8px',
    textAlign: 'center' as 'center',
  },
  suggestionsList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    maxHeight: '200px',
    overflowY: 'auto' as 'auto',
  },
  suggestionItem: {
    padding: '8px',
    cursor: 'pointer',
  },
};

export default LocationInput;
