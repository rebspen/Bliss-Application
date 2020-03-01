import axios from 'axios';

export const health = async function() {
  try {
    const response = await axios.get(`https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/health`);
    return response.data;
  } catch (error) {
    console.log('There was an error in async list load service');
    throw error;
  }
};

export const list = async function(search) {
  console.log("searchterm NEW SEARCH", typeof search, search)
  try {
    if(typeof search === "string"){
      console.log("api1")
      const response = await axios.get(`https://private-9a6a89-blissrecruitmentapi.apiary-mock.com/questions?${search}&limit=10`);
      return response.data;
    } else if (Number.isInteger(search)){
      console.log("api2")
      const response = await axios.get(`https://private-9a6a89-blissrecruitmentapi.apiary-mock.com/questions/${search}`);
      return response.data;
    } else {
      console.log("api3")
      const response = await axios.get(`https://private-9a6a89-blissrecruitmentapi.apiary-mock.com/questions`);
      return response.data;
    }
  } catch (error) {
    console.log('There was an error in async list load service');
    throw error;
  }
};

export const share = async function(search,email) {
  try {
    const response = await axios.post(`https://private-9a6a89-blissrecruitmentapi.apiary-mock.com/share?destination_email=${email}&content_url=http://localhost:3000/questions?${search}&limit=10`);
    return response.data;
  } catch (error) {
    console.log('There was an error in async list load service');
    throw error;
  }
};

export const update = async function(id,body) {
  try {
    const response = await axios.put(`https://private-9a6a89-blissrecruitmentapi.apiary-mock.com/questions/${id}`, body);
    return response.data;
  } catch (error) {
    console.log('There was an error in async list load service');
    throw error;
  }
};