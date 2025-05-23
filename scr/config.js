// export const BASE_URL = "http://192.168.254.110:8000/api/";
export const BASE_URL = 'http://medtrack.atwebpages.com/api/';

export const processResponse = async (response) => {
  try {
    // for prod
    const statusCode = response.status; //
    const data = response.json(); //
    const res = await Promise.all([statusCode, data]); //
    return {
      // get response from api
      statusCode: res[0], //
      data: res[1], //
    };
  } catch (e) {
    console.error("Network error:", e.message);
  }
};
