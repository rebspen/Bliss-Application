import axios from 'axios';


//checking the health of the server
export const health = async function() {
  try {
    const response = await axios.get(`https://private-9a6a89-blissrecruitmentapi.apiary-mock.com/health`);
    return response.data;
  } catch (error) {
    console.log('There was an error in async list load service');
    throw error;
  }
};

//calling the questions based on the offset and searchterm - searchtem could be filter=xxx or number
export const list = async function(offset, search) {
  //console.log("searchterm NEW SEARCH", offset,  search)
  try {
    if(typeof search === "string"){
      //console.log("api1")
      const response = await axios.get(`https://private-9a6a89-blissrecruitmentapi.apiary-mock.com/questions?${search}&limit=10&offset=${offset}`);
      return response.data;
    } else if (Number.isInteger(search)){
      //console.log("api2")
      const response = await axios.get(`https://private-9a6a89-blissrecruitmentapi.apiary-mock.com/questions/${search}`);
      return response.data;
    } else {
      //console.log("api3")
      const response = await axios.get(`https://private-9a6a89-blissrecruitmentapi.apiary-mock.com/questions?limit=10&offset=${offset}`);
      return response.data;
    }
  } catch (error) {
    console.log('There was an error in async list load service');
    throw error;
  }
};


//sending the screen link to a friend over email
export const share = async function(email,offset,search) {
  try {
    if(search){
      const response = await axios.post(`https://private-9a6a89-blissrecruitmentapi.apiary-mock.com/share?destination_email=${email}&content_url=http://localhost:3000/questions?${search}&limit=10&offset=${offset}`);
      return response.data;
    } else{
      const response = await axios.post(`https://private-9a6a89-blissrecruitmentapi.apiary-mock.com/share?destination_email=${email}&content_url=http://localhost:3000/questions?limit=10&offset=${offset}`);
      return response.data; 
    }
  } catch (error) {
    console.log('There was an error in async list load service');
    throw error;
  }
};

//updating the question votes with the answer that the user clicked
export const update = async function(id,body) {
  try {
    const response = await axios.put(`https://private-9a6a89-blissrecruitmentapi.apiary-mock.com/questions/${id}`, body);
    return response.data;
  } catch (error) {
    console.log('There was an error in async list load service');
    throw error;
  }
};