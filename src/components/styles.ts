export const chatbotPopupStyles = {
    container: {
      position: 'fixed',
      bottom: '80px',
      right: '20px',
      width: '350px',
      height: '500px',
      maxHeight: '80vh',
      backgroundColor: 'white',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
      borderRadius: '8px',
      overflow: 'hidden',
      zIndex: '9999',
    },
    footer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      padding: '12px 16px',
      borderTop: '1px solid #e0e0e0',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
  };
  
  export const chatHeaderStyles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 16px',
      borderBottom: '1px solid #e0e0e0',
      backgroundColor: '#007bff',
      color: 'white',
    },
    title: {
      margin: 0,
    },
  };
  
  export const chatContentStyles = {
    container: {
      padding: '16px',
      height: 'calc(100% - 170px)',
      overflowY: 'auto',
    },
    messageContainer: {
      display: 'flex',
      marginBottom: '12px',
    },
    message: {
      maxWidth: '70%',
      padding: '8px 12px',
      borderRadius: '16px',
    },
  };
  
  export const chatInputStyles = {
    container: {
      display: 'flex',
      marginBottom: '12px',
    },
    input: {
      flex: '1',
      padding: '8px 12px',
      border: '1px solid #e0e0e0',
      borderRadius: '16px',
      fontSize: '14px',
    },
    button: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      marginLeft: '12px',
      color: '#007bff',
    },
  };
  
  export const toggleButtonStyles = {
    button: {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      padding: '12px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      cursor: 'pointer',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
      zIndex: '9999',
      width: '48px',
      height: '48px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };