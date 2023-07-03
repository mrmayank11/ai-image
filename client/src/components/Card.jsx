import React from 'react'
import { downloadImg } from '../utils'
import { download } from '../assets';


const Card = (data, title) => {
    return (
        // Name: <span className=' text-gray-600'>{data.name}</span>
        //     
        <div className='group relative card '>
            <div className='hidden group-hover:flex flex-col bg-slate-800 text-white absolute bottom-1 left-1 right-1 rounded-lg p-2'>

                <p className=' text-sm mb-2  text-white'>{data.prompt}</p>
                <div className='flex justify-between '>
                    <div className=''>

                        <span className=' bg-green-400 px-2 py-1 m-1 rounded-full'>{data.name[0]}</span>
                        {data.name}

                    </div>
                    <button type='button' onClick={() => { downloadImg(data._id, data.photo) }}>
                        <img src={download} className=' h-6 w-6 object-contain invert'></img>
                    </button>
                </div>


            </div>

            <img src={data.photo} alt="" srcset="" className=' rounded-lg' />
        </div>
    )
}

export default Card 