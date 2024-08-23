import React, { useState, useEffect, useRef } from 'react';
import { Paper, Typography, Box } from '@mui/material';
import HeartbeatMeter from './HeartbeatMeter';
import Button from '@mui/joy/Button';
import LinearProgress from '@mui/joy/LinearProgress';
import axios from 'axios';
import io from 'socket.io-client';

const HeartbeatDisplay = () => {
  const [data, setData] = useState({ rr_interval: 0, heart_beat: 0 });
  const [collecting, setCollecting] = useState(false);
  const [summary, setSummary] = useState({ prediction: 0, heartRate: 0 });
  const socketRef = useRef(null); // Use ref to store the socket instance

  const startCollection = async () => {
    try {
      const response = await axios.post('http://localhost:5000/start-collection');
      if (response.data.status === 'started') {
        setSummary({ prediction: 0, heartRate: 0 });
        setCollecting(true);

        // Connect to the WebSocket API
        socketRef.current = io('http://localhost:5000');

        socketRef.current.on('new_data', (newData) => {
          setData(newData);
        });

        socketRef.current.on('data_summary', (summaryData) => {
          setSummary(summaryData);
          console.log('summary data : ', summaryData);
          setCollecting(false);
        });

      } else if (response.data.status === 'already_running') {
        alert('Data collection is already running.');
      }
    } catch (error) {
      console.error('Error starting data collection:', error);
    }
  };

  // Clean up the WebSocket connection when the component unmounts or when data collection stops
  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

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
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="body2" sx={{ width: '35%', mr: 1 }}>Stress</Typography>
        {
          summary.prediction ? (
            <Typography variant="body2" sx={{ ml: 10 }}>{summary.prediction !== 1 ? 'Stressed' : 'Not Stressed'}</Typography>
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
  );
}

export default HeartbeatDisplay;
