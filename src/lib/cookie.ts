import Cookies from 'js-cookie';

interface CookieOptions {
    expires?: number | Date; 
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: 'Lax' | 'Strict' | 'None';
}

// Default cookie options
const defaultCookieOptions: CookieOptions = {
    expires: 7,       
    secure: import.meta.env.MODE === "production",  
    sameSite: 'Strict' 
};

export function setCookie(
    cookieName: string,
    cookieValue: string,
    options?: CookieOptions
): void {
    const finalOptions = { ...defaultCookieOptions, ...options };
    Cookies.set(cookieName, cookieValue, finalOptions);
}

export function getCookie(cookieName: string): string | undefined {
    return Cookies.get(cookieName);
}

export function destroyCookie(cookieName: string): void {
    Cookies.remove(cookieName);
}

export function destroyAllCookies(): void {
    const allCookies = Cookies.get();
    Object.keys(allCookies).forEach(cookieName => {
        Cookies.remove(cookieName);
    });
}
