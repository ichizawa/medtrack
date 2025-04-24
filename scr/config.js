export const BASE_URL = 'https://192.168.110.116:8000/api/medtrack/';
export const processResponse = async (response) => {
  try {
    const statusCode = response.status; //
    const data = response.json(); //
    const res = await Promise.all([statusCode, data]); //
    return {
      statusCode: res[0], //
      data: res[1], //
    };
  } catch (e) {
    console.log(e);
  }
};
