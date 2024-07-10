import { h, FunctionComponent } from 'preact';
import { IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';

interface BottomMenuProps {
    currentScreen: 'chat' | 'menu' | 'settings';
    handleScreenChange: (screen: 'chat' | 'menu' | 'settings') => void;
}

const BottomMenu: FunctionComponent<BottomMenuProps> = ({
  currentScreen,
  handleScreenChange,
}) => {
  return (
    <div className="bottom-menu" style={{ display: 'flex' }}>
      <IconButton
        onClick={() => handleScreenChange('chat')}
        style={{
          flex: '1',
          padding: '8px 12px',
          backgroundColor: currentScreen === 'chat' ? '#007bff' : '#f1f0f0',
          color: currentScreen === 'chat' ? 'white' : '#333',
          border: 'none',
          borderRadius: '16px',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        <ChatIcon />
      </IconButton>
      <IconButton
        onClick={() => handleScreenChange('menu')}
        style={{
          flex: '1',
          padding: '8px 12px',
          backgroundColor: currentScreen === 'menu' ? '#007bff' : '#f1f0f0',
          color: currentScreen === 'menu' ? 'white' : '#333',
          border: 'none',
          borderRadius: '16px',
          cursor: 'pointer',
          fontSize: '14px',
          marginLeft: '12px',
        }}
      >
        <MenuIcon />
      </IconButton>
      <IconButton
        onClick={() => handleScreenChange('settings')}
        style={{
          flex: '1',
          padding: '8px 12px',
          backgroundColor: currentScreen === 'settings' ? '#007bff' : '#f1f0f0',
          color: currentScreen === 'settings' ? 'white' : '#333',
          border: 'none',
          borderRadius: '16px',
          cursor: 'pointer',
          fontSize: '14px',
          marginLeft: '12px',
        }}
      >
        <SettingsIcon />
      </IconButton>
    </div>
  );
};

export default BottomMenu;
