import { fetchFromTMDB } from "../services/tmdb.service.js";
import User from "../models/user.model.js";

export async function searchPerson(req, res) {
    try {
        const { query } = req.params;
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);
        if (response.results.length === 0) {
            return res.status(404).send(null);
        }
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].profile_path,
                    title: response.results[0].name,
                    searchType: "person",
                    createAt: new Date(),
                },
            },
        });

        res.status(200).json({ success: true, content: response.results })
    } catch (error) {
        console.log("search person controller ", error.message);
        return res.status(500).json({ success: false, message: "internal server error" });
    }
}

export async function searchMovie(req, res) {
    try {
        const { query } = req.params;
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);
        if (response.results.length === 0) {
            return res.status(404).send(null);
        }
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].poster_path,
                    title: response.results[0].title,
                    searchType: "movie",
                    createAt: new Date(),
                },
            },
        });
        res.status(200).json({ success: true, content: response.results })
    } catch (error) {
        console.log("search movie controller ", error.message);
        return res.status(500).json({ success: false, message: "internal server error" });
    }
}

export async function searchTv(req, res) {
    try {
        const { query } = req.params;
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);
        if (response.results.length === 0) {
            return res.status(404).send(null);
        }
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].poster_path,
                    title: response.results[0].name,
                    searchType: "tv",
                    createAt: new Date(),
                },
            },
        });

        res.status(200).json({ success: true, content: response.results })
    } catch (error) {
        console.log("search tv controller ", error.message);
        return res.status(500).json({ success: false, message: "internal server error" });
    }
}

export async function getSearchHistory(req, res) {
    try {
         
        res.status(200).json({ success: true, content: req.user.searchHistory });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

export async function getItemFomSearchHistory(req, res) {
    let { id } = req.params;
    id = parseInt(id);
    try {
        await User.findByIdAndUpdate(req.user._id,{
            $pull:{
                searchHistory:{id:id}
            }
        })
        return res.status(200).json({success:true,message:"Item is remove fromsearch history"})
    } catch (error) {
        console.log("error in removeitem from searchhistory controller",error.message);
        res.status(500).json({success:false,message:"Internal sever"
        })
        
    }
}