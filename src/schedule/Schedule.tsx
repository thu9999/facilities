import React, { useState, useEffect, useCallback } from 'react';
import './Schedule.scss';
import { Calendar, Badge } from 'antd';
import { Moment } from 'moment';
import ScheduleService from './../services/ScheduleService';
import Modal from 'antd/lib/modal/Modal';
import { ScheduleItem } from '../interfaces';
import TimelineChart from '../TimelineChart';

export const DateCellRender = (date: Moment) => {

    const d = date.format('yyyy-MM-DD hh:mm:ss');

    const [ schedules, setSchedules ] = useState<ScheduleItem[]>([]);

    const getScheduleList = useCallback(
        async () => {
            const result = await ScheduleService.getSchedules(d);
    
            setSchedules(result.data.data);
    }, [d])

    useEffect(() => {
        getScheduleList();
    }, [d, getScheduleList])

    return (
        <ul className='events'>
            {schedules?.map(item => (
                <li key={item.facility}>
                    <Badge status={item.type} text={item.facility}/>
                </li>
            ))}
        </ul>
    )
}

const Schedule = () => {

    const [ date, setDate ] = useState<string>('');

    const [ visible, setVisible ] = useState<boolean>(false);

    const [ schedules, setSchedules ] = useState<ScheduleItem[]>([]);
    
    const getScheduleList = useCallback(
        async () => {
            const result = await ScheduleService.getSchedules(date);
    
            setSchedules(result.data.data);
    
            setVisible(true);
    }, [date])

    useEffect(() => {

        if(date) {
            getScheduleList();
        }

    }, [date, getScheduleList])

    const handleSelect = (date: Moment) => {

        console.log('select')

        const d = date.format('yyyy-MM-DD hh:mm:ss');

        setDate(d);
    }

    return (
        <>
            <Calendar dateCellRender={DateCellRender} onSelect={handleSelect} />

            <Modal visible={visible} footer={null} onCancel={() => setVisible(false)} width={800}>
                <div style={{textAlign: 'center', fontWeight: 600}}>SCHEDULES ON {date.slice(0,10)}</div>
                <TimelineChart schedules={schedules} />
            </Modal>
        </>
    );
}

export default Schedule;