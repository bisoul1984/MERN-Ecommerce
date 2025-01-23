import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCode } from 'react-icons/fa';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col md={6}>
                        <h5>Contact Us</h5>
                        <div className="contact-info">
                            <p>
                                <FaPhone className="icon" />
                                <a href="tel:+251967044111">+251 967 044 111</a>
                            </p>
                            <p>
                                <FaEnvelope className="icon" />
                                <a href="mailto:fikertetadesse1403@gmail.com">
                                    fikertetadesse1403@gmail.com
                                </a>
                            </p>
                            <p>
                                <FaMapMarkerAlt className="icon" />
                                Bole, Addis Ababa, Ethiopia
                            </p>
                        </div>
                    </Col>
                    <Col md={6}>
                        <h5>Quick Links</h5>
                        <ul className="footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/products">Products</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </Col>
                </Row>
                <hr />
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} TechStore. All rights reserved.</p>
                    <div className="developer-signature">
                        <FaCode className="code-icon" />
                        <span>Developed with passion by </span>
                        <a 
                            href="https://www.bisrattadesse.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="developer-link"
                        >
                            Bisrat Tadesse
                        </a>
                    </div>
                </div>
            </Container>
        </footer>
    );
}

export default Footer; 