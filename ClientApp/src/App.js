import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"; 
import { NavigationBar } from "./components/NavigationBar";
import { CalmConnect } from "./components/CalmConnect";
import { Footer } from './components/Footer';
import { Signup } from './components/Signup';
import { Profile } from './components/Profile';
import About from './components/About';
import { Signin } from './components/Signin';
import {Bookings} from './components/Bookings';
import { PrivateRoute } from './components/PrivateRoute';
import {ContactUs} from './components/ContactUs';


function App() {
  return (
    <BrowserRouter>
      <NavigationBar></NavigationBar>
      <Routes>
          <Route path="/" element={<CalmConnect/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/myprofile" element={<PrivateRoute><Profile/></PrivateRoute>}></Route>
          <Route path="/about" element={<About/>}></Route>
          <Route path="/signin" element={<Signin/>}></Route>
          <Route path="/contact" element={<ContactUs/>}></Route>
          <Route path="/book-appointment" element={<PrivateRoute><Bookings/></PrivateRoute>}></Route>

      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
