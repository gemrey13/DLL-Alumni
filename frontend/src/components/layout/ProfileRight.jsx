import React, { useState, useEffect, useRef } from 'react';
import { useAxios } from '../../index';
import axios from 'axios';
import API_URL from '../../../config';


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

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get(`${API_URL}api/address/countries/`, { cancelToken: source.token })
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log('Request canceled:', error.message);
        } else {
          console.error('Error fetching data:', error);
        }
      });

    return () => {
      source.cancel('Operation canceled by user.');
    };
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      axios
        .get(`${API_URL}api/address/countries/${selectedCountry}/regions/`)
        .then((response) => {
          setRegions(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setRegions([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedRegion) {
      axios
        .get(`${API_URL}api/address/regions/${selectedRegion}/provinces/`)
        .then((response) => {
          setProvinces(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setProvinces([]);
    }
  }, [selectedRegion]);

  useEffect(() => {
    if (selectedProvince) {
      axios
        .get(`${API_URL}api/address/provinces/${selectedProvince}/cities/`)
        .then((response) => {
          setCities(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setCities([]);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedCity) {
      axios
        .get(`${API_URL}api/address/cities/${selectedCity}/barangays/`)
        .then((response) => {
          setBarangays(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setBarangays([]);
    }
  }, [selectedCity]);

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


  const personalInfoRef = useRef(null);

  const handlePersonalInfo = (e) => {
    e.preventDefault();
    const formData = {};
    for (const element of e.target.elements) {
      if (element.name) {
        formData[element.name] = element.value;
      }
    }
    console.log(formData);
    personalInfoRef.current.reset();
    // axios
    //   .post(`${API_URL}api/alumni-form/`, formData)
    //   .then((response) => {
    //     console.log('Alumni profile created successfully');
    //     // Handle any further actions or UI updates after successful submission
    //   })
    //   .catch((error) => {
    //     console.error('Form submission failed:', error);
    //     if (error.response) {
    //       console.log('Server Error:', error.response.data);
    //     } else if (error.request) {
    //       console.log('Request Error:', error.request);
    //     } else {
    //       console.log('Error:', error.message);
    //     }
    //   });
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
        </div>
        <div className="flex mt-10 text-lg">
          <h5 className="mr-10">Send Message</h5>
          <h5 className="mr-10">Facebook</h5>
          <h5>Twitter</h5>
        </div>
        <div className="flex mt-12 cursor-pointer">
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

        <div className='mt-10'>
        {tab === 1 && (
          <>
          <form ref={personalInfoRef} onSubmit={handlePersonalInfo}>
            <div className="flex mt-6">
                  <h1 className="mr-9 font-bold">Name</h1>
                  <div className="flex flex-col">
                    <input required type="text" name="fname" id="fname" maxLength="50" className="h-8 border-gray-400 w-48 mr-5" />
                    <label htmlFor="fname" className="text-gray-400 text-sm">
                      First Name
                    </label>
                  </div>
                  <div className="flex flex-col">
                    <input required type="text" name="lname" id="lname" maxLength="50" className="h-8 border-gray-400 w-48 mr-5" />
                    <label htmlFor="lname" className="text-gray-400 text-sm">
                      Last Name
                    </label>
                  </div>
                  <div className="flex flex-col">
                    <input type="text" name="mi" id="mi" maxLength="1" className="h-8 border-gray-400 w-16 mr-5" />
                    <label htmlFor="mi" className="text-gray-400 text-sm">
                      M.I.
                    </label>
                  </div>
                  <div className="flex flex-col">
                    <input type="text" name="suffix" id="suffix" maxLength="4" className="h-8 border-gray-400 w-16" />
                    <label htmlFor="suffix" className="text-gray-400 text-sm">
                      Suffix
                    </label>
                  </div>
                </div>

                <div className="flex mt-4">
                  <h1 className="mr-10 font-bold">Email</h1>
                  <input required maxLength="64" type="email" name="email" id="email" className="h-8 border-gray-400 w-[18em] mr-10" placeholder="ex: thomas.shelby@example.com" />
                  <h1 className="mr-10 font-bold">Phone Number</h1>
                  <input
                    required
                    type="tel"
                    name="contact_number"
                    id="contact_number"
                    className="h-8 border-gray-400 w-[12em]"
                    maxLength="11"
                    pattern="09\d{9}"
                    title="Please enter a valid phone number starting with 09 followed by 9 more digits."
                    placeholder="ex: 09******235"
                  />
                </div>

                <div className="flex mt-6">
                  <label htmlFor="sex" className="mr-7 font-bold">
                    Gender
                  </label>
                  <select required name="sex" id="sex" className="mr-[12.9em] h-8 text-sm py-0">
                    <option value=''>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>

                  <h1 className="mr-[6em] font-bold">Religion</h1>
                  <input required maxLength="50" type="tel" name="religion" id="religion" className="h-8 border-gray-400 w-[12em]" />
                </div>

                <div className="flex mt-6">
                  <h1 className="-mr-1 font-bold">Marital Status</h1>
                  <input required maxLength="50" type="text" name="marital_status" id="marital_status" className="h-8 border-gray-400 w-[15em] mr-[5.2em]" />
                  <h1 className="mr-[5.2em] font-bold">Birthdate</h1>
                  <input required type="date" name="date_of_birth" id="date_of_birth" className="h-8 border-gray-400 w-[12em]" />
                </div>

                <div className="flex mt-6">
                  <h1 className="mr-[4.1em] font-bold">Address</h1>

                  <div className="flex flex-col w-1/5 mr-[4em]">
                    <select required name="country" onChange={handleCountryChange} className="h-8 text-sm py-0 dark:bg-gray-700 dark:text-white">
                      <option value="">Select Country</option>
                      {countries.map((country) => (
                        <option key={country.id} value={country.id}>
                          {country.country_name}
                        </option>
                      ))}
                    </select>

                    <select required name="city" onChange={handleCityChange} className="mt-4 h-8 text-sm py-0 dark:bg-gray-700 dark:text-white">
                      <option value="">Select City</option>
                      {cities.map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.city_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col w-1/5 mr-[4em]">
                    <select required name="region" onChange={handleRegionChange} className="h-8 text-sm py-0 dark:bg-gray-700 dark:text-white">
                      <option value="">Select Region</option>
                      {regions.map((region) => (
                        <option key={region.id} value={region.id}>
                          {region.region_name}
                        </option>
                      ))}
                    </select>

                    <select required name="barangay" className="mt-4 h-8 text-sm py-0 dark:bg-gray-700 dark:text-white">
                      <option value="">Select Barangay</option>
                      {barangays.map((barangay) => (
                        <option key={barangay.id} value={barangay.id}>
                          {barangay.barangay_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col w-1/5">
                    <select name="province" onChange={handleProvinceChange} className="h-8 text-sm py-0 dark:bg-gray-700 dark:text-white">
                      <option value="">Select Province</option>
                      {provinces.map((province) => (
                        <option key={province.id} value={province.id}>
                          {province.province_name}
                        </option>
                      ))}
                    </select>

                    <input type="text" name="street" id="street" className="mt-4 w-full h-8 border-gray-400" placeholder="street" />
                  </div>
                </div>

                <button type="submit" className="p-2 mt-5 absolute right-[5%] bg-blue-500 text-white text-base font-medium rounded-md w-24 shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300">
                  Save
                </button>
          </form>
          </>
        )}
        {tab === 2 && <div>Educational Attainment</div>}
        {tab === 3 && <div>Job Record</div>}
        {tab === 4 && <div>Account</div>}
        </div>
      </div>
    </>
  );
};

export default ProfileRight;
