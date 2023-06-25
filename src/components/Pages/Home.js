import React from "react";
import { useEffect, useState } from 'react';
import "./Home.css";
import Card from "../common/Card/Card";
import debounce from "lodash.debounce";
import Spinner from "../common/Spinner/Spinner";


const Home = () => {

    const [userData, setUserData] = useState([]);
    const [originalUserData, setOriginalUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    /**
     * Method will filter userData with input search value
     * @param {React.ChangeEvent<HTMLInputElement>} event 
     */
    const onEmployeeSearcChangeHandler=(event)=>{
        if(event.target.value === "")
        {
            setUserData(originalUserData)
            return;
        }
        let userData = [...originalUserData]
        let sortedUserData = userData.filter(data=>{
            if(data.first_name.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1)
            {
                return true;
            }
            return false;
        });
        setUserData(sortedUserData)
    }

    const onEmployeeSearchDebounce = debounce((event)=>onEmployeeSearcChangeHandler(event), 300);

    useEffect(() => {
        getData();
        // Cleaning debounce while unmounting
        return () => {
            onEmployeeSearchDebounce.cancel();
        };
      },[]);

    /**
     * Making API to get all users
     */
    const getData = () => {
        fetch("https://reqres.in/api/users?page=2")
            .then(response => response.json())
            .then(resdata => {
                setUserData(resdata.data);
                setOriginalUserData(resdata.data);
                setIsLoading(false)
            }).catch((error)=>{
                setIsLoading(false);
            })
    }



    return (
        <>
            {isLoading === true? <Spinner></Spinner>:<>
            <section key={"search"}>
            <div v className="container mt-3">
                <div className="row justify-content-center">
                    <div className="col-sm-6">
                        <input type="text" className="form-control" id="inputName" placeholder="Search employee" onChange={onEmployeeSearchDebounce} />
                    </div>
                </div>
            </div>
            </section>
            <section className="emp-sec" >
                <div className="d-flex flex-wrap mt-4">
                    {userData.length === 0? 
                    <div className="container d-flex justify-content-center">
                    <div className="alert alert-primary" style={{width:"fit-content"}}>
                        <strong>No search result 🙁</strong>
                    </div>
                    </div>
                    :(
                        userData.map((info, index) => {
                            return (
                                <>
                                    <Card src={info.avatar} title={info.first_name} id={info.id} className="m-4" key={info.id}></Card>
                                </>
                            )
                        })
                    )}
                    </div>
            </section>
            </>}
        </>
    )
}

export default Home;