import { Routes, Route } from "react-router-dom";
import { ThemeModeContext, useMode } from "./themes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import NavBar from "./scenes/global/Navbar";
import SideMenu from "./scenes/global/SideMenu";
/* import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import Calendar from "./scenes/calendar/calendar"; */
import { useState } from "react";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ThemeModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <SideMenu isSidebar={isSidebar} />
          <main className="content">
            <NavBar setIsSidebar={setIsSidebar} />
            <Routes>
              {/*<Route path="/" element={<Dashboard />} />
             <Route path="/team" element={<Team />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/form" element={<Form />} />
            <Route path="/bar" element={<Bar />} />
            <Route path="/pie" element={<Pie />} />
            <Route path="/line" element={<Line />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/geography" element={<Geography />} /> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export default App;
