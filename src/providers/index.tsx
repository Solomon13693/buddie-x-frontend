import { ToastProvider } from "@heroui/react";
import { HeroUIProvider } from '@heroui/system'
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'react-redux';
import { createTheme, MantineProvider } from '@mantine/core'
import { store } from "../redux/store";
import { EchoProvider } from "../context/EchoContext";

export function Providers({ children }: { children: React.ReactNode }) {

    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 10,
                gcTime: 1000 * 60 * 60,
                refetchOnWindowFocus: false,
                retry: (failureCount, error: any) => {
                    if (error?.response?.status === 404) {
                        return false;
                    }
                    return failureCount < 2;
                },
                retryDelay: 3000,
            },
        },
    }));


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

                    <MantineProvider withCssVariables withStaticClasses theme={theme}>
                        <HeroUIProvider>
                            {children}
                        </HeroUIProvider>
                        <ReactQueryDevtools initialIsOpen={false} />
                    </MantineProvider>

                    <ToastProvider placement='top-right' toastOffset={20} />

                </Provider>

            </EchoProvider>

        </QueryClientProvider>
    )
}