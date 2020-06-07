This project includes 2 parts: Server and Client

- Run server by script: npm start 
- Server was written in nodejs

- Run client by script: npm start
- API config at config.ts
- Interface includes two page: facility and schedule

1. Facility
- CRUD facility
- Display table/nested table of facility
- Try to delete a facility to see animation
- Cannot delete facility having id > 6 to see effects (reverse animation)
- Facility pagination

2. Schedule
- Display calendar of schedule
- Click to choose a date, a timeline chart representing schedule of that day
- Hover schedule to see tooltip