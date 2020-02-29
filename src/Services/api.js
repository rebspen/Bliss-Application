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
  try {
    console.log("in api", search, search.split("=")[0])§
    if()
    const response = await axios.get(`https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/questions?${search}limit=10&offset=&`);
    return response.data;
  } catch (error) {
    console.log('There was an error in async list load service');
    throw error;
  }
};