import axios from 'axios'

export const getUserData = async () => {
    try {
        let data = await axios.get('https://determined-elk-shawl.cyclic.app/allUser')
        return data
    } catch (error) {
         return null;
    }

}