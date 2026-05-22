import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionSlice';

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);
  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/connections', {withCredentials: true})
      dispatch(addConnection(res?.data?.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getConnections()
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1>No connections Found!</h1>;


  return (
    <div className='text-center my-5'>
      <h1 className='text-4xl font-bold text-white'>connections</h1>
      {connections.map((connection) => {
        const {_id, firstName, lastName, age, gender, pictureUrl, about} = connection;
        return (
          <div key={_id} className='flex m-4 p-4 bg-base-300 rounded-lg w-1/2 mx-auto'>
            <div>
              <img className='w-20 h-20 rounded-full' src={pictureUrl} alt="photo" />
            </div>
            <div className='text-left mx-4'>
              <h2 className='font-bold text-xl'>{firstName + ' ' + lastName}</h2>
              {age && gender && <p>{age + ', ' + gender}</p>}
              <p>{about}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Connections
