import React, { useEffect, useState } from 'react';
import { useAxios } from '../../index';
import axios from 'axios';
import API_URL from "../../../config";

const AlumniForm = ({ closeModal }) => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [barangays, setBarangays] = useState([]);
  const [alumniIdExists, setAlumniIdExists] = useState(false);
  const [selectedAlumniId, setSelectedAlumniId] = useState('');

  const { data: countriesData, isLoading: countriesLoading, error: countriesError } = useAxios('api/address/countries/');
  const { data: regionsData, isLoading: regionsLoading, error: regionsError } = useAxios(`api/address/countries/${selectedCountry}/regions/`);
  const { data: provincesData, isLoading: provincesLoading, error: provincesError } = useAxios(`api/address/regions/${selectedRegion}/provinces/`);
  const { data: citiesData, isLoading: citiesLoading, error: citiesError } = useAxios(`api/address/provinces/${selectedProvince}/cities/`);
  const { data: barangaysData, isLoading: barangaysLoading, error: barangaysError } = useAxios(`api/address/cities/${selectedCity}/barangays/`);

  useEffect(() => {
    if (!selectedCountry && countriesData.length > 0) {
      setCountries(countriesData);
    }
  }, [countriesData, selectedCountry]);

  useEffect(() => {
    if (selectedCountry && !selectedRegion && regionsData.length > 0) {
      setRegions(regionsData);
    }
  }, [regionsData, selectedCountry, selectedRegion]);

  useEffect(() => {
    if (selectedRegion && !selectedProvince && provincesData.length > 0) {
      setProvinces(provincesData);
    }
  }, [provincesData, selectedRegion, selectedProvince]);

  useEffect(() => {
    if (selectedProvince && !selectedCity && citiesData.length > 0) {
      setCities(citiesData);
    }
  }, [citiesData, selectedProvince, selectedCity]);

  useEffect(() => {
    if (selectedCity && barangaysData.length > 0) {
      setBarangays(barangaysData);
    }
  }, [barangaysData, selectedCity]);

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setSelectedCountry(selectedCountry);
    setSelectedRegion('');
    setSelectedProvince('');
    setSelectedCity('');
    setRegions([]);
    setProvinces([]);
    setCities([]);
    setBarangays([]);
  };

  const handleRegionChange = (event) => {
    const selectedRegion = event.target.value;
    setSelectedRegion(selectedRegion);
    setSelectedProvince('');
    setSelectedCity('');
    setProvinces([]);
    setCities([]);
    setBarangays([]);
  };

  const handleProvinceChange = (event) => {
    const selectedProvince = event.target.value;
    setSelectedProvince(selectedProvince);
    setSelectedCity('');
    setCities([]);
    setBarangays([]);
  };

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setSelectedCity(selectedCity);
    setBarangays([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (alumniIdExists) {
      console.log('Alumni ID already exists.');
      alert('Alumni ID already exists.');
    } else {
      const formData = {
        fname: e.target.fname.value,
        lname: e.target.lname.value,
        mi: e.target.mi.value,
        suffix: e.target.suffix.value,
        contact_number: e.target.contact_number.value,
        sex: e.target.sex.value,
        religion: e.target.religion.value,
        alumni_id: e.target.alumni_id.value,
        marital_status: e.target.marital_status.value,
        date_of_birth: e.target.date_of_birth.value,
        country: e.target.country.value,
        region: e.target.region.value,
        province: e.target.province.value,
        city: e.target.city.value,
        barangay: e.target.barangay.value,
      };

      axios
        .post(`${API_URL}api/alumni-form/`, formData)
        .then((response) => {
          console.log('Alumni profile created successfully');
          // Handle any further actions or UI updates after successful submission
        })
        .catch((error) => {
          console.error('Form submission failed:', error);
          if (error.response) {
            console.log('Server Error:', error.response.data);
          } else if (error.request) {
            console.log('Request Error:', error.request);
          } else {
            console.log('Error:', error.message);
          }
        });
    }
  };

  const checkAlumniId = (alumniId) => {
    axios
      .get(`${API_URL}api/check-alumni-id/${alumniId}/`)
      .then((res) => {
        setAlumniIdExists(res.data.exists);
      })
      .catch((error) => {
        console.error('Alumni ID check failed:', error);
      });
  };

  const handleAlumniIdChange = (event) => {
    const alumniId = event.target.value;
    setSelectedAlumniId(alumniId);
    checkAlumniId(alumniId);
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div className="relative top-20 mx-auto p-5 border w-3/4 shadow-lg rounded-md bg-white">
          <form onSubmit={handleSubmit} className="mt-3">
            <div className="mt-2 px-7 py-3">

              <div>
                <h1 className='text-lg font-semibold'>Alumni Form</h1>
                <p>Fill the registration form below keenly to submit the alumni form.</p>
              </div>
              <hr />

              <div className='mt-6' >

                <div className='flex'>
                  <h1 className='mr-[50px] font-bold'>Alumni ID</h1>
                  <input required type="text" name="alumni_id" id="alumni_id" value={selectedAlumniId} onChange={handleAlumniIdChange} className="h-8 border-gray-400 w-[12em]"/>
                  {alumniIdExists && <span className="text-red-500 ml-[20px]">Alumni ID already exists.</span>}
                </div>

                <div className='flex mt-6'>
                  <h1 className='mr-20 font-bold'>Name</h1>
                  <div className='flex flex-col'>
                    <input required type="text" name="fname" id="fname" maxlength='50' className="h-8 border-gray-400 w-48 mr-5" />
                    <label htmlFor="fname" className='text-gray-400 text-sm'>First Name</label>
                  </div>
                  <div className='flex flex-col'>
                    <input required type="text" name="lname" id="lname" maxlength='50' className="h-8 border-gray-400 w-48 mr-5" />
                    <label htmlFor="lname" className='text-gray-400 text-sm'>Last Name</label>
                  </div>
                  <div className='flex flex-col'>
                    <input required type="text" name="mi" id="mi" maxlength='1' className="h-8 border-gray-400 w-16 mr-5" />
                    <label htmlFor="mi" className='text-gray-400 text-sm'>M.I.</label>
                  </div>
                  <div className='flex flex-col'>
                    <input required type="text" name="suffix" id="suffix" maxlength='4' className="h-8 border-gray-400 w-16" />
                    <label htmlFor="suffix" className='text-gray-400 text-sm'>Suffix</label>
                  </div>
                </div>

                <div className='flex mt-4'>
                  <h1 className='mr-[83px] font-bold'>Email</h1>
                  <input required type="text" name="email" id="email" className="h-8 border-gray-400 w-[18em] mr-[83px]" placeholder='ex: thomas.shelby@example.com'/>
                  <h1 className='mr-[72px] font-bold'>Phone Number</h1>
                  <input required type="tel" name="contact_number" id="contact_number" className="h-8 border-gray-400 w-[12em]" pattern="09\d{9}" title="Please enter a valid phone number starting with 09 followed by 9 more digits." placeholder='ex: 09******235'/>
                </div>

                <div className='flex mt-6'>
                  <label htmlFor='sex' className='mr-[70px] font-bold'>Gender</label>
                  <select name="sex" id="sex" className='h-8 text-sm py-0'>
                    <option disabled selected>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>

                  <h1 className='mr-[8em] ml-[14em] font-bold'>Religion</h1>
                  <input required type="tel" name="religion" id="religion" className="h-8 border-gray-400 w-[12em]"/>
                </div>

                <div className='flex mt-6'>
                  <h1 className='mr-[16px] font-bold'>Marital Status</h1>
                  <input required type="text" name="marital_status" id="marital_status" className="h-8 border-gray-400 w-[15em] mr-[8.1em]"/>
                  <h1 className='mr-[7.3em] font-bold'>Birthdate</h1>
                  <input required type="date" name="date_of_birth" id="date_of_birth" className="h-8 border-gray-400 w-[12em]"/>
                </div>

              </div>


              <div className="grid-cols-5 grid-rows-5 gap-4 mt-5">
                <label htmlFor="address" className="justify-start">
                  Address
                </label>
                <div className="" id="address">
                  <select name="country" onChange={handleCountryChange} className="w-1/5 dark:bg-gray-700 dark:text-white">
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country.id} value={country.id}>
                        {country.country_name}
                      </option>
                    ))}
                  </select>

                  <select name="region" onChange={handleRegionChange} className="w-1/5 dark:bg-gray-700 dark:text-white">
                    <option value="">Select Region</option>
                    {regions.map((region) => (
                      <option key={region.id} value={region.id}>
                        {region.region_name}
                      </option>
                    ))}
                  </select>

                  <select name="province" onChange={handleProvinceChange} className="w-1/5 dark:bg-gray-700 dark:text-white">
                    <option value="">Select Province</option>
                    {provinces.map((province) => (
                      <option key={province.id} value={province.id}>
                        {province.province_name}
                      </option>
                    ))}
                  </select>

                  <select name="city" onChange={handleCityChange} className="w-1/5 dark:bg-gray-700 dark:text-white">
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.city_name}
                      </option>
                    ))}
                  </select>

                  <select name="barangay" className="w-1/5 dark:bg-gray-700 dark:text-white">
                    <option value="">Select Barangay</option>
                    {barangays.map((barangay) => (
                      <option key={barangay.id} value={barangay.id}>
                        {barangay.barangay_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="items-center px-4 py-3">
              <button onClick={handleCancel} className="px-4 py-2 bg-orange-500 text-white text-base font-medium rounded-md w-1/5 mr-10 shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-1/5 shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AlumniForm;
