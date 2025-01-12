import React from 'react';
import {UserFlowProvider} from "@/context/UserFlowProvider";

function MyApp({ Component, pageProps }) {
    return (
        <UserFlowProvider>
            <Component {...pageProps} />
        </UserFlowProvider>
    );
}

export default MyApp;
