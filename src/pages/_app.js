import React from 'react';
import {UserFlowProvider} from "@/context/UserFlowProvider";
import { EventTrackerProvider } from "@/context/EventTrackerProvider";

function MyApp({ Component, pageProps }) {
    return (
        <EventTrackerProvider>
            <UserFlowProvider>
                <Component {...pageProps} />
            </UserFlowProvider>
        </EventTrackerProvider>
    );
}

export default MyApp;
