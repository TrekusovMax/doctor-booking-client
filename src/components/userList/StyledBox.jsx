import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
const StyledBox = styled(Box)(({ theme }) => ({
  height: '100vh',
  width: '1000px',
  marginX: 'auto',

  '& .MuiDataGrid-cell:hover': {
    color: 'primary.main',
  },
  '& .MuiDataGrid-columnSeparator': {
    display: 'none',
  },
  '& .isAdmin': {
    color: '#ff0000',
  },
  '& .isUser': {
    color: '#00f',
  },
}))
export default StyledBox
