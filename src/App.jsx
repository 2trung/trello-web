import Button from '@mui/material/Button'
import Icon from '@mui/material/Icon'
import { green } from '@mui/material/colors'
import Typography from '@mui/material/Typography'

function App() {
  return (
    <>
      <div>TrungNguyen</div>
      <Typography variant="body2" color="text.secondary">Hello World!</Typography>
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <br />
      <Icon>add_circle</Icon>
      <Icon color="primary">add_circle</Icon>
      <Icon sx={{ color: green[500] }}>add_circle</Icon>
      <Icon fontSize="small">add_circle</Icon>
      <Icon sx={{ fontSize: 30 }}>add_circle</Icon>
    </>
  )
}

export default App
