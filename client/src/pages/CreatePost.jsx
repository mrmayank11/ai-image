import React, { useState } from 'react'
import { preview } from '../assets'
import FormField from '../components/FormField'
import { getRandomPrompts } from '../utils/index';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';


const CreatePost = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        prompt: '',
        photo: ''
    }
    )
    const [generatingImg, setGeneratingImg] = useState(false);
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.prompt && form.photo) {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:8080/post/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form),
                });

                await response.json();
                navigate('/');
            } catch (err) {
                alert(err);
            } finally {
                setLoading(false);
            }
        } else {
            alert('Please generate an image with proper details');
        }
    };
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSurpriseMe = () => {
        const randomPrompt = getRandomPrompts();
        setForm({ ...form, prompt: randomPrompt })
    }
    const generateImage = async () => {
        if (form.prompt) {
            try {
                setGeneratingImg(true);
                const response = await fetch('http://localhost:8080/dalle/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        prompt: form.prompt,
                    }),
                });

                const data = await response.json();
                setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
            } catch (err) {
                alert(err);
            } finally {
                setGeneratingImg(false);
            }
        } else {
            alert('Please provide proper prompt');
        }
    };
    return (
        <div className=' w-2/3 mx-auto'>
            <div>
                <h1 className=" font-extrabold text-2xl">Create</h1>
            </div>
            <p className=" text-gray-400 text-sm">Create imaginative and visual images through DALL-E AI and share</p>

            <form onSubmit={handleSubmit}>
                <div flex flex-col gap-5>
                    <FormField
                        labelName="Your Name"
                        type="text"
                        name="name"
                        placeholder="Ex., john doe"
                        value={form.name}
                        handleChange={handleChange}
                    />

                    <FormField
                        labelName="Prompt"
                        type="text"
                        name="prompt"
                        placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
                        value={form.prompt}
                        handleChange={handleChange}
                        isSurpriseMe
                        handleSurpriseMe={handleSurpriseMe}
                    />
                </div>
                <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
                    {form.photo ? (
                        <img
                            src={form.photo}
                            alt={form.prompt}
                            className="w-full h-full object-contain"
                        />
                    ) : (
                        <img
                            src={preview}
                            alt="preview"
                            className="w-9/12 h-9/12 object-contain opacity-40"
                        />
                    )}

                    {generatingImg && (
                        <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                            <Loader />
                        </div>
                    )}
                </div>
                <div className='mt-2'>
                    <button
                        type="button"
                        className=' text-md w-full bg-green-600 text-white p-2 rounded-md' onClick={generateImage}>
                        {generatingImg ? 'Generating...' : 'Generate'}
                    </button>
                </div>
                <p className=' text-gray-400 text-sm mt-3'> Share with the community if you want to</p>
                <div className='mt-2'>
                    <button
                        type="submit"
                        className=' text-md w-full bg-purple-600 text-white p-2 rounded-md' >
                        {(loading) ? 'Sharing' : 'Share with community'}
                    </button>
                </div>
            </form>

        </div>
    )
}

export default CreatePost