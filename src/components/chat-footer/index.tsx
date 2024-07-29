import { h, FunctionComponent } from 'preact';
import { IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';  // Import HomeIcon
import WorkIcon from '@mui/icons-material/Work';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ArticleIcon from '@mui/icons-material/Article';

interface BottomMenuProps {
  currentScreen: 'home' | 'applicant' | 'articles';
  handleScreenChange: (screen: 'home' | 'applicant' | 'articles') => void;
}

const BottomMenu: FunctionComponent<BottomMenuProps> = ({
  currentScreen,
  handleScreenChange,
}) => {
  return (
    <div className="bottom-menu" style={{ display: 'flex' }}>
      <IconButton
        onClick={() => handleScreenChange('home')}
        style={{
          flex: '1',
          padding: '8px 12px',
          backgroundColor: currentScreen === 'home' ? '#007bff' : '#f1f0f0',
          color: currentScreen === 'home' ? 'white' : '#333',
          border: 'none',
          borderRadius: '16px',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        <HomeIcon />
      </IconButton>
      <IconButton
        onClick={() => handleScreenChange('applicant')}
        style={{
          flex: '1',
          padding: '8px 12px',
          backgroundColor: currentScreen === 'applicant' ? '#007bff' : '#f1f0f0',
          color: currentScreen === 'applicant' ? 'white' : '#333',
          border: 'none',
          borderRadius: '16px',
          cursor: 'pointer',
          fontSize: '14px',
          marginLeft: '12px',
        }}
      >
        <WorkIcon />
      </IconButton>
      <IconButton
        onClick={() => handleScreenChange('articles')}
        style={{
          flex: '1',
          padding: '8px 12px',
          backgroundColor: currentScreen === 'articles' ? '#007bff' : '#f1f0f0',
          color: currentScreen === 'articles' ? 'white' : '#333',
          border: 'none',
          borderRadius: '16px',
          cursor: 'pointer',
          fontSize: '14px',
          marginLeft: '12px',
        }}
      >
        <ArticleIcon />
      </IconButton>
    </div>
  );
};

export default BottomMenu;
