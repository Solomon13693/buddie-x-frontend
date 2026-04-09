import { ToastProvider } from "@heroui/react";
import { HeroUIProvider } from '@heroui/system'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'react-redux';
import { createTheme, MantineProvider } from '@mantine/core'
import { store } from "../redux/store";
import { EchoProvider } from "../context/EchoContext";
import FirebaseNotificationProvider from "../firebase/FirebaseProvider";
import { queryClient } from "../lib/queryClient";

export function Providers({ children }: { children: React.ReactNode }) {

    const theme = createTheme({
        colors: {
            primary: [
                '#9400d3', // 500 - Original base color
                '#f3e5fc',
                '#e1bdf7',
                '#ce93f0',
                '#ba68e5',
                '#a742db',

                '#8501c0',
                '#7602ae',
                '#67019b',
                '#570088',
            ],
        }
    });

    return (
        <QueryClientProvider client={queryClient}>

            <EchoProvider>

                <Provider store={store}>

                    <FirebaseNotificationProvider>

                        <MantineProvider withCssVariables withStaticClasses theme={theme}>
                            <HeroUIProvider>
                                {children}
                            </HeroUIProvider>
                            <ReactQueryDevtools initialIsOpen={false} />
                        </MantineProvider>

                    </FirebaseNotificationProvider>

                    <ToastProvider placement='top-right' toastOffset={20} />

                </Provider>

            </EchoProvider>

        </QueryClientProvider>
    )
}