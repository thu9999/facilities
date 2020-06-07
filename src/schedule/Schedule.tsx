import React, { useState, useEffect, useCallback } from 'react';
import './Schedule.scss';
import { Calendar, Badge, Button, message } from 'antd';
import { Moment } from 'moment';
import ScheduleService from './../services/ScheduleService';
import Modal from 'antd/lib/modal/Modal';
import { ScheduleItem, FacilityItem, ScheduleFormValue } from '../interfaces';
import TimelineChart from '../TimelineChart';
import { PlusOutlined } from '@ant-design/icons';
import ScheduleForm from './ScheduleForm';
import FacilityService from '../services/FacilityService';

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

    // Timeline chart modal visibility
    const [ visible, setVisible ] = useState<boolean>(false);

    // Schedule form modal visibility
    const [ formVisibility, setFormVisibility ] = useState<boolean>(false);

    const [ schedules, setSchedules ] = useState<ScheduleItem[]>([]);
    
    const getScheduleList = useCallback(
        async () => {
            const result = await ScheduleService.getSchedules(date);
    
            console.log(result.data.data)
            setSchedules(result.data.data);
    
            setVisible(true);
    }, [date])

    useEffect(() => {

        if(date) {
            getScheduleList();
        }

    }, [date, getScheduleList])

    const handleSelect = (date: Moment) => {

        const d = date.format('yyyy-MM-DD hh:mm:ss');

        setDate(d);
    };

    /**
     * Handle event on open schedule form
     * Get list of facility items
     */
    const [ facilities, setFacilities ] = useState<FacilityItem[]>([]);

    const getFacilities = useCallback(
        async () => {
            const result = await FacilityService.getFacilityItems();
            setFacilities(result.data.data);
            setFormVisibility(true);
        }
    , []);

    const handleOpenScheduleForm = () => {
        getFacilities();
    }

    /**
     * Event on submitting schedule form
     * Create a new schedule
     */
    const handleAddSchedule = (value: ScheduleFormValue) => {

        const newValue = {...value,
            pickedUpFrom: value.pickedUpFrom.format('yyyy-MM-DD hh:mm:ss'),
            pickedUpTo: value.pickedUpTo.format('yyyy-MM-DD hh:mm:ss'),
        }

        ScheduleService.addSchedule(newValue).then(res => {
            if(res.data.data) {
                // Display successfully message
                message.success('Schedule added!');

                // Close the modal
                setFormVisibility(false);

                // Update new schedule
                const d = newValue.pickedUpFrom;
              
                setDate(d);

                getScheduleList();
            } else {
                message.error('Oops! Something went wrong!');
            }
        })
    }

    return (
        <>
            <Button type='primary' icon={<PlusOutlined />} onClick={handleOpenScheduleForm}>
                New schedule
            </Button>

            <Calendar dateCellRender={DateCellRender} onSelect={handleSelect} />

            <Modal visible={visible} footer={null} onCancel={() => setVisible(false)} width={800}>
                <div style={{textAlign: 'center', fontWeight: 600}}>SCHEDULES ON {date.slice(0,10)}</div>
                <TimelineChart schedules={schedules} />
            </Modal>

            <Modal visible={formVisibility} footer={null} onCancel={() => setFormVisibility(false)} width={800}>
                <ScheduleForm facilities={facilities} handleOk={handleAddSchedule} />
            </Modal>

  
        </>
    );
}

export default Schedule;