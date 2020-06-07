import http from './../http-common';
import { ScheduleValue } from '../interfaces';

/**
 * Get schedule list of a date
 * @param date
 */
const getSchedules = (datetime: string) => {
    return http.get(`/schedule/${datetime}`);
}

/**
 * Add new schedule
 */
const addSchedule = (value: ScheduleValue) => {
    return http.post(`/schedule`, value);
}

export default {
    getSchedules,
    addSchedule
};