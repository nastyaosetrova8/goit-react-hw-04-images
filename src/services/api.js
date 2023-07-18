import axios from "axios";


const instance = axios.create({
    baseURL: 'https://pixabay.com/api/',
});


export const requestImageGallery = async (searchQuery, page) => {
    const {data} = await instance.get(`?q=${searchQuery}&page=${page}&key=37605527-f3cca5f87cf77f5dd7578dcdc&image_type=photo&orientation=horizontal&per_page=12`);

    return data;
}  