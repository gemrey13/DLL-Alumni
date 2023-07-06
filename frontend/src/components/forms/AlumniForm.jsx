import React, { useEffect, useState } from 'react';
import { useAxios } from '../../index';

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
    setCountries(countriesData);
  }, [countriesData]);

  useEffect(() => {
    if (selectedCountry) {
      setRegions(regionsData);
    }
  }, [regionsData, selectedCountry]);

  useEffect(() => {
    if (selectedRegion) {
      setProvinces(provincesData);
    }
  }, [provincesData, selectedRegion]);

  useEffect(() => {
    if (selectedProvince) {
      setCities(citiesData);
    }
  }, [citiesData, selectedProvince]);

  useEffect(() => {
    if (selectedCity) {
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
    <div>
      <select onChange={handleCountryChange}>
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.id} value={country.id}>
            {country.country_name}
          </option>
        ))}
      </select>

      {selectedCountry && (
        <select onChange={handleRegionChange}>
          <option value="">Select Region</option>
          {regions.map((region) => (
            <option key={region.id} value={region.id}>
              {region.region_name}
            </option>
          ))}
        </select>
      )}

      {selectedRegion && (
        <select onChange={handleProvinceChange}>
          <option value="">Select Province</option>
          {provinces.map((province) => (
            <option key={province.id} value={province.id}>
              {province.province_name}
            </option>
          ))}
        </select>
      )}

      {selectedProvince && (
        <select onChange={handleCityChange}>
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.city_name}
            </option>
          ))}
        </select>
      )}

      {selectedCity && (
        <select>
          <option value="">Select Barangay</option>
          {barangays.map((barangay) => (
            <option key={barangay.id} value={barangay.id}>
              {barangay.barangay_name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default AlumniForm;
