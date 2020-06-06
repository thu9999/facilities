import React from 'react';
import { FacilityEditedFormValue, FacilityInterface } from '../interfaces';
import { Form, Input, Button, Select, Tooltip, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './FacilityEditForm.scss';
import moment from 'moment';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 }
};

const blocks: number[] = [1,2,3,4,5,6]

const FacilityEditedForm = (props: FacilityEditedFormValue) => {

    const { facility, handleOk } = props;

    const [form] = Form.useForm();
    
    return (
        <Form
            { ...layout}
            name='facility-edited'
            initialValues={{...facility, openedDate: moment(facility?.openedDate), timeslots: facility?.timeslots.map(timeslot => {
                return {
                    ...timeslot,
                    pickedUpFrom: moment(timeslot.pickedUpFrom),
                    pickedUpTo: moment(timeslot.pickedUpTo)
                }
            })}}
            form={form}
        >
            <Form.Item
                label='Name'
                name='name'
                rules={[{ required: true, message: 'Please input facility name!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label='Type'
                name='type'
                rules={[{ required: true, message: 'Please input facility type!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label='Opened Date'
                name='openedDate'
            >
                <DatePicker showTime={true} />
            </Form.Item>

            <Form.Item label='Blocks' name='blocks'>
                <Select mode='multiple' maxTagCount={5} showArrow={true}>
                    {blocks ? blocks.map(block => <Select.Option key={block} value={block}>{block}</Select.Option>) : false}
                </Select>
            </Form.Item>

            <Form.Item
                label='Key'
                name='key'
                rules={[{ required: true, message: 'Please input key!' }]}
            >
                <Input />
            </Form.Item>

            <Form.List name='timeslots'>
                {(fields, { add, remove }) => {
                                    
                    return(
                        <>
                            <div>
                                <span style={{paddingRight: '8px'}}>TIMESLOTS</span>
                                <Tooltip title='New timeslot'>
                                    <Button type='primary' shape='circle' icon={<PlusOutlined />} onClick={() => {
                                        add();
                                    }} />
                                </Tooltip>
                            </div>

                            {fields.map((field, index) => (
                                <div className='time-slot' key={field.key}>
                                    <Form.Item 
                                        { ...layout}
                                        label='User ID'
                                        name={[field.fieldKey, 'userId']}
                                        rules={[{ required: true, message: 'Please input user ID!' }]}
                                    >
                                        <Input style={{width: '100%'}} />
                                    </Form.Item>

                                    <Form.Item 
                                        { ...layout}
                                        label='PickedUp From'
                                        name={[field.fieldKey, 'pickedUpFrom']}
                                    >
                                        <DatePicker showTime={true} />
                                    </Form.Item>

                                    <Form.Item 
                                        { ...layout}
                                        label='PickedUp To'
                                        name={[field.fieldKey, 'pickedUpTo']}
                                    >
                                        <DatePicker showTime={true} />
                                    </Form.Item>

                                    <Form.Item 
                                        { ...layout}
                                        label='Key'
                                        name={[field.fieldKey, 'key']}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <div className='remove-button'><Button danger onClick={() => {
                                        remove(field.name)
                                    }}>Remove</Button></div>

                                </div>
                            ))}
                        </>
                    )
                }}
            </Form.List>

            <Form.Item {...tailLayout}>
                <Button type='primary' htmlType='submit' onClick={() => {
                    const value = form.getFieldsValue() as FacilityInterface;
                    handleOk(value);
                }}>Submit</Button>
            </Form.Item>
        </Form>
    );
}

export default FacilityEditedForm;