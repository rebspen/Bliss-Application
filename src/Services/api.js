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

export const list = async function() {
  try {
    const response = await axios.get(`https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/questions?limit=10&offset=&filter=filter`);
    return response.data;
  } catch (error) {
    console.log('There was an error in async list load service');
    throw error;
  }
};