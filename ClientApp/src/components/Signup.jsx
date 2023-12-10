import { Alert, Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { saveUser } from '../services/UserServices';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: "", us_name: "", email: "", password: "", dob: new Date("2020-03-25"), gender: "", city: "", state: "", phone: "" });

    const [isSubmitted, setIsSubmitted] = useState(false);

    //cp
    const [errors, setErrors] = useState({
        username: '', us_name: '', email: '', password: '', dob: '', gender: '', city: '', state: '', phone: '',
    });
    //

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {       //cp
            try {
                const result = await saveUser(formData);
                setFormData({ username: "", us_name: "", email: "", password: "", dob: "", gender: "", city: "", state: "", phone: "" });
                setIsSubmitted(true);
                setTimeout(() => {
                    setIsSubmitted(false);
                    navigate("/signin");
                }, 1500);
                console.log(result.message);
            } catch (error) {
                console.log(error);
            }
        }
    }
    //cp
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateField = (fieldName, value) => {
        let errorMessage = '';

        switch (fieldName) {
            case 'username':
                if (value.trim().length < 4) {
                    errorMessage = 'Username must be at least 4 characters';
                } else if (/\s/.test(value)) {
                    errorMessage = 'Username should not contain spaces';
                }
                break;
            case 'us_name':
                if (value.trim().length < 4) {
                    errorMessage = 'Name must be at least 4 characters';
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    errorMessage = 'Invalid email address';
                }
                break;
            case 'phone':
                const phoneRegex = /^\d{10}$/;
                if (!phoneRegex.test(value)) {
                    errorMessage = 'Phone number must be 10 digits';
                }
                break;
            case 'password':
                const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
                if (!passwordRegex.test(value)) {
                    errorMessage = 'Password must contain at least 6 characters, one uppercase letter, one lowercase letter, and one digit';
                }
                break;
            case 'city':
            case 'state':
                const Regex=/^[a-zA-Z\s]+$/;
                if (!Regex.test(value)) {
                    errorMessage = 'Only letters and spaces are allowed';
                }
                break;
            default:
                break;
        }

        setErrors({
            ...errors,
            [fieldName]: errorMessage,
        });
    };

    const validateForm = () => {
        let isValid = true;

        Object.keys(formData).forEach((fieldName) => {
            const value = formData[fieldName];
            validateField(fieldName, value);
            if (errors[fieldName]) {
                isValid = false;
            }
        });

        return isValid;
    };
    //

    return (
        <Container >
            <Col md={{ span: 3, offset: 5 }}>
                <h3 >Sign Up Here !</h3>
            </Col>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={isSubmitted ? formData.us_name : null} name="us_name" placeholder="Enter full name" onChange={handleChange} onBlur={() => validateField('us_name', formData.us_name)} required />
                            {errors.us_name && <span style={{ color: 'red' }}>{errors.us_name}</span>}
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" value={isSubmitted ? formData.email : null} name="email" placeholder="Enter email" onChange={handleChange} onBlur={() => validateField('email', formData.email)} required />
                            {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form.Group className="mb-3">
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control type="text" value={isSubmitted ? formData.phone : null} name="phone" placeholder="Enter Contact Number" onChange={handleChange} onBlur={() => validateField('phone', formData.phone)} required />
                            {errors.phone && <span style={{ color: 'red' }}>{errors.phone}</span>}
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form.Group className="mb-3">
                            <Form.Label>Pick a Username</Form.Label>
                            <Form.Control type="text" value={isSubmitted ? formData.username : null} name="username" placeholder="Enter Username" onChange={handleChange} onBlur={() => validateField('username', formData.username)} required />
                            {errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={isSubmitted ? formData.password : null} name="password" placeholder="Password" onChange={handleChange} onBlur={() => validateField('password', formData.password)} required />
                            {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Date Of Birth</Form.Label>
                            <Form.Control type="date" name="dob" value={isSubmitted ? formData.dob : null} onChange={handleChange} onBlur={() => validateField('dob', formData.dob)} required />
                            {errors.dob && <span style={{ color: 'red' }}>{errors.dob}</span>}
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form.Check
                            type="radio"
                            label="Male"
                            name="gender"
                            value="male"
                            onChange={handleChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Female"
                            name="gender"
                            value="female"
                            onChange={handleChange}
                        />
                        {errors.gender && <span style={{ color: 'red' }}>{errors.gender}</span>}
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form.Group className="mb-3">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" name="city" value={isSubmitted ? formData.city : null} placeholder="Enter the city you live in" onChange={handleChange} onBlur={() => validateField('city', formData.city)} required />
                            {errors.city && <span style={{ color: 'red' }}>{errors.city}</span>}
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form.Group className="mb-3">
                            <Form.Label>State</Form.Label>
                            <Form.Control type="text" name="state" value={isSubmitted ? formData.state : null} placeholder="Enter the state you live in" onChange={handleChange} onBlur={() => validateField('state', formData.state)} required />
                            {errors.state && <span style={{ color: 'red' }}>{errors.state}</span>}
                        </Form.Group>
                    </Col>
                </Row>
                <Col md={{ span: 3, offset: 6 }}>
                    <Button variant="primary" type="submit">
                        Sign Up
                    </Button>
                </Col>
            </Form>
            <Row className="mt-3">
                <Col md={{ span: 4, offset: 4 }}>
                    {isSubmitted ? <Alert variant="success">Sign Up Successfully Completed!</Alert> : null}
                </Col>
            </Row>
        </Container>
    );
}