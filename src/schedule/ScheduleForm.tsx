import React from 'react';
import { ScheduleFormProp, ScheduleFormValue } from '../interfaces';
import './ScheduleForm.scss';
import { Form, Button, Select, DatePicker } from 'antd';

const { Option } = Select;

const initialValues: ScheduleFormValue = {
    facilityId: 0, 
    userId: 1, 
    pickedUpFrom: '',
    pickedUpTo: ''
}

export interface User {
    userId: number 
    name: string
}

// Hardcoded user list
const users: User[] = [
    { userId: 1, name: 'Jack' },
    { userId: 2, name: 'Ernest' },
    { userId: 3, name: 'Tom' },
    { userId: 4, name: 'Taylor' },
    { userId: 5, name: 'Lin' },
]

const ScheduleForm = (props: ScheduleFormProp) => {

    const { facilities, handleOk } = props;

    const [form] = Form.useForm();

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    return (
        <>
            <div className='schedule-form-title'>ADD NEW SCHEDULE</div>
            <Form
                {...layout}
                name='schedule'
                initialValues={initialValues}
                form={form}
            >
                <Form.Item
                    label='Facility'
                    name='facilityId'
                    rules={[{ required: true, message: 'Please select a facility!' }]}
                >
                    <Select style={{ width: '100%' }} placeholder='Select facility'>
                        {facilities?.map((facility) => <Option key={facility.facilityId} value={facility.facilityId}>{facility.name}</Option>)}
                    </Select>
                </Form.Item>

                <Form.Item
                    label='User'
                    name='userId'
                    rules={[{ required: true, message: 'Please select a user!' }]}
                >
                    <Select style={{ width: '100%' }} placeholder='Select user'>
                        {users?.map(user => <Option key={user.userId} value={user.userId}>{user.name}</Option>)}
                    </Select>
                </Form.Item>

                <Form.Item 
                    label='From' 
                    name='pickedUpFrom'
                    rules={[{ required: true, message: 'Please select datetime!' }]}
                >
                    <DatePicker showTime />
                </Form.Item>

                <Form.Item 
                    label='To' 
                    name='pickedUpTo'
                    rules={[{ required: true, message: 'Please select datetime!' }]}
                >
                    <DatePicker showTime/>
                </Form.Item>

                <div className='submit-button'>
                    <Button type='primary' onClick={() => {
                        const value = form.getFieldsValue() as ScheduleFormValue;
                        handleOk(value);
                    }}>Submit</Button>
                </div>

            </Form>
        </>
    );
}

export default ScheduleForm;