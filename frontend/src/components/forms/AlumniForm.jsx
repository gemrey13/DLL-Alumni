import React, { useEffect, useState, useRef } from 'react';
import { useAxios } from '../../index';
import axios from 'axios';
import API_URL from '../../../config';

const FIELD_CHOICES = [
  ['technology', 'Technology'],
  ['medical', 'Medical/Healthcare'],
  ['mechanical', 'Mechanical Engineering'],
  ['electrical', 'Electrical Engineering'],
  ['finance', 'Finance/Accounting'],
  ['education', 'Education/Teaching'],
  ['marketing', 'Marketing/Advertising'],
  ['sales', 'Sales'],
  ['business', 'Business Development'],
  ['hr', 'Human Resources'],
  ['law', 'Law/Legal'],
  ['consulting', 'Consulting'],
  ['manufacturing', 'Manufacturing'],
  ['hospitality', 'Hospitality/Travel'],
  ['retail', 'Retail'],
  ['media', 'Media/Entertainment'],
  ['art', 'Art/Design'],
  ['architecture', 'Architecture'],
  ['nonprofit', 'Nonprofit/Volunteering'],
  ['government', 'Government/Public Administration'],
];


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
  const [courses, setCourses] = useState([]);
  const [curriculum, setCurriculum] = useState([]);
  const [showCurrentJobInput, setShowCurrentJobInput] = useState(false);

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get(`${API_URL}api/course-data/`, { cancelToken: source.token })
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log('Request canceled:', error.message);
        } else {
          console.error('Error fetching data:', error);
        }
      });

    axios
      .get(`${API_URL}api/curriculum-data/`, { cancelToken: source.token })
      .then((response) => {
        setCurriculum(response.data);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log('Request canceled:', error.message);
        } else {
          console.error('Error fetching data:', error);
        }
      });

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

    axios
      .get(`${API_URL}api/address/countries/`, { cancelToken: source.token })
      .then((response) => {
        setCurrentJobCountry(response.data);
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



  const [currentJobSelectedCountry, setCurrentJobSelectedCountry] = useState('');
  const [currentJobSelectedRegion, setCurrentJobSelectedRegion] = useState('');
  const [currentJobSelectedProvince, setCurrentJobSelectedProvince] = useState('');
  const [currentJobSelectedCity, setCurrentJobSelectedCity] = useState('');
  const [currentJobCountry, setCurrentJobCountry] = useState([]);
  const [currentJobRegion, setCurrentJobRegion] = useState([]);
  const [currentJobProvince, setCurrentJobProvince] = useState([]);
  const [currentJobCity, setCurrentJobCity] = useState([]);
  const [currentJobBarangay, setCurrentJobBarangay] = useState([]);
  
  useEffect(() => {
    if (currentJobSelectedCountry) {
      axios
        .get(`${API_URL}api/address/countries/${currentJobSelectedCountry}/regions/`)
        .then((response) => {
          setCurrentJobRegion(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setCurrentJobRegion([]);
    }
  }, [currentJobSelectedCountry]);

  useEffect(() => {
    if (currentJobSelectedRegion) {
      axios
        .get(`${API_URL}api/address/regions/${currentJobSelectedRegion}/provinces/`)
        .then((response) => {
          setCurrentJobProvince(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setCurrentJobProvince([]);
    }
  }, [currentJobSelectedRegion]);

  useEffect(() => {
    if (currentJobSelectedProvince) {
      axios
        .get(`${API_URL}api/address/provinces/${currentJobSelectedProvince}/cities/`)
        .then((response) => {
          setCurrentJobCity(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setCurrentJobCity([]);
    }
  }, [currentJobSelectedProvince]);

  useEffect(() => {
    if (currentJobSelectedCity) {
      axios
        .get(`${API_URL}api/address/cities/${currentJobSelectedCity}/barangays/`)
        .then((response) => {
          setCurrentJobBarangay(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setCurrentJobBarangay([]);
    }
  }, [currentJobSelectedCity]);


  const handleCurrentJobCountryChange = (event) => {
    const currentJobSelectedCountry = event.target.value;
    setCurrentJobSelectedCountry(currentJobSelectedCountry);
    setCurrentJobSelectedRegion('');
    setCurrentJobSelectedProvince('');
    setCurrentJobSelectedCity('');
    setCurrentJobRegion([]);
    setCurrentJobProvince([]);
    setCurrentJobCity([]);
    setCurrentJobBarangay([]);
  };

  const handleCurrentJobRegionChange = (event) => {
    const currentJobSelectedRegion = event.target.value;
    setCurrentJobSelectedRegion(currentJobSelectedRegion);
    setCurrentJobSelectedProvince('');
    setCurrentJobSelectedCity('');
    setCurrentJobProvince([]);
    setCurrentJobCity([]);
    setCurrentJobBarangay([]);
  };

  const handleCurrentJobProvinceChange = (event) => {
    const currentJobSelectedProvince = event.target.value;
    setCurrentJobSelectedProvince(currentJobSelectedProvince);
    setCurrentJobSelectedCity('');
    setCurrentJobCity([]);
    setCurrentJobBarangay([]);
  };

  const handleCurrentJobCityChange = (event) => {
    const currentJobSelectedCity = event.target.value;
    setCurrentJobSelectedCity(currentJobSelectedCity);
    setCurrentJobBarangay([]);
  };


  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (alumniIdExists) {
      console.log('Alumni ID already exists.');
      alert('Alumni ID already exists.');
    } else {
      const formData = {};

      for (const element of e.target.elements) {
        if (element.name) {
          formData[element.name] = element.value;
        }
      }

      axios.post(`${API_URL}api/alumni-form/`, formData)
        .then((response) => {
          console.log('Success! : ', response.data)
          console.log(formData);
          setSelectedAlumniId('');
          alert('Form Submitted Successfully!');
          closeModal();
        })
        .catch((error) => {
          console.error('Error ; ', error)
        })

      formRef.current.reset();
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

  const handleJobRecordCheckboxChange = (event) => {
    setShowCurrentJobInput(event.target.checked);
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div className="relative top-20 mx-auto p-5 border w-3/4 shadow-lg rounded-md bg-white">
          <form ref={formRef} onSubmit={handleSubmit} className="mt-3">
            <div className="mt-2 px-7 py-3">
              <div>
                <h1 className="text-lg font-semibold">Alumni Form</h1>
                <p>Fill the registration form below keenly to submit the alumni form.</p>
              </div>
              <hr />
              <div className="mt-6">
                <div className="flex">
                  <h1 className="mr-[50px] font-bold">Alumni ID</h1>
                  <input required type="text" name="alumni_id" id="alumni_id" value={selectedAlumniId} onChange={handleAlumniIdChange} maxLength="6" pattern="A\d{5}" className="h-8 border-gray-400 w-[12em]" />
                  {alumniIdExists && <span className="text-red-500 ml-[20px]">Alumni ID already exists.</span>}
                </div>

                <div className="flex mt-6">
                  <h1 className="mr-20 font-bold">Name</h1>
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
                  <h1 className="mr-[83px] font-bold">Email</h1>
                  <input required maxLength="64" type="email" name="email" id="email" className="h-8 border-gray-400 w-[18em] mr-[83px]" placeholder="ex: thomas.shelby@example.com" />
                  <h1 className="mr-[72px] font-bold">Phone Number</h1>
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
                  <label htmlFor="sex" className="mr-[70px] font-bold">
                    Gender
                  </label>
                  <select required name="sex" id="sex" className="h-8 text-sm py-0">
                    <option value=''>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>

                  <h1 className="mr-[8em] ml-[14em] font-bold">Religion</h1>
                  <input required maxLength="50" type="tel" name="religion" id="religion" className="h-8 border-gray-400 w-[12em]" />
                </div>

                <div className="flex mt-6">
                  <h1 className="mr-[16px] font-bold">Marital Status</h1>
                  <input required maxLength="50" type="text" name="marital_status" id="marital_status" className="h-8 border-gray-400 w-[15em] mr-[8.1em]" />
                  <h1 className="mr-[7.3em] font-bold">Birthdate</h1>
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

                <div className="flex mt-6">
                  <h1 className="mr-[74px] font-bold">Course</h1>

                  <select required name="course" id="course" className="h-8 mr-[13.5em] w-1/5 text-sm py-0 dark:bg-gray-700 dark:text-white">
                    <option value="">Select Course</option>
                    {courses.map((course) => (
                      <option key={course.course_id} value={course.course_id}>
                        {course.course_name}
                      </option>
                    ))}
                  </select>

                  <h1 className="mr-[60px] font-bold">Graduation Date</h1>
                  <input required type="date" name="graduation_date" id="graduation_date" className="h-8 border-gray-400 w-[12em]" />
                </div>

                <div className="flex mt-6">
                  <h1 className="mr-[73px] font-bold">Honor</h1>
                  <textarea name="honor" id="" cols="79" rows="2"></textarea>
                </div>

                <div className="flex mt-6">
                  <h1 className="mr-[33px] font-bold">Curriculum</h1>
                  <select required name="curriculum" id="curriculum" className="h-8 mr-[13.5em] w-1/5 text-sm py-0 dark:bg-gray-700 dark:text-white">
                    <option value="">Select Curriculum</option>
                    {curriculum.map((curri) => (
                      <option key={curri.curriculum_id} value={curri.curriculum_id} title={curri.description}>
                        {curri.curriculum_id}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex mt-6">
                  <h1 className="mr-[33px] font-bold">Job Record</h1>
                  <input type="checkbox" name="jobRecordCheckbox" checked={showCurrentJobInput} onChange={handleJobRecordCheckboxChange} className="border-gray-400 my-auto mr-2" />
                  Current Job
                </div>

                {showCurrentJobInput && (
                  <>
                    <div className="flex mt-3 ml-[7.2em]">
                      <div className="flex flex-col">
                        <input required type="text" name="job_title" id="job_title" maxLength="50" className="h-8 border-gray-400 w-48 mr-5" />
                        <label htmlFor="job_title" className="text-gray-400 text-sm">
                          Job Title
                        </label>
                      </div>

                      <div className="flex flex-col">
                        <input required type="text" name="company_name" id="company_name" maxLength="50" className="h-8 border-gray-400 w-48 mr-5" />
                        <label htmlFor="company_name" className="text-gray-400 text-sm">
                          Company Name
                        </label>
                      </div>

                      <div className="flex flex-col">
                        <input required type="number" name="salary" id="salary" maxLength="50" className="h-8 border-gray-400 w-48 mr-5" />
                        <label htmlFor="salary" className="text-gray-400 text-sm">
                          Salary
                        </label>
                      </div>
                      
                    </div>

                    <div className="flex mt-3 ml-[7.2em]">
                      <div className="flex flex-col">
                        <select required name="job_type" id="job_type" className='h-8 text-sm py-0 w-1/2 mr-[5em] dark:bg-gray-700 dark:text-white'>
                          <option value="">Select Job Type</option>
                            {FIELD_CHOICES.map((choice) => (
                              <option key={choice[0]} value={choice[0]}>
                                {choice[1]}
                              </option>
                            ))}
                        </select>
                      </div>

                      <div className="flex flex-col">
                        <input required type="date" name="start_date" id="start_date" maxLength="50" className="h-8 border-gray-400 w-48 mr-5" />
                        <label htmlFor="start_date" className="text-gray-400 text-sm">
                          Start Date
                        </label>
                      </div>
                    </div>

                    <div className="flex mt-6">
                      <h1 className="mr-[3em] ml-[8em] text-gray-400 text-sm">Job Address</h1>

                      <div className="flex flex-col w-1/5 mr-[4em]">
                        <select required name="current_job_country" onChange={handleCurrentJobCountryChange} className="h-8 text-sm py-0 dark:bg-gray-700 dark:text-white">
                          <option value="">Select Country</option>
                          {currentJobCountry.map((country) => (
                            <option key={country.id} value={country.id}>
                              {country.country_name}
                            </option>
                          ))}
                        </select>

                        <select required name="current_job_city" onChange={handleCurrentJobCityChange} className="mt-4 h-8 text-sm py-0 dark:bg-gray-700 dark:text-white">
                          <option value="">Select City</option>
                          {currentJobCity.map((city) => (
                            <option key={city.id} value={city.id}>
                              {city.city_name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex flex-col w-1/5 mr-[4em]">
                        <select required name="current_job_region" onChange={handleCurrentJobRegionChange} className="h-8 text-sm py-0 dark:bg-gray-700 dark:text-white">
                          <option value="">Select Region</option>
                          {currentJobRegion.map((region) => (
                            <option key={region.id} value={region.id}>
                              {region.region_name}
                            </option>
                          ))}
                        </select>

                        <select required name="current_job_barangay" className="mt-4 h-8 text-sm py-0 dark:bg-gray-700 dark:text-white">
                          <option value="">Select Barangay</option>
                          {currentJobBarangay.map((barangay) => (
                            <option key={barangay.id} value={barangay.id}>
                              {barangay.barangay_name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex flex-col w-1/5">
                        <select name="current_job_province" onChange={handleCurrentJobProvinceChange} className="h-8 text-sm py-0 dark:bg-gray-700 dark:text-white">
                          <option value="">Select Province</option>
                          {currentJobProvince.map((province) => (
                            <option key={province.id} value={province.id}>
                              {province.province_name}
                            </option>
                          ))}
                        </select>

                        <input type="text" name="current_job_street" id="street" className="mt-4 w-full h-8 border-gray-400" placeholder="street" />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex justify-end px-4 py-3">
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
