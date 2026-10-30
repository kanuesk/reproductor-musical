import axios from "axios"



export const load = async () => {
    const respuestaCanciones = await axios.get ('https://leonardoapi.vercel.app/api/tracks')
    return {
        tracks: respuestaCanciones.data.tracks
    }
}

