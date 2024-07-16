import "./App.css"
import Calendar from "./components/Calendar"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Calendar/>
        </LocalizationProvider>
      </header>
    </div>
  )
}

export default App
