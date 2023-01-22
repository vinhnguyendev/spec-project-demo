import React,{useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function ResultContainer (props) {
  const [data,setData] = useState([])

  useEffect(() => {
  return ()=>{setData(props.response)}
  },[])
  console.log(data)

  
    return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
              .slice(0,8)
              .map((row) => {
                const { foodId, label, category } = row;
                const { ENERC_KCAL, PROCNT, FAT, CHOCDF, FIBTG } = row.nutrients;
                return(
                <TableRow
                  key={foodId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {label}
                  </TableCell>
                  <TableCell align="right">{ENERC_KCAL}</TableCell>
                  <TableCell align="right">{FAT}</TableCell>
                  <TableCell align="right">{CHOCDF}</TableCell>
                  <TableCell align="right">{PROCNT}</TableCell>
                </TableRow>
                )
})}
            </TableBody>
          </Table>
        </TableContainer>
      );
    




};