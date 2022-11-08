import API from './utils/api';

export const login=async()=>{
 const {data} = await API.post(
    "api/login",{
        username:'imrimee',
        password:'1234'
    }
 );
  console.log(data);
  return data;
}




export const search = async()=>{
  const {data} = await API.get(
    "api/search/imrimee",
  );
  console.log(data);
  return data;
}