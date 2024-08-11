import React, {useState, useEffect} from 'react';
import { Paper, Typography, Box } from '@mui/material';
import HeartbeatMeter from './HeartbeatMeter';
import Button from '@mui/joy/Button';
import LinearProgress from '@mui/joy/LinearProgress';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000');

const HeartbeatDisplay = () => {
  const [data, setData] = useState({ rr_interval: 0, heart_beat: 0 });
  const [collecting, setCollecting] = useState(false);
  const [summary, setSummary] = useState({ prediction: 0, heartRate: 0 });

  useEffect(() => {
    socket.on('new_data', (newData) => {
      setData(newData);
    });

    socket.on('data_summary', (summaryData) => {
      setSummary(summaryData);
      console.log('summary data : ');
      console.log(summaryData);
      setCollecting(false);
    });

    return () => {
      socket.off('new_data');
      socket.off('data_summary');
    };
  }, []);

  const startCollection = async () => {
    try {
      const response = await axios.post('http://localhost:5000/start-collection');
      if (response.data.status === 'started') {
        setSummary({prediction:0, heartRate:0});
        setCollecting(true);
      } else if (response.data.status === 'already_running') {
        alert('Data collection is already running.');
      }
    } catch (error) {
      console.error('Error starting data collection:', error);
    }
  };
  console.log(data);
  return (
    <Paper elevation={3} sx={{ p: 2, flexGrow: 1 }}>
      <Typography variant="h6">Self Control</Typography>
      <HeartbeatMeter bpm={data.rr_interval} />
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="body2" sx={{ width: '35%', mr: 1 }}>Heart Rate</Typography>
        {
          summary.prediction ? (
            <Typography variant="body2" sx={{ ml: 10 }}>{Math.round(summary.heartRate)} bpm</Typography>
          ) : (
            <LinearProgress variant="determinate" value={60} sx={{ width: '65%' }} />
          )
        }
        {/* <LinearProgress variant="determinate" value={60} sx={{ width: '65%' }} /> */}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="body2" sx={{ width: '35%', mr: 1 }}>Stress</Typography>
        {
          summary.prediction ? (
            <Typography variant="body2" sx={{ ml: 10 }}>{summary.prediction != 1 ? 'Stressed' : 'Not Stressed'}</Typography>
          ) : (
            <LinearProgress variant="determinate" value={30} sx={{ width: '65%' }} />
          )
        }
      </Box>
      <Box textAlign='center'>
      <Button onClick={startCollection} disabled={collecting}>
        {collecting ? 'Collecting Data...' : 'Start Data Collection'}
      </Button>
      </Box>
    </Paper>
  )
}

export default HeartbeatDisplay;
