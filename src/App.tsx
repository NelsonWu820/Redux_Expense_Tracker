import "./App.css"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import Calendar from "./components/Calendar"
import PriceInput from "./components/PriceInput"
import Total from "./components/Total"

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Calendar/>
          <PriceInput/>
          <Total />
        </LocalizationProvider>
      </header>
    </div>
  )
}

export default App
