import { makeStyles } from '@fluentui/react-components';

export const useStyles = makeStyles({
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  card: {
    maxWidth: '80vw',
    width: '100%',
  },
  header: {
    textAlign: 'center',
  },
  subtitle: {
    marginTop: '12px',
    textAlign: 'center',
  },
  uploadSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '20px',
    alignItems: 'center',
  },
  fileInput: {
    display: 'none',
  },
  dataPreview: {
    marginTop: '20px',
    padding: '16px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    maxHeight: '300px',
    overflow: 'auto',
    width: '100%',
  },
});
