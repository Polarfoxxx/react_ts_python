import { API_URL } from "../../shared";

async function authorizationModule(): Promise<boolean> {

  try {
    const respo = await fetch(`${API_URL}/cookie/verify`, {
      method: "GET",
      credentials: "include",  // Povolenie cookies
      headers: {
        "Content-Type": "application/json",
      }
    })
    const nest = await respo.json()// Prečítaj JSON telo odpovede
    const { message } = nest;
    if (message === 'Cookie not found') {
      return false;
    } else {
      console.log("Cookie found");

      return true;
    }
  

} catch (error) {
  console.error('Error during logout:', error);
  return false;
}
return false;
}

export default authorizationModule;