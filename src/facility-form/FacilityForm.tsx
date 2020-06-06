import React from 'react';
import './FacilityForm.scss';
import { Form, Input, Button, Select } from 'antd';
import { FacilityFormProp, FacilityFormValue } from '../interfaces';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 }
};

const initialValues = {
    name: '',
    type: '', 
    blocks: [],
};

const blocks: number[] = [1,2,3,4,5,6]

const FacilityForm = (props: FacilityFormProp) => {

    const { handleOk } = props;

    const [form] = Form.useForm();

    return (
        <Form
            { ...layout }
            name='basic'
            initialValues={initialValues}
            form={form}
        >
            <Form.Item
                label='Name'
                name='name'
                rules={[{ required: true, message: `Please input facility's name!` }]}
            >
                <Input placeholder='Facility' />
            </Form.Item>

            <Form.Item
                label='Type'
                name='type'
                rules={[{ required: true, message: `Please input facility's type!` }]}
            >
                <Input placeholder='Type' />
            </Form.Item>

            <Form.Item label='Blocks' name='blocks'>
                <Select mode='multiple' maxTagCount={5} showArrow={true}>
                    {blocks ? blocks.map(block => <Select.Option key={block} value={block}>{block}</Select.Option>) : false}
                </Select>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type='primary' htmlType='submit' onClick={() => {
                    const value = form.getFieldsValue() as FacilityFormValue;
                    handleOk(value);
                }}>Submit</Button>
            </Form.Item>

        </Form>
    );
}

export default FacilityForm;