const facilityAPI = '/api/facility';

/**
 * Get list of facility with pagination
 * @param page: number 
 * @param itemsPerPage: number of facility items per page
 * @param search: string, search criteria of facility based on name field
 */
app.get(facilityAPI, (req, res) => {

    const page = +req.query.page;
    const itemsPerPage = +req.query.itemsPerPage;
    const search = req.query.search;

    let data = [];

    const filterData = fakeData.filter(item => (item.name.toLowerCase()).includes(search.toLowerCase()));

    filterData.forEach((item, i) => {
        if(i >= page * itemsPerPage && i < (page + 1) * itemsPerPage) {
            data.push(item);
        }
    })

    const json = JSON.stringify({
        data: data,
        total: filterData? filterData.length : 0,
        err: null
    });
    res.end(json);
});

/**
 * Get a facility having id
 * @param id: id number of facility
 */
app.get(`${facilityAPI}/:id`, (req, res) => {
    const id = +req.params.id;
    
    let facility = (fakeData.filter(facility => facility.facilityId === id))[0];

    const json = JSON.stringify({
        data: facility,
        err: null
    });
    res.end(json);
})

/**
 * Create a new facility
 * @body data {
 *  name: string 
 *  type: string
 *  blocks: number[]
 * }
 * Add new facility item to fakeData with id incrementing 1
 */
app.post(facilityAPI, (req, res) => {
    const id = Math.max.apply(Math, fakeData.map(d => d.facilityId)) + 1;
    const date = new Date();
    const openedDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
    const newFacility = {
        ...req.body,
        facilityId: id,
        openedDate,
        timeslots: [],
        key: id-1
    };

    fakeData.push(newFacility);
    const json = JSON.stringify({
        data: true,
        err: null
    });

    res.end(json);
});

/**
 * Update a facility having id
 * @param id: number. Facility's id
 * @body data: facility
 * 
 */
app.put(`${facilityAPI}/:id`, (req, res) => {
    const id = +req.params.id;
    const data = req.body;
    fakeData = fakeData.map(facility => {
        if(facility.facilityId === id) {
            return {...data, facilityId: id, openedDate: (data.openedDate.replace('T', ' ')).replace('.000Z','')};
        } else {
            return facility;
        }
    });

    const json = JSON.stringify({
        data: true,
        err: null
    });

    res.end(json);
})


/**
 * Delete a facility having id
 * @param id: Facility's id
 * Should update deleted field to 1 in production
 * In this demo, I will temporary delete facility having id from the list
 * Testing server error with facilityId > 6. In this case, server will response error
 */
app.delete(`${facilityAPI}/:id`, (req, res) => {
    const id = +req.params.id;

    if(id > 6) {
        const json = JSON.stringify({
            data: false,
            err: true
        });
    
        res.end(json);
    } else {
        fakeData = [...fakeData.filter(facility => facility.facilityId !== id)];
        const json = JSON.stringify({
            data: true,
            err: null
        });
    
        res.end(json);
    }

})