import http from './../http-common';

/**
 * Get schedule list of a date
 * @param date
 */
const getSchedules = (datetime: string) => {
    return http.get(`/schedule/${datetime}`);
}

export default {
    getSchedules
};