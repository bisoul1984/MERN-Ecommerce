import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './Contact.css';

function Contact() {
    return (
        <Container className="contact-page py-5">
            <h1 className="text-center mb-5">Contact Us</h1>
            <Row className="justify-content-center">
                <Col md={4} className="mb-4">
                    <Card className="contact-card h-100">
                        <Card.Body className="text-center">
                            <div className="icon-wrapper mb-3">
                                <FaPhone className="contact-icon" />
                            </div>
                            <Card.Title>Phone</Card.Title>
                            <Card.Text>
                                <a href="tel:+251967044111" className="contact-link">
                                    +251 967 044 111
                                </a>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-4">
                    <Card className="contact-card h-100">
                        <Card.Body className="text-center">
                            <div className="icon-wrapper mb-3">
                                <FaEnvelope className="contact-icon" />
                            </div>
                            <Card.Title>Email</Card.Title>
                            <Card.Text>
                                <a href="mailto:fikertetadesse1403@gmail.com" className="contact-link">
                                    fikertetadesse1403@gmail.com
                                </a>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-4">
                    <Card className="contact-card h-100">
                        <Card.Body className="text-center">
                            <div className="icon-wrapper mb-3">
                                <FaMapMarkerAlt className="contact-icon" />
                            </div>
                            <Card.Title>Location</Card.Title>
                            <Card.Text>
                                Bole, Addis Ababa<br />
                                Ethiopia
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mt-5">
                <Col md={12}>
                    <Card className="map-card">
                        <Card.Body>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5785838491183!2d38.79169231478386!3d9.010773393533602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d49!2sBole%2C%20Addis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1635000000000!5m2!1sen!2sus"
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Location Map"
                            ></iframe>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Contact; 