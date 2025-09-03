import React from 'react';
import Banner from '../Banner/Banner';
import ServiceList from '../Services/ServiceList';
import LogoMarquee from '../LogoMarquee/LogoMarquee';
import Benefits from '../Benefits/Benefits';
import Merchant from '../Merchant/Merchant';
import Accordion from '../Accordion/Accordion';
import Work from '../Work/Work';

const Home = () => {
    return (
        <div className='mt-4'>
           <Banner/>
           <ServiceList></ServiceList>
           <LogoMarquee></LogoMarquee>
           <Benefits></Benefits>
           <Merchant></Merchant>
           <Accordion></Accordion>
           <Work></Work>

        </div>
    );
};

export default Home;