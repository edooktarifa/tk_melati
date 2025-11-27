import React from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Profile from './components/Profile';
import TeacherProfiles from './components/TeacherProfiles';
import VisionMission from './components/VisionMission';
import Activities from './components/Activities';
import Testimonials from './components/Testimonials';
import MapSection from './components/MapSection';

function App() {
  return (
    <Layout>
      <Hero />
      <Profile />
      <TeacherProfiles />
      <VisionMission />
      <Activities />
      <Testimonials />
      <MapSection />
    </Layout>
  );
}

export default App;
