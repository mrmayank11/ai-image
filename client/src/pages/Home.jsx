import { useEffect, useState } from "react"
import Loader from '../components/Loader';
import FormField from "../components/FormField";
import Card from '../components/Card';



const RenderCards = ({ data, title }) => {
    // console.log(data);
    if (data?.length > 0) return data.map((post) => <Card key={post._id}{...post} className=" grid grid-cols-1 " />)

    return (
        <h2 className="mt-5 font-bold">
            {title}
        </h2>
    )
}
const Home = () => {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [searchResult, setSearchResult] = useState('');


    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);

            try {
                const response = await fetch('https://dalle-e-asna.onrender.com/post/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                // console.log(data);
                setPosts(data.data.reverse())
                console.log(posts);
            } catch (error) {

            } finally {
                setLoading(false);
            }
        }
        fetchPost();
    }, [])

    const handleSearch = (e) => {
        setSearchText(e.target.value);

        const searchResult = posts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()))

        setSearchResult(searchResult);

    }
    return (
        <div className=" w-2/3 mx-auto ">
            <div>
                <h1 className=" font-extrabold text-2xl">The Community Showcase</h1>
            </div>
            <p className=" text-gray-400 text-sm">Browse thorigh the collection of imagitauive and visually stunning images genrated by Dalle AI</p>
            <div>
                <FormField
                    handleChange={handleSearch}
                />
            </div>
            <div>
                {loading ?
                    (
                        <div className="flex justify-center items-center">
                            <Loader />
                        </div>
                    )
                    : (
                        <>
                            {
                                (searchText) && (<p className=" text-gray-400 text-lg italic">Showing results for  "{searchText}"</p>)
                            }

                        </>
                    )
                }
            </div>
            <div className=" grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
                {(searchText) ? (
                    <RenderCards
                        data={searchResult}
                        title="No search results"
                    />
                ) : (
                    <RenderCards
                        data={posts}
                        title="No posts found"
                    />
                )}
            </div>
        </div>
    )
}
export default Home
