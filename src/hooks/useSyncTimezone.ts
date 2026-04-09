import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { fetchProfile, getUserProfile } from '../redux/features/authSlice';
import { getBrowserTimezone } from '../utils';
import { updateTimezone } from '../services';

/**
 * Syncs the browser timezone to the backend when the user is logged in and
 * profile timezone differs. Call in any layout (dashboard or landing); runs
 * only when profile is loaded (logged in).
 */
export function useSyncTimezone() {
    const dispatch = useDispatch<AppDispatch>();
    const profile = useSelector(getUserProfile);
    const hasSyncedTimezone = useRef(false);

    useEffect(() => {
        if (!profile?.id || hasSyncedTimezone.current) return;
        const browserTz = getBrowserTimezone();
        const profileTz = profile?.timezone || '';
        if (profileTz !== browserTz) {
            hasSyncedTimezone.current = true;
            updateTimezone(browserTz)
                .then(() => dispatch(fetchProfile()))
                .catch(() => { hasSyncedTimezone.current = false; });
        }
    }, [profile?.id, profile?.timezone, dispatch]);
}
