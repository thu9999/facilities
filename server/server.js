const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Datefns
const isEqual = require('date-fns/isEqual');
const isBefore = require('date-fns/isBefore');

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));

// Parse JSON bodies
app.use(bodyParser.json());

app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
   next();
});

let fakeData = [
   {
      facilityId: 1,
      name: 'Football Yard',
      type: 'external',
      openedDate: '2018-01-10 10:00:00',
      blocks: [3,4],
      timeslots: [
          {
              userId: 1,
              pickedUpFrom: '2020-06-01 10:00:00',
              pickedUpTo: '2020-06-01 11:00:00',
              key: 1
          },
          {
              userId: 2,
              pickedUpFrom: '2020-06-02 17:00:00',
              pickedUpTo: '2020-06-02 20:00:00',
              key: 2
          },
          {
            userId: 3,
            pickedUpFrom: '2020-06-03 21:00:00',
            pickedUpTo: '2020-06-03 22:00:00',
            key: 3
        },
      ],
      key: 0
  },
   {
       facilityId: 2,
       name: 'Swimming Pool',
       type: 'internal',
       openedDate: '2018-01-01 10:00:00',
       blocks: [1,2],
       timeslots: [
           {
               userId: 1,
               pickedUpFrom: '2020-06-04 10:00:00',
               pickedUpTo: '2020-06-04 11:00:00',
               key: 1
           },
           {
               userId: 2,
               pickedUpFrom: '2020-05-20 17:00:00',
               pickedUpTo: '2020-05-20 20:00:00',
               key: 2
           },
       ],
       key: 1
   },
   {
       facilityId: 3,
       name: 'Tennis Yard',
       type: 'external',
       openedDate: '2018-01-02 10:00:00',
       blocks: [3,4],
       timeslots: [
           {
               userId: 1,
               pickedUpFrom: '2020-06-05 10:00:00',
               pickedUpTo: '2020-06-05 11:00:00',
               key: 1
           }
       ],
       key: 2
   },
   {
       facilityId: 4,
       name: 'Barbecue',
       type: 'internal',
       openedDate: '2018-01-03 10:00:00',
       blocks: [1,2],
       timeslots: [
           {
               userId: 1,
               pickedUpFrom: '2020-06-06 10:00:00',
               pickedUpTo: '2020-06-06 11:00:00',
               key: 1
           },
           {
               userId: 2,
               pickedUpFrom: '2020-06-07 17:00:00',
               pickedUpTo: '2020-06-07 20:00:00',
               key: 2
           },
           {
            userId: 3,
            pickedUpFrom: '2020-06-08 09:00:00',
            pickedUpTo: '2020-06-08 11:00:00',
            key: 3
        },
        {
            userId: 4,
            pickedUpFrom: '2020-06-09 14:00:00',
            pickedUpTo: '2020-06-09 16:00:00',
            key: 4
        },
       ],
       key: 3
   },
   {
       facilityId: 5,
       name: 'Kids Garden',
       type: 'external',
       openedDate: '2018-01-04 10:00:00',
       blocks: [3,4],
       timeslots: [
           {
               userId: 1,
               pickedUpFrom: '2020-06-01 10:00:00',
               pickedUpTo: '2020-06-01 11:00:00',
               key: 1
           },
           {
               userId: 2,
               pickedUpFrom: '2020-06-02 17:00:00',
               pickedUpTo: '2020-06-02 20:00:00',
               key: 2
           },
       ],
       key: 4
   },
   {
       facilityId: 6,
       name: 'Walking',
       type: 'internal',
       openedDate: '2018-01-05 10:00:00',
       blocks: [1,2],
       timeslots: [
           {
               userId: 1,
               pickedUpFrom: '2020-06-20 10:00:00',
               pickedUpTo: '2020-06-20 11:00:00',
               key: 1
           },
           {
               userId: 2,
               pickedUpFrom: '2020-06-21 17:00:00',
               pickedUpTo: '2020-06-21 20:00:00',
               key: 2
           },
       ],
       key: 5
   },
   {
       facilityId: 7,
       name: 'Meeting Room',
       type: 'external',
       openedDate: '2018-01-06 10:00:00',
       blocks: [3,4],
       timeslots: [
           {
               userId: 1,
               pickedUpFrom: '2020-06-23 10:00:00',
               pickedUpTo: '2020-06-23 11:00:00',
               key: 1
           },
           {
               userId: 2,
               pickedUpFrom: '2020-06-24 17:00:00',
               pickedUpTo: '2020-06-24 20:00:00',
               key: 2
           },
       ],
       key: 6
   },
   {
       facilityId: 8,
       name: 'Hall',
       type: 'internal',
       openedDate: '2018-01-07 10:00:00',
       blocks: [1,2],
       timeslots: [
           {
               userId: 1,
               pickedUpFrom: '2020-06-25 10:00:00',
               pickedUpTo: '2020-06-25 11:00:00',
               key: 1
           },
           {
               userId: 2,
               pickedUpFrom: '2020-06-26 17:00:00',
               pickedUpTo: '2020-06-26 20:00:00',
               key: 2
           },
       ],
       key: 7
   },
   {
       facilityId: 9,
       name: 'Badmiton Yard',
       type: 'external',
       openedDate: '2018-01-08 10:00:00',
       blocks: [3,4],
       timeslots: [
           {
               userId: 1,
               pickedUpFrom: '2020-06-12 10:00:00',
               pickedUpTo: '2020-06-12 11:00:00',
               key: 1
           },
           {
               userId: 2,
               pickedUpFrom: '2020-06-13 17:00:00',
               pickedUpTo: '2020-06-13 20:00:00',
               key: 2
           },
       ],
       key: 8
   },
   {
       facilityId: 10,
       name: 'Skating Area',
       type: 'internal',
       openedDate: '2018-01-09 10:00:00',
       blocks: [1,2],
       timeslots: [
           {
               userId: 1,
               pickedUpFrom: '2020-06-14 10:00:00',
               pickedUpTo: '2020-06-14 11:00:00',
               key: 1
           },
           {
               userId: 2,
               pickedUpFrom: '2020-06-15 17:00:00',
               pickedUpTo: '2020-06-15 20:00:00',
               key: 2
           },
       ],
       key: 9
   },
   {
       facilityId: 11,
       name: 'Running',
       type: 'external',
       openedDate: '2018-01-10 10:00:00',
       blocks: [3,4],
       timeslots: [
           {
               userId: 1,
               pickedUpFrom: '2020-06-16 10:00:00',
               pickedUpTo: '2020-06-16 11:00:00',
               key: 1
           },
           {
               userId: 2,
               pickedUpFrom: '2020-06-17 17:00:00',
               pickedUpTo: '2020-06-17 20:00:00',
               key: 2
           },
       ],
       key: 10
   },
   {
      facilityId: 12,
      name: 'Moutain Climbing',
      type: 'internal',
      openedDate: '2018-01-01 10:00:00',
      blocks: [1,2],
      timeslots: [
          {
              userId: 1,
              pickedUpFrom: '2020-06-02 10:00:00',
              pickedUpTo: '2020-06-02 11:00:00',
              key: 1
          },
          {
              userId: 2,
              pickedUpFrom: '2020-06-13 17:00:00',
              pickedUpTo: '2020-06-13 18:00:00',
              key: 2
          },
      ],
      key: 11
  },
  {
      facilityId: 13,
      name: 'Football Yard',
      type: 'external',
      openedDate: '2018-01-02 10:00:00',
      blocks: [3,4],
      timeslots: [
          {
              userId: 1,
              pickedUpFrom: '2020-06-21 08:00:00',
              pickedUpTo: '2020-06-21 11:00:00',
              key: 1
          },
          {
              userId: 2,
              pickedUpFrom: '2020-06-24 17:00:00',
              pickedUpTo: '2020-06-24 18:00:00',
              key: 2
          },
      ],
      key: 12
  },
  {
      facilityId: 14,
      name: 'Jumping Yard',
      type: 'internal',
      openedDate: '2018-01-03 10:00:00',
      blocks: [1,2],
      timeslots: [
          {
              userId: 1,
              pickedUpFrom: '2020-06-07 10:00:00',
              pickedUpTo: '2020-06-07 13:00:00',
              key: 1
          },
          {
              userId: 2,
              pickedUpFrom: '2020-06-08 17:00:00',
              pickedUpTo: '2020-06-08 19:00:00',
              key: 2
          },
      ],
      key: 13
  },
  {
      facilityId: 15,
      name: 'Dancing Room',
      type: 'external',
      openedDate: '2018-01-04 10:00:00',
      blocks: [3,4],
      timeslots: [
          {
              userId: 1,
              pickedUpFrom: '2020-06-19 10:00:00',
              pickedUpTo: '2020-06-19 11:00:00',
              key: 1
          },
          {
              userId: 2,
              pickedUpFrom: '2020-06-20 17:00:00',
              pickedUpTo: '2020-06-20 20:00:00',
              key: 2
          },
      ],
      key: 14
  }
];

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



// Schedule api
const scheduleAPI = '/api/schedule';

/**
 * Get schedule list of a date
 * @param dateime: string
 */
app.get(`${scheduleAPI}/:dateime`, (req, res) => {
    const datetime = req.params.dateime;
    let schedules = [];

    fakeData.forEach(item => {
        const facility = item.name;
        if(item.timeslots && item.timeslots.length) {
            item.timeslots.forEach(timeslot => {
                const equal = isEqual(
                    new Date(datetime.slice(0,10)),
                    new Date(timeslot.pickedUpFrom.slice(0,10))
                );

                const past = isBefore(
                    new Date(datetime),
                    new Date()
                );

                const future = isBefore(
                    new Date(),
                    new Date(datetime)
                );


                if(equal) {
                    schedules.push({
                        type: past ? 'warning' : (future ? 'success' : 'processing'),
                        facility: `${facility} `,
                        userId: item.userId,
                        range: [(new Date(timeslot.pickedUpFrom)).getHours(), (new Date(timeslot.pickedUpTo)).getHours()]
                    })
                }
            })
        }
    })
    
    const json = JSON.stringify({
        data: schedules,
        err: null
    });

    res.end(json);

})

const PORT = process.env.PORT || 8080;

var server = app.listen(PORT,  (err) => {
   console.log(`Server is running on port ${PORT}`);
})