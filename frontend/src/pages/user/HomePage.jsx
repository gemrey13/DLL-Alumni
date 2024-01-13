import React, { useEffect, useContext, useState } from "react";
import JobItem from "../../components/user/JobItem";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import baseURL from "@/apiConfig";


const HomePage = () => {
    let { authTokens, user } = useContext(AuthContext);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseURL}/api/job-recommendation`, {
                    params: {user_id: user.user_id}
                })
                setData(response.data)
            } catch (error) {
                
            }
        }
        fetchData();
    }, [])

    return (
        <>
            <section className="py-12">
                <h1 className="text-4xl text-black-2 font-semibold">
                    Hi Gem Rey ! 👋
                </h1>

                <h4 className="font-medium text-xl text-black-2 mt-10">
                    Jobs recommended for you
                </h4>

                <JobItem data={data} />
            </section>
        </>
    );
};

export default HomePage;
