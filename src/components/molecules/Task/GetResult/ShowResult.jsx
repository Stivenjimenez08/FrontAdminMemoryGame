import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import '../../../StyleComponents.css';

export const ShowResult = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}/api/game/getAllGames`);
        setRows(response.data.games);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <>
      <TableContainer component={Paper} className='table'>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre del estudiante</TableCell>
              <TableCell align="center">Edad</TableCell>
              <TableCell align="center">Escuela</TableCell>
              <TableCell align="center">Grado</TableCell>
              <TableCell align="center">Aciertos</TableCell>
              <TableCell align="center">Fallos</TableCell>
              <TableCell align="center">Nota</TableCell>
              <TableCell align="center">Puntaje</TableCell>
              <TableCell align="center">Tiempo de juego</TableCell>
              <TableCell align="center">Juego</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row) => (
                <TableRow
                  key={row?.id} 
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row?.name}
                  </TableCell>
                  <TableCell align="center">{row?.age}</TableCell>
                  <TableCell align="center">{row?.school?.name}</TableCell>
                  <TableCell align="center">{row?.grade}</TableCell>
                  <TableCell align="center">{row?.hit}</TableCell>
                  <TableCell align="center">{row?.failure}</TableCell>
                  <TableCell align="center">{row?.note}</TableCell>
                  <TableCell align="center">{row?.score}</TableCell>
                  <TableCell align="center">{row?.playingTime}</TableCell>
                  <TableCell align="center">{row?.idGame}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} align="center">Cargando...</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
