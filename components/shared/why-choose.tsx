import Image from 'next/image'
import React from 'react'

const WhyChoose = () => {
    return (
        <section className="bg-slate-200 dark:bg-dark-1 z-50 ">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl xl:text-5xl text-center">
                Why Us?
            </h1>
            <div className="container px-5 py-6 mx-auto">
                <div className="flex flex-wrap items-end text-center justify-center">
                    <div className="p-4 md:w-1/4 sm:w-1/2">
                        <div className="px-4 py-6 transform transition duration-500 hover:scale-110">
                            <div className="flex justify-center">
                                <Image src="/people.png" alt="customer" width={130} height={130} className='object-contain' />
                            </div>
                            <h2 className="title-font font-regular text-2xl ">Customer-Centric Approach</h2>
                        </div>
                    </div>

                    <div className="p-4 md:w-1/4 sm:w-1/2">
                        <div className="px-4 py-6 transform transition duration-500 hover:scale-110">
                            <div className="flex justify-center">
                            <Image src="/blub.png" alt="solution" width={130} height={130} className='object-contain' />
                            </div>
                            <h2 className="title-font font-regular text-2xl ">Innovative Solutions</h2>
                        </div>
                    </div>

                    <div className="p-4 md:w-1/4 sm:w-1/2">
                        <div className="px-4 py-6 transform transition duration-500 hover:scale-110">
                            <div className="flex justify-center">
                            <Image src="/clock.png" alt="time" width={130} height={130} className='object-contain' />
                            </div>
                            <h2 className="title-font font-regular text-2xl ">Time Efficiency</h2>
                        </div>
                    </div>

                    <div className="p-4 md:w-1/4 sm:w-1/2">
                        <div className="px-4 py-6 transform transition duration-500 hover:scale-110">
                            <div className="flex justify-center">
                            <Image src="/lifebuoy.png" alt="support" width={130} height={130} className='object-contain' />
                            </div>
                            <h2 className="title-font font-regular text-2xl ">Reliable Support</h2>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default WhyChoose
