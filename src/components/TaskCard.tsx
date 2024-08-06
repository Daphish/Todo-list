import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

type TaskCardProps = {
    title: string;
    description: string;
    deadline: string | null;
}

export default function TaskCard({ title, description, deadline } : TaskCardProps) {
  return (
    <Card sx={{backgroundColor: '#002803'}}>
      <CardContent>
        {deadline ?
            <Typography variant="h4" sx={{ m: 1 }}>{deadline}</Typography>
            :
            <Typography variant="h4" sx={{ m: 1 }}>Sin fecha límite</Typography>
        }
        <Typography variant="h6" sx={{ m: 1 }}>{title}</Typography>
        <Typography variant="body1" sx={{ m: 1 }}>{description}</Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-around'}}>
        <Button variant='contained' sx={{textTransform: 'none', fontSize: '1rem'}}>Editar</Button>
        <Button variant='outlined' color="error" sx={{textTransform: 'none', fontSize: '1rem'}}>Eliminar</Button>
      </CardActions>
    </Card>
  )
}
