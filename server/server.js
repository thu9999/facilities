var express = require('express');
var app = express();
const bodyParser = require('body-parser');

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
              pickedUpFrom: '2020-05-20 10:00:00',
              pickedUpTo: '2020-05-20 11:00:00',
              key: 1
          },
          {
              userId: 2,
              pickedUpFrom: '2020-05-20 17:00:00',
              pickedUpTo: '2020-05-20 20:00:00',
              key: 2
          },
          {
            userId: 3,
            pickedUpFrom: '2020-05-20 21:00:00',
            pickedUpTo: '2020-05-20 22:00:00',
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
               pickedUpFrom: '2020-05-20 10:00:00',
               pickedUpTo: '2020-05-20 11:00:00',
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
               pickedUpFrom: '2020-05-20 10:00:00',
               pickedUpTo: '2020-05-20 11:00:00',
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
               pickedUpFrom: '2020-05-20 10:00:00',
               pickedUpTo: '2020-05-20 11:00:00',
               key: 1
           },
           {
               userId: 2,
               pickedUpFrom: '2020-05-20 17:00:00',
               pickedUpTo: '2020-05-20 20:00:00',
               key: 2
           },
           {
            userId: 3,
            pickedUpFrom: '2020-05-21 09:00:00',
            pickedUpTo: '2020-05-21 11:00:00',
            key: 3
        },
        {
            userId: 4,
            pickedUpFrom: '2020-05-22 14:00:00',
            pickedUpTo: '2020-05-23 16:00:00',
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
               pickedUpFrom: '2020-05-20 10:00:00',
               pickedUpTo: '2020-05-20 11:00:00',
               key: 1
           },
           {
               userId: 2,
               pickedUpFrom: '2020-05-20 17:00:00',
               pickedUpTo: '2020-05-20 20:00:00',
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
               pickedUpFrom: '2020-05-20 10:00:00',
               pickedUpTo: '2020-05-20 11:00:00',
               key: 1
           },
           {
               userId: 2,
               pickedUpFrom: '2020-05-20 17:00:00',
               pickedUpTo: '2020-05-20 20:00:00',
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
               pickedUpFrom: '2020-05-20 10:00:00',
               pickedUpTo: '2020-05-20 11:00:00',
               key: 1
           },
           {
               userId: 2,
               pickedUpFrom: '2020-05-20 17:00:00',
               pickedUpTo: '2020-05-20 20:00:00',
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
               pickedUpFrom: '2020-05-20 10:00:00',
               pickedUpTo: '2020-05-20 11:00:00',
               key: 1
           },
           {
               userId: 2,
               pickedUpFrom: '2020-05-20 17:00:00',
               pickedUpTo: '2020-05-20 20:00:00',
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
               pickedUpFrom: '2020-05-20 10:00:00',
               pickedUpTo: '2020-05-20 11:00:00',
               key: 1
           },
           {
               userId: 2,
               pickedUpFrom: '2020-05-20 17:00:00',
               pickedUpTo: '2020-05-20 20:00:00',
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
               pickedUpFrom: '2020-05-20 10:00:00',
               pickedUpTo: '2020-05-20 11:00:00',
               key: 1
           },
           {
               userId: 2,
               pickedUpFrom: '2020-05-20 17:00:00',
               pickedUpTo: '2020-05-20 20:00:00',
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
               pickedUpFrom: '2020-05-20 10:00:00',
               pickedUpTo: '2020-05-20 11:00:00',
               key: 1
           },
           {
               userId: 2,
               pickedUpFrom: '2020-05-20 17:00:00',
               pickedUpTo: '2020-05-20 20:00:00',
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
              pickedUpFrom: '2020-05-20 10:00:00',
              pickedUpTo: '2020-05-20 11:00:00',
              key: 1
          },
          {
              userId: 2,
              pickedUpFrom: '2020-05-20 17:00:00',
              pickedUpTo: '2020-05-20 20:00:00',
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
              pickedUpFrom: '2020-05-20 10:00:00',
              pickedUpTo: '2020-05-20 11:00:00',
              key: 1
          },
          {
              userId: 2,
              pickedUpFrom: '2020-05-20 17:00:00',
              pickedUpTo: '2020-05-20 20:00:00',
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
              pickedUpFrom: '2020-05-20 10:00:00',
              pickedUpTo: '2020-05-20 11:00:00',
              key: 1
          },
          {
              userId: 2,
              pickedUpFrom: '2020-05-20 17:00:00',
              pickedUpTo: '2020-05-20 20:00:00',
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
              pickedUpFrom: '2020-05-20 10:00:00',
              pickedUpTo: '2020-05-20 11:00:00',
              key: 1
          },
          {
              userId: 2,
              pickedUpFrom: '2020-05-20 17:00:00',
              pickedUpTo: '2020-05-20 20:00:00',
              key: 2
          },
      ],
      key: 14
  },
  {
      facilityId: 16,
      name: 'Gym Club',
      type: 'internal',
      openedDate: '2018-01-05 10:00:00',
      blocks: [1,2],
      timeslots: [
          {
              userId: 1,
              pickedUpFrom: '2020-05-20 10:00:00',
              pickedUpTo: '2020-05-20 11:00:00',
              key: 1
          },
          {
              userId: 2,
              pickedUpFrom: '2020-05-20 17:00:00',
              pickedUpTo: '2020-05-20 20:00:00',
              key: 2
          },
      ],
      key: 15
  },
  {
      facilityId: 17,
      name: 'Yoga Curtains',
      type: 'external',
      openedDate: '2018-01-06 10:00:00',
      blocks: [3,4],
      timeslots: [
          {
              userId: 1,
              pickedUpFrom: '2020-05-20 10:00:00',
              pickedUpTo: '2020-05-20 11:00:00',
              key: 1
          },
          {
              userId: 2,
              pickedUpFrom: '2020-05-20 17:00:00',
              pickedUpTo: '2020-05-20 20:00:00',
              key: 2
          },
      ],
      key: 16
  },
  {
      facilityId: 18,
      name: 'Kyak',
      type: 'internal',
      openedDate: '2018-01-07 10:00:00',
      blocks: [1,2],
      timeslots: [
          {
              userId: 1,
              pickedUpFrom: '2020-05-20 10:00:00',
              pickedUpTo: '2020-05-20 11:00:00',
              key: 1
          },
          {
              userId: 2,
              pickedUpFrom: '2020-05-20 17:00:00',
              pickedUpTo: '2020-05-20 20:00:00',
              key: 2
          },
      ],
      key: 17
  },
  {
      facilityId: 19,
      name: 'River side',
      type: 'external',
      openedDate: '2018-01-08 10:00:00',
      blocks: [3,4],
      timeslots: [
          {
              userId: 1,
              pickedUpFrom: '2020-05-20 10:00:00',
              pickedUpTo: '2020-05-20 11:00:00',
              key: 1
          },
          {
              userId: 2,
              pickedUpFrom: '2020-05-20 17:00:00',
              pickedUpTo: '2020-05-20 20:00:00',
              key: 2
          },
      ],
      key: 18
  },
  {
      facilityId: 20,
      name: 'Tennis Yard',
      type: 'internal',
      openedDate: '2018-01-09 10:00:00',
      blocks: [1,2],
      timeslots: [
          {
              userId: 1,
              pickedUpFrom: '2020-05-20 10:00:00',
              pickedUpTo: '2020-05-20 11:00:00',
              key: 1
          },
          {
              userId: 2,
              pickedUpFrom: '2020-05-20 17:00:00',
              pickedUpTo: '2020-05-20 20:00:00',
              key: 2
          },
      ],
      key: 19
  },
  {
      facilityId: 21,
      name: 'River side',
      type: 'external',
      openedDate: '2018-01-08 10:00:00',
      blocks: [3,4],
      timeslots: [
         {
            userId: 1,
            pickedUpFrom: '2020-05-20 10:00:00',
            pickedUpTo: '2020-05-20 11:00:00',
            key: 1
         },
         {
            userId: 2,
            pickedUpFrom: '2020-05-20 17:00:00',
            pickedUpTo: '2020-05-20 20:00:00',
            key: 2
         },
      ],
      key: 20
   },
   {
      facilityId: 22,
      name: 'Tennis Yard',
      type: 'internal',
      openedDate: '2018-01-09 10:00:00',
      blocks: [1,2],
      timeslots: [
         {
            userId: 1,
            pickedUpFrom: '2020-05-20 10:00:00',
            pickedUpTo: '2020-05-20 11:00:00',
            key: 1
         },
         {
            userId: 2,
            pickedUpFrom: '2020-05-20 17:00:00',
            pickedUpTo: '2020-05-20 20:00:00',
            key: 2
         },
      ],
      key: 21
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

    console.log(page, itemsPerPage)

    let data = [];

    const filterData = fakeData.filter(item => (item.name.toLowerCase()).includes(search.toLowerCase()));

    filterData.forEach((item, i) => {
        if(i >= page * itemsPerPage && i < (page + 1) * itemsPerPage) {
            data.push(item);
            console.log(i)
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

const PORT = process.env.PORT || 8080;

var server = app.listen(PORT,  (err) => {
   console.log(`Server is running on port ${PORT}`);
})