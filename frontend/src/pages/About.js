import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaShippingFast, FaHeadset, FaShieldAlt, FaRegHandshake, FaLaptop, FaMobileAlt, 
         FaUsers, FaGlobe, FaAward, FaStore } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './About.css';

function About() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    return (
        <div className="about-page">
            <div className="hero-section">
                <Container>
                    <motion.h1 {...fadeIn}>
                        Welcome to E-Shop
                    </motion.h1>
                    <motion.p 
                        {...fadeIn}
                        transition={{ delay: 0.2 }}
                        className="hero-subtitle"
                    >
                        Your Premier Destination for Premium Electronics
                    </motion.p>
                </Container>
            </div>

            <Container>
                <section className="mission-section">
                    <Row className="align-items-center">
                        <Col md={6}>
                            <motion.div 
                                className="mission-content"
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                            >
                                <h2>Our Mission</h2>
                                <p>
                                    At E-Shop, we're dedicated to bringing you the latest and most innovative 
                                    technology products. Our mission is to provide high-quality electronics 
                                    while ensuring an exceptional shopping experience for our customers.
                                </p>
                                <div className="tech-icons">
                                    <FaLaptop />
                                    <FaMobileAlt />
                                </div>
                            </motion.div>
                        </Col>
                        <Col md={6}>
                            <motion.div 
                                className="mission-image"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                            >
                                <img 
                                    src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3"
                                    alt="Tech workspace"
                                />
                            </motion.div>
                        </Col>
                    </Row>
                </section>

                <section className="timeline-section">
                    <h2>Our Journey</h2>
                    <div className="timeline">
                        {[
                            { year: '2020', title: 'Founded', description: 'Started as a small online electronics store' },
                            { year: '2021', title: 'Expansion', description: 'Expanded product range and reached 10K+ customers' },
                            { year: '2022', title: 'Innovation', description: 'Launched mobile app and same-day delivery' },
                            { year: '2023', title: 'Growth', description: 'Expanded to international markets' }
                        ].map((milestone, index) => (
                            <motion.div 
                                className="timeline-item"
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                viewport={{ once: true }}
                            >
                                <div className="timeline-content">
                                    <h3>{milestone.year}</h3>
                                    <h4>{milestone.title}</h4>
                                    <p>{milestone.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section className="features-section">
                    <h2>Why Choose Us</h2>
                    <Row>
                        {[
                            {
                                icon: <FaShippingFast />,
                                title: "Fast Delivery",
                                description: "Quick and reliable shipping to your doorstep"
                            },
                            {
                                icon: <FaHeadset />,
                                title: "24/7 Support",
                                description: "Round-the-clock customer service assistance"
                            },
                            {
                                icon: <FaShieldAlt />,
                                title: "Secure Shopping",
                                description: "Safe and protected online transactions"
                            },
                            {
                                icon: <FaRegHandshake />,
                                title: "Quality Guarantee",
                                description: "Only authentic and high-quality products"
                            }
                        ].map((feature, index) => (
                            <Col md={3} key={index}>
                                <motion.div 
                                    className="feature-card"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -10 }}
                                >
                                    <div className="feature-icon">{feature.icon}</div>
                                    <h3>{feature.title}</h3>
                                    <p>{feature.description}</p>
                                </motion.div>
                            </Col>
                        ))}
                    </Row>
                </section>

                <section className="team-section">
                    <h2>Our Leadership</h2>
                    <Row>
                        {[
                            { 
                                name: 'Bisrate Tadesse', 
                                role: 'CEO & Founder', 
                                icon: <FaUsers />,
                                description: 'Leading our vision and strategic direction'
                            },
                            { 
                                name: 'Karmel Tesfaye', 
                                role: 'CTO', 
                                icon: <FaLaptop />,
                                description: 'Driving technological innovation'
                            },
                            { 
                                name: 'Sisay Tadesse', 
                                role: 'Operations Head', 
                                icon: <FaStore />,
                                description: 'Managing day-to-day operations'
                            }
                        ].map((member, index) => (
                            <Col md={4} key={index}>
                                <motion.div 
                                    className="team-card"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="team-icon">{member.icon}</div>
                                    <h3>{member.name}</h3>
                                    <p className="team-role">{member.role}</p>
                                    <p className="team-description">{member.description}</p>
                                </motion.div>
                            </Col>
                        ))}
                    </Row>
                </section>

                <section className="stats-section">
                    <Row>
                        {[
                            { number: "1000+", label: "Products" },
                            { number: "50K+", label: "Customers" },
                            { number: "99%", label: "Satisfaction" },
                            { number: "24/7", label: "Support" }
                        ].map((stat, index) => (
                            <Col md={3} key={index}>
                                <motion.div 
                                    className="stat-card"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <h2>{stat.number}</h2>
                                    <p>{stat.label}</p>
                                </motion.div>
                            </Col>
                        ))}
                    </Row>
                </section>

                <section className="awards-section">
                    <h2>Recognition & Awards</h2>
                    <Row>
                        {[
                            { title: 'Best E-commerce Platform', year: '2023', icon: <FaAward /> },
                            { title: 'Customer Service Excellence', year: '2022', icon: <FaHeadset /> },
                            { title: 'Global Reach Award', year: '2023', icon: <FaGlobe /> }
                        ].map((award, index) => (
                            <Col md={4} key={index}>
                                <motion.div 
                                    className="award-card"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="award-icon">{award.icon}</div>
                                    <h3>{award.title}</h3>
                                    <p>{award.year}</p>
                                </motion.div>
                            </Col>
                        ))}
                    </Row>
                </section>

                <section className="cta-section">
                    <motion.div 
                        className="cta-content"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h2>Ready to Start Shopping?</h2>
                        <p>Explore our wide range of premium electronics</p>
                        <Button as={Link} to="/products" className="cta-button">
                            Shop Now
                        </Button>
                    </motion.div>
                </section>
            </Container>
        </div>
    );
}

export default About; 