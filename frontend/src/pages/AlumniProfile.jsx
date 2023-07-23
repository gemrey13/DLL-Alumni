import React, { useState, useEffect } from 'react';
import { Navbar, Breadcrumb, ProfileLeft, ProfileRight} from '../index';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import API_URL from "../../config";


const AlumniProfile = () => {
    const [alumniData, setAlumniData] = useState(null);
    const { alumniId } = useParams();

    useEffect(() => {
      try {
        axios.get(`${API_URL}api/alumni-profile/${alumniId}/`)
        .then((response) => {
            setAlumniData(response.data);
        })
        } catch (error) {
        console.error('Error fetching alumni data:', error);
      }
  }, [alumniId]);


    console.log(alumniData)
    return (
        <>
            <div className='text-black dark:text-white ml-4 sm:mr-4 my-20 sm:ml-24 sm:my-24'>
                <Navbar />
                <Breadcrumb url='Tracer' url2='Profile'/>

                <div className='flex'>                    

                    <ProfileLeft />
                    <ProfileRight alumniData={alumniData}/>
                </div>
            </div>
        </>
    )
};

export default AlumniProfile;