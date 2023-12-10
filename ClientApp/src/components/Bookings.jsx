import React, { useEffect, useState } from 'react';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import BookEditImage from '../Photos/bookings.jpg';
import { BookAppointment, DoctorServices } from '../services/DoctorServices';
import { Alert, Col, Container, Form, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export function Bookings() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [doctors, setDoctors] = useState([]);

  async function populateDoctorState() {
    try {
      const result = await DoctorServices();
      console.log(result);
      if (result.status == 401) {
        setIsLoggedIn(false);
      }
      else {
        setIsLoggedIn(true);
        setDoctors(result.data.Doctor);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    populateDoctorState();
  }, []);

  const [bookingDate, setBookingDate] = useState("");

  const handleBookingDateChange = (e) => {
    setBookingDate(e.target.value);
  }

  const handleSubmit = (dctr_id) => {
    const booking = { doctor_id: dctr_id, date: bookingDate }
    const result = BookAppointment(booking);
    
    alert("Appointment booked successfully");
    navigate("/myprofile");

  }


  return (
    <>
      <Container>

        <Table className="mt-4">
          <thead>
            <tr>
              <th>Name</th>
              <th>Area</th>
              <th>Profile</th>
              <th>Enter date</th>
              <th>Book Now</th>
            </tr>
          </thead>
          <tbody>
            {
              doctors.map((d) => {
                return (
                  <tr>
                    <td>{d.name}</td>
                    <td>{d.area}</td>
                    <td>{d.profile}</td>

                    <td>
                      <input type="date" name="date" onChange={handleBookingDateChange} />
                    </td>
                    <td>
                      <Button variant="primary" onClick={() => handleSubmit(d.name)}>Book Now</Button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
        <Col lg={4}>
          {isLoggedIn ? null : <Alert variant="danger">Please Login First</Alert>}
        </Col>
      </Container>
    </>
  );
}
