import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants';
import { useEffect } from 'react';
import { addRequest, removeRequest } from '../utils/requestSlice';

const Requests = () => {
    const requests = useSelector(state => state.request);
    const dispatch = useDispatch();

    const reviewRequest = async (status, requestId) => {
      await axios.post(BASE_URL + "/request/review/" + status + "/" + requestId, {}, {withCredentials: true});
      dispatch(removeRequest(requestId));
    }

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + '/user/request/received', {withCredentials: true});
            dispatch(addRequest(res?.data?.data));
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        fetchRequests();
    }, []);

    if (!requests) return;

    if (requests.length === 0) return <h1 className='flex font-bold text-2xl my-10 justify-center'>No Request Found!</h1>

  return (
    <div className='text-center my-5'>
      <h1 className='text-4xl font-bold text-white'>requests</h1>
      {requests.map((request) => {
        const {_id, firstName, lastName, age, gender, pictureUrl, about} = request.fromUserId;
        return (
          <div key={_id} className='flex m-4 p-4 bg-base-300 rounded-lg w-2/3 mx-auto justify-between items-center'>
            <div>
              <img className='w-20 h-20 rounded-full' src={pictureUrl} alt="photo" />
            </div>
            <div className='text-left mx-4'>
              <h2 className='font-bold text-xl'>{firstName + ' ' + lastName}</h2>
              {age && gender && <p>{age + ', ' + gender}</p>}
              <p>{about}</p>
            </div>
            <div>
              <button className="btn btn-primary mx-2" onClick={() => reviewRequest("rejected", request._id)}>Reject</button>
              <button className="btn btn-secondary mx-2" onClick={() =>reviewRequest("accepted", request._id)}>Accept</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Requests
