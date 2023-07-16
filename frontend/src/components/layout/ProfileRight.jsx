import React, { useState, useEffect } from 'react';
import { useAxios } from '../../index';

const ProfileRight = () => {
  const [tab, setTab] = useState(1);

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

  return (
    <>
      <div className="w-2/3">
        Right Side
        <div className="flex justify-between">
          <div>
            <h1 className="text-3xl">
              Gem Rey B. Ranola<sup className="text-sm"> | Philippines</sup>
            </h1>
            <p className="text-blue-600">Software Developer</p>
          </div>
          <div className="flex flex-nowrap">
            <h1 className="mr-6">Save</h1>
            <h1>Delete</h1>
          </div>
        </div>
        <div className="flex mt-10 text-lg">
          <h5 className="mr-10">Send Message</h5>
          <h5 className="mr-10">Facebook</h5>
          <h5>Twitter</h5>
        </div>
        <div className="flex mt-12 ">
          <h1 className="mr-6" onClick={() => setTab(1)}>
            Personal Info
          </h1>
          <h1 className="mr-6" onClick={() => setTab(2)}>
            Educational Attainment
          </h1>
          <h1 className="mr-6" onClick={() => setTab(3)}>
            Job Record
          </h1>
          <h1 onClick={() => setTab(4)}>Account</h1>
        </div>
        <hr />

        {tab === 1 && (
          <div>
            <h5>Basic Information</h5>
            <label htmlFor="fname" className="w-2/6">
              First Name
            </label>
            <input type="text" name="fname" id="fname" className="h-10 w-2/6" />

            <label htmlFor="lname" className="w-2/6">
              Last Name
            </label>
            <input type="text" name="lname" id="lname" className="h-10 w-2/6" />

            <label htmlFor="mi" className="w-2/6">
              M.I.
            </label>
            <input type="text" name="mi" id="mi" className="h-10 w-2/6" />

            <label htmlFor="suffix" className="w-2/6">
              Suffix
            </label>
            <input type="text" name="suffix" id="suffix" className="h-10 w-2/6" />

            <label htmlFor="gender" className="w-2/6">
              Gender
            </label>
            <input type="text" name="gender" id="gender" className="h-10 w-2/6" />

            <label htmlFor="date_of_birth" className="w-2/6">
              Birthdate
            </label>
            <input type="date" name="date_of_birth" id="date_of_birth" className="h-10 w-2/6" />

            <label htmlFor="marital_status" className="w-2/6">
              Martial Status
            </label>
            <input type="text" name="marital_status" id="marital_status" className="h-10 w-2/6" />

            <label htmlFor="religion" className="w-2/6">
              Religion
            </label>
            <input type="text" name="religion" id="religion" className="h-10 w-2/6" />

            <hr />

            <h5>Contact Information</h5>
            <label htmlFor="contact_number" className="w-2/6">
              Phone Number
            </label>
            <input type="text" name="contact_number" id="contact_number" className="h-10 w-2/6" />

            <label htmlFor="email" className="w-2/6">
              Email
            </label>
            <input type="text" name="email" id="email" className="h-10 w-2/6" />

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

            <hr />
          </div>
        )}
        {tab === 2 && <div>Educational Attainment</div>}
        {tab === 3 && <div>Job Record</div>}
        {tab === 4 && <div>Account</div>}
      </div>
    </>
  );
};

export default ProfileRight;