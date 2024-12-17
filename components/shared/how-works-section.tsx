import React from 'react'

const HowWorksSection = () => {
    return (
        <section className="py-12 bg-slate-200 z-50 dark:bg-dark-1">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl xl:text-5xl">
                        How does it work?
                    </h2>
                </div>

                <div className="flex flex-col items-center max-w-md mx-auto mt-8 lg:mt-15 lg:flex-row lg:max-w-none">

                    <div className="relative flex-1 w-full overflow-hidden bg-white dark:bg-dark-2 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
                        <div className="py-8 px-9">
                            <div className="inline-flex items-center justify-center w-10 h-10 text-base font-bold text-white bg-gray-900 dark:bg-gray-700 rounded-xl">
                                1
                            </div>
                            <h3 className="text-lg font-semibold text-gray-600 mt-2 dark:text-white">Create an Account via GitHub or Google</h3>
                            <p className="mt-4 text-xl font-medium text-gray-900 dark:text-gray-300">
                            Sign up quickly using your GitHub or Google account, and start managing tasks in seconds.
                            </p>
                        </div>
                    </div>

                    <div className="hidden lg:block lg:-mx-2">
                        <svg className="w-auto h-4 text-gray-300 dark:text-gray-600" viewBox="0 0 81 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 11 1)" stroke="currentColor" />
                            <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 46 1)" stroke="currentColor" />
                        </svg>
                    </div>

                    <div className="relative flex-1 w-full mt-8 lg:mt-0">
                        <div className="absolute -inset-4">
                            <div className="w-full h-full mx-auto rotate-180 opacity-20 blur-lg filter"
                                style={{
                                    background: 'linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)'
                                }}
                            ></div>
                        </div>
                        <div className="relative overflow-hidden bg-white dark:bg-dark-2 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
                            <div className="py-8 px-9">
                                <div className="inline-flex items-center justify-center w-10 h-10 text-base font-bold text-white bg-gray-900 dark:bg-gray-700 rounded-xl">
                                    2
                                </div>
                                <h3 className="text-lg font-semibold text-gray-600 mt-2 dark:text-white">Create Team or Personal Boards</h3>
                                <p className="mt-4 text-xl font-medium text-gray-900 dark:text-gray-300">
                                Whether you&apos;re working solo or with a team, easily set up personalized boards to organize your projects and tasks.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:block lg:-mx-2">
                        <svg className="w-auto h-4 text-gray-300 dark:text-gray-600" viewBox="0 0 81 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 11 1)" stroke="currentColor" />
                            <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 46 1)" stroke="currentColor" />
                        </svg>
                    </div>


                    <div className="relative flex-1 w-full mt-8 lg:mt-0">
                        <div className="relative overflow-hidden bg-white dark:bg-dark-2 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
                            <div className="py-8 px-9">
                                <div className="inline-flex items-center justify-center w-10 h-10 text-base font-bold text-white bg-gray-900 dark:bg-gray-700 rounded-xl">
                                    3
                                </div>
                                <h3 className="text-lg font-semibold text-gray-600 mt-2 dark:text-white">Track Your Progress</h3>
                                <p className="mt-4 text-xl font-medium text-gray-900 dark:text-gray-300">
                                Stay on top of deadlines and milestones by tracking your tasks’ progress, ensuring that everything stays on schedule and within reach.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HowWorksSection
