'use client';

import { updateUserMetadataDashboardTour } from '@/actions/user.actions';
import { JOYRIDE_STEPS_DASHBOARD } from '@/contants';
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import ReactJoyride, { CallBackProps } from 'react-joyride';

const DashboardTour = () => {
    const [load, setLoad] = useState(false);
    const [run, setRun] = useState(false);
    const [stepIndex, setStepIndex] = useState(0);
    const { user } = useUser();
    console.log(user)
    useEffect(() => {
        if (user?.publicMetadata?.dashboardTour === true) {
            setRun(false);
        } else {

            setRun(true);
        }
    }, [user]);

    useEffect(() => {
        setLoad(true);
    }, []);

    const joyrideCallback = async (data: CallBackProps) => {
        const { action, status, type, index } = data;
        if (type === 'step:after' && action === 'next') {
            setStepIndex(index + 1);
        }
        if (status === 'finished' || action === 'close') {
            console.log("Tour finished or closed.");
            setRun(false);
            // todo server action iNewUser: false
            updateUserMetadataDashboardTour().then(() => {
                console.log('updated')
            }).catch(() => {
                console.log('error')
            });

        }
    };

    if (!load) return null;

    return (
        <ReactJoyride
            showProgress
            showSkipButton
            run={run}
            stepIndex={stepIndex}
            callback={joyrideCallback}
            continuous
            steps={JOYRIDE_STEPS_DASHBOARD}
            styles={{
                options: {
                    zIndex: 10000,
                },
            }}
        />
    );
};

export default DashboardTour;