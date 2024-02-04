import {
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { formatDate } from '../../utils/getDate';
import './styles/forecast.styles.css';

export const ForecastPopup = ({
  weatherData,
  closePopup,
  isOpen,
  isLoading,
}) => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <div>
      <Dialog open={isOpen} onClose={closePopup} maxWidth="sm">
        <div className="title-container">
          <DialogTitle>
            {isMobile ? 'Forecast:' : '5 Day Weather Forecast for'}{' '}
            {weatherData?.city?.name}
          </DialogTitle>
          <CloseIcon
            sx={{ marginRight: '30px', cursor: 'pointer' }}
            onClick={closePopup}
          />
        </div>
        <DialogContent
          sx={isMobile ? { padding: '0 2px 10px' } : { padding: '0 24px 20px' }}
        >
          <TableContainer sx={{ overflowX: 'initial' }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell className="mobile-text">Date</TableCell>
                  <TableCell className="mobile-text">
                    {isMobile ? 'Temp' : 'Temperature'} (&#8451;)
                  </TableCell>
                  <TableCell className="mobile-text">
                    {isMobile ? 'Wind (m/s)' : 'Wind speed (m/sec)'}
                  </TableCell>
                  <TableCell className="mobile-text">
                    {isMobile ? 'Hum' : 'Humidity'} (%)
                  </TableCell>
                  <TableCell className="mobile-text">Weather</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {weatherData?.list?.map((item) => (
                  <TableRow key={item.dt_txt}>
                    <TableCell className="mobile-text">
                      {formatDate(item.dt_txt)}
                    </TableCell>
                    <TableCell className="mobile-text" align="center">
                      {Math.round(item.main.temp)}
                    </TableCell>
                    <TableCell className="mobile-text" align="center">
                      {Math.round(item.wind.speed)}
                    </TableCell>
                    <TableCell className="mobile-text" align="center">
                      {item.main.humidity}
                    </TableCell>
                    <TableCell className="mobile-text">
                      {item.weather[0].description}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </div>
  );
};
