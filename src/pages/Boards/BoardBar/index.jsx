import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'

const MENU_STYLE = {
  bgcolor: 'transparent',
  color: 'white',
  border: 'none',
  px: '5px',
  borderRadius: '8px',
  '& .MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

function BoardBar() {
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      overflowX: 'auto',
      gap: 2,
      bgcolor: (theme) => (theme.palette.mode == 'dark' ? '#34495e' : '#1976d2'),
      borderBottom: '1px solid white',
      px: 2
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={MENU_STYLE}
          icon={<SpaceDashboardIcon />}
          label="Trung Nguyen"
          onClick= {() => {}}
        />
        <Chip
          sx={MENU_STYLE}
          icon={<LockOpenIcon />}
          label="Public/Private Workspace"
          onClick= {() => {}}
        />
        <Chip
          sx={MENU_STYLE}
          icon={<AddToDriveIcon />}
          label="Add to Google Drive"
          onClick= {() => {}}
        />
        <Chip
          sx={MENU_STYLE}
          icon={<AutoAwesomeIcon />}
          label="Automation"
          onClick= {() => {}}
        />
        <Chip
          sx={MENU_STYLE}
          icon={<FilterAltIcon />}
          label="Filter"
          onClick= {() => {}}
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<PersonAddAltIcon/>}
          sx={{ color: 'white', borderColor: 'white', '&:hover': { borderColor: 'white' } }}
        >
          Invite
        </Button>
        <AvatarGroup
          max={6}
          sx={{
            gap: '10px',
            '& .MuiAvatar-root': {
              width: '34px',
              height: '34px',
              fontSize: '16px',
              border: 'none'
            }
          }}
        >
          <Tooltip title="Trung">
            <Avatar alt="Trung" src="https://i.pravatar.cc/300" />
          </Tooltip>
          <Tooltip title="Trung">
            <Avatar alt="Trung" src="https://i.pravatar.cc/301" />
          </Tooltip>
          <Tooltip title="Trung">
            <Avatar alt="Trung" src="https://i.pravatar.cc/302" />
          </Tooltip>
          <Tooltip title="Trung">
            <Avatar alt="Trung" src="https://i.pravatar.cc/303" />
          </Tooltip>
          <Tooltip title="Trung">
            <Avatar alt="Trung" src="https://i.pravatar.cc/304" />
          </Tooltip>
          <Tooltip title="Trung">
            <Avatar alt="Trung" src="https://i.pravatar.cc/305" />
          </Tooltip>
          <Tooltip title="Trung">
            <Avatar alt="Trung" src="https://i.pravatar.cc/306" />
          </Tooltip>
          <Tooltip title="Trung">
            <Avatar alt="Trung" src="https://i.pravatar.cc/307" />
          </Tooltip>
          <Tooltip title="Trung">
            <Avatar alt="Trung" src="https://i.pravatar.cc/308" />
          </Tooltip>

        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
