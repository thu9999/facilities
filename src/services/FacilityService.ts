import http from './../http-common';
import { FacilityFormValue } from '../interfaces';

/**
 * Get list of facilities
 * @param page: number 
 * @param itemsPerPage: Number of facility items per page
 * @param searchValue: Search value for filtering facilities based on their name   
 */ 
const getFacilities = (page: number, itemsPerPage: number, searchValue: string) => {
    const params = new URLSearchParams();
        params.append('page', `${page}`);
        params.append('itemsPerPage', `${itemsPerPage}`);
        params.append('search', searchValue);

    return http.get(`/facility?${params}`);
}

/**
 * Create a facility
 * @body data: FacilityForm
 */

const createFacility = (data: FacilityFormValue) => {
    return http.post('/facility', data);
}

/**
 * Update a facility
 * @param id: Facility's id
 * @body data: FacilityForm
 */

const updateFacility = (id: number, data: FacilityFormValue) => {
    return http.put(`/facility/${id}`, data);
}

/**
 * Delete a facility
 * @param id: Facility's id
 */

const deleteFacility = (id: number) => {
    return http.delete(`/facility/${id}`);
}

export default {
    getFacilities,
    createFacility,
    updateFacility,
    deleteFacility
};