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
  Container,
  Skeleton,
  Link,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { formatDate } from '../../utils/getDate';
import './styles/forecast.styles.css';
import { useState } from 'react';

export const ForecastPopup = ({
  weatherData,
  closePopup,
  isOpen,
  isLoading,
}) => {
  const [isDetailedForecast, setIsDetailedForecast] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  const filteredData = weatherData?.list?.filter((item) => {
    const date = new Date(item.dt_txt);
    const hours = date.getHours();

    return hours === 12;
  });

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
                  <TableCell className="mobile-text" align="center">
                    Date
                  </TableCell>
                  <TableCell className="mobile-text" align="center">
                    {isMobile ? 'Temp' : 'Temperature'} (&#8451;)
                  </TableCell>
                  <TableCell className="mobile-text" align="center">
                    {isMobile ? 'Wind (m/s)' : 'Wind speed (m/sec)'}
                  </TableCell>
                  <TableCell className="mobile-text" align="center">
                    {isMobile ? 'Hum' : 'Humidity'} (%)
                  </TableCell>
                  <TableCell className="mobile-text" align="center">
                    Weather
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell className="mobile-text">
                      <Skeleton width={60} />
                    </TableCell>
                    <TableCell className="mobile-text" align="center">
                      <Skeleton width={20} />
                    </TableCell>
                    <TableCell className="mobile-text" align="center">
                      <Skeleton width={20} />
                    </TableCell>
                    <TableCell className="mobile-text" align="center">
                      <Skeleton width={20} />
                    </TableCell>
                    <TableCell
                      className="mobile-text"
                      align="center"
                      sx={{ lineHeight: '1' }}
                    >
                      <Container
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                      >
                        <Skeleton width={20} />
                        <Skeleton variant="circular" width={20} height={20} />
                      </Container>
                    </TableCell>
                  </TableRow>
                ) : isDetailedForecast ? (
                  weatherData?.list?.map((item) => (
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
                      <TableCell
                        className="mobile-text"
                        align="center"
                        sx={{ lineHeight: '1' }}
                      >
                        <Container
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                          }}
                        >
                          {item.weather[0].description}
                          <img
                            className="icon"
                            src={`https://openweathermap.org/img/wn/${item.weather[0]?.icon}@2x.png`}
                            alt=""
                          />
                        </Container>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  filteredData?.map((item) => (
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
                      <TableCell
                        className="mobile-text"
                        align="center"
                        sx={{ lineHeight: '1' }}
                      >
                        <Container
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                          }}
                        >
                          {item.weather[0].description}
                          <img
                            className="icon"
                            src={`https://openweathermap.org/img/wn/${item.weather[0]?.icon}@2x.png`}
                            alt=""
                          />
                        </Container>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {!isDetailedForecast && (
            <Box sx={{ margin: '10px 0 0 10px' }}>
              <Link
                underline="none"
                variant="body2"
                onClick={() => setIsDetailedForecast(true)}
                sx={{ cursor: 'pointer' }}
              >
                Detailed weather forecast data with 3-hour step
              </Link>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
