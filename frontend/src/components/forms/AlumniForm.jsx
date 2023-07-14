import React, { useEffect, useState } from 'react';
import { useAxios } from '../../index';
import axios from 'axios';


const AlumniForm = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [barangays, setBarangays] = useState([]);

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

    // Create a JavaScript object containing the form data
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

    // Make an HTTP POST request to your Django backend
    axios.post('/api/your-endpoint', formData)
      .then(response => {
        // Handle successful response
        console.log('Form submitted successfully');
      })
      .catch(error => {
        // Handle error
        console.error('Form submission failed:', error);
      });
  };


  return (
    <>

    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">

      <div className="relative top-20 mx-auto p-5 border w-3/4 shadow-lg rounded-md bg-white">

        <form onSubmit={handleSubmit} className="mt-3 text-center">
          <div className="mt-2 px-7 py-3">

            <div className='rid grid-cols-5 grid-rows-5 gap-4'>
              <div className='flex flex-nowrap text-left'>
                <label htmlFor="fname" className='w-1/4'>First Name</label>
                <label htmlFor="lname" className='w-1/4'>Last Name</label>
                <label htmlFor="mi" className='w-1/4'>Middle Initial</label>
                <label htmlFor="suffix" className='w-1/4'>Suffix</label>
              </div>
              <div className="row-start-2">
                <input type="text" name='fname' id="fname" className='h-10 w-1/4'/>
                <input type="text" name='lname' id="lname" className='h-10 w-1/4'/>
                <input type="text" name='mi' id="mi" className='h-10 w-1/4'/>
                <input type="text" name='suffix' id="suffix" className='h-10 w-1/4'/>
              </div>
            </div>

            <div className='rid grid-cols-5 grid-rows-5 gap-4 mt-6'>
              <div className='flex flex-nowrap text-left'>
                <label htmlFor="contact_number" className='w-2/6'>Contact Number</label>
                <label htmlFor="sex" className='w-2/6'>Sex</label>
                <label htmlFor="religion" className='w-2/6'>Religion</label>
              </div>
              <div className="row-start-2">
                <input type="text" name='contact_number' id="contact_number" className='h-10 w-2/6'/>
                <input type="text" name='sex' id="sex" className='h-10 w-2/6'/>
                <input type="text" name='religion' id="religion" className='h-10 w-2/6'/>
              </div>
            </div>

            <div className='rid grid-cols-5 grid-rows-5 gap-4 mt-6'>
              <div className='flex flex-nowrap text-left'>
                <label htmlFor="alumni_id" className='w-2/6'>Alumni ID</label>
                <label htmlFor="marital_status" className='w-2/6'>Marital Status</label>
                <label htmlFor="date_of_birth" className='w-2/6'>Date of Birth</label>
              </div>
              <div className="row-start-2">
                <input type="text" name='alumni_id' id="alumni_id" className='h-10 w-2/6'/>
                <input type="text" name='marital_status' id="marital_status" className='h-10 w-2/6'/>
                <input type="date" name='date_of_birth' id="date_of_birth" className='h-10 w-2/6'/>
              </div>
            </div>


            <div className="grid-cols-5 grid-rows-5 gap-4 mt-5">
              <label htmlFor='address' className='justify-start'>Address</label>
              <div className="" id='address'>

                <select name='country' onChange={handleCountryChange} className="w-1/5 dark:bg-gray-700 dark:text-white">
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.country_name}
                    </option>
                  ))}
                </select>

                <select name='region' onChange={handleRegionChange} className="w-1/5 dark:bg-gray-700 dark:text-white">
                  <option value="">Select Region</option>
                  {regions.map((region) => (
                    <option key={region.id} value={region.id}>
                      {region.region_name}
                    </option>
                  ))}
                </select>

                <select name='province' onChange={handleProvinceChange} className="w-1/5 dark:bg-gray-700 dark:text-white">
                  <option value="">Select Province</option>
                  {provinces.map((province) => (
                    <option key={province.id} value={province.id}>
                      {province.province_name}
                    </option>
                  ))}
                </select>

                <select name='city' onChange={handleCityChange} className="w-1/5 dark:bg-gray-700 dark:text-white">
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.city_name}
                    </option>
                  ))}
                </select>

                <select name='barangay' className="w-1/5 dark:bg-gray-700 dark:text-white">
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
            <button className="px-4 py-2 bg-orange-500 text-white text-base font-medium rounded-md w-1/5 mr-10 shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300">
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
