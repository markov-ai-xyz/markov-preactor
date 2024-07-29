import { h, FunctionComponent } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import { v4 as uuidv4 } from 'uuid';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
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
  const [open, setOpen] = useState(false);
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
      if (value.length > 2) {
        fetchSuggestions(value);
      } else {
        setSuggestions([]);
      }
    }, 300) as unknown as number;
  };

  const handleSelect = async (placeId: string, description: string) => {
    setInputValue(description);
    setSuggestions([]);
    setOpen(false); // Close the modal after selecting a location

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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton onClick={handleOpen} style={chatInputStyles.button}>
        <LocationOnIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="location-modal-title"
        aria-describedby="location-modal-description"
      >
        <Box style={modalStyles}>
          <input
            value={inputValue}
            onChange={handleInput}
            placeholder="Enter your location"
          />
          {isLoading && <div>Loading...</div>}
          {suggestions.length > 0 && (
            <ul>
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.place_id}
                  onClick={() => handleSelect(suggestion.place_id, suggestion.description)}
                >
                  {suggestion.description}
                </li>
              ))}
            </ul>
          )}
        </Box>
      </Modal>
    </div>
  );
};

const modalStyles = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'white',
  border: '1px solid #000',
  boxShadow: 24,
  padding: '20px',
};

export default LocationInput;
