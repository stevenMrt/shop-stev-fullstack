import React from 'react';
import { FaUser, FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaCode, FaRocket, FaStar } from 'react-icons/fa';

const ProfilePage = ({ favorites = [] }) => {
  const profile = {
    name: 'Steven Martínez',
    role: 'Desarrollador Full Stack',
    email: 'stevenmartinezh2@gmail.com',
    phone: '+57 312 7277386',
    location: 'Colombia 🇨🇴',
    github: 'https://github.com/stevenMrt',
    linkedin: '#',
    bio: 'Creador de Shop-Stev. Apasionado por el desarrollo web y la creación de experiencias digitales únicas. Me encanta transformar ideas en código.',
    skills: ['React', 'JavaScript', 'Node.js', 'CSS', 'Git', 'MongoDB', 'Express'],
    experience: '2+ años',
    projects: '2+',
    clients: '1',
    joined: 'Enero 2023'
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <FaUser size={60} />
          </div>
          <div className="profile-info">
            <h1>{profile.name}</h1>
            <p className="profile-role">{profile.role}</p>
            <p className="profile-bio">{profile.bio}</p>
          </div>
          <div className="social-links">
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href={`mailto:${profile.email}`}>
              <FaEnvelope />
            </a>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-details">
            <h3>Sobre el Desarrollador</h3>
            <div className="profile-data">
              <div className="contact-info">
                <div className="contact-item">
                  <FaEnvelope className="contact-icon" />
                  <span>{profile.email}</span>
                </div>
                <div className="contact-item">
                  <FaPhone className="contact-icon" />
                  <span>{profile.phone}</span>
                </div>
                <div className="contact-item">
                  <FaMapMarkerAlt className="contact-icon" />
                  <span>{profile.location}</span>
                </div>
                <div className="contact-item">
                  <FaCalendarAlt className="contact-icon" />
                  <span>Desde {profile.joined}</span>
                </div>
              </div>
              
              <div className="stats-grid">
                <div className="mini-stat">
                  <FaCode className="mini-icon" />
                  <div>
                    <span className="mini-number">{profile.experience}</span>
                    <span className="mini-label">Experiencia</span>
                  </div>
                </div>
                <div className="mini-stat">
                  <FaRocket className="mini-icon" />
                  <div>
                    <span className="mini-number">{profile.projects}</span>
                    <span className="mini-label">Proyectos</span>
                  </div>
                </div>
                <div className="mini-stat">
                  <FaStar className="mini-icon" />
                  <div>
                    <span className="mini-number">{profile.clients}</span>
                    <span className="mini-label">Clientes</span>
                  </div>
                </div>
              </div>
              
              <div className="skills-section">
                <h4><FaCode /> Tecnologías</h4>
                <div className="skills">
                  {profile.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default ProfilePage;