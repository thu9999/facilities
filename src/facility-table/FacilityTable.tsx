import React, { useState } from 'react';
import './FacilityTable.scss';
import { Table, Tag, Space, Button, Pagination, Tooltip, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { FacilityProps, TimeSlot, NestedTableProps, FacilityInterface } from '../interfaces';
import avatar from './../images/avatar.png';
import avatar1 from './../images/avatar1.png';

const FacilityTable = (props: FacilityProps) => {

    const { facilities, total, loading, onFacilityPagination, onPageSizeChange, onFacilityDeleted } = props;

    const columns = [
        {
            title: '#',
            dataIndex: 'facilityId',
            render: (facilityId: number) => <span>{facilityId}</span>
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            render: (type: string) => <Tag color={type === 'internal' ? 'green' : 'magenta'}>{type.toUpperCase()}</Tag>
        },
        {
            title: 'Opened Date',
            dataIndex: 'openedDate',
            render: (date: string) => {
                const arr = date.split(' ');
                return <span>{arr[0]}</span>
            }
        },
        {
            title: 'Opened Time',
            dataIndex: 'openedDate',
            render: (date: string) => {
                const arr = date.split(' ');
                return <span>{arr[1]}</span>
            }
        },
        {
            title: 'Blocks',
            dataIndex: 'blocks',
            key: 'blocks',
            render: (blocks: number[]) => <>{blocks.map((block, index) => <Tag key={index} color='#2db7f5'>{block}</Tag>)}</>
        },
        {
            title: 'Timeslots',
            dataIndex: 'timeslots',
            render: (slots: TimeSlot[]) => 
            <div className='avatar-container'>
            {slots.map((slot,i) => <img key={i} src={i === 0 ? avatar : avatar1 } alt='avatar' className='timeslot-avatar next-avatar' style={{transform: `translateX(-${i * 16}px)`}} />)}
            </div>
        },
        {
            title: 'Actions',
            dataIndex: 'facilityId',
            key: 'action',
            render: (facilityId: number) => 
                <>
                    <Tooltip title="Edit">
                        <Button className='action-button' shape='circle' icon={<EditOutlined />} style={{backgroundColor: '#2db7f5', color: '#fff'}} /> 
                    </Tooltip>

                    <Tooltip title="Delete">
                        <Popconfirm placement="bottom" title='Are you sure to delete the facility?' onConfirm={() => onFacilityDeleted(facilityId)} okText="Yes" cancelText="No">
                            <Button className='action-button' shape='circle' icon={<DeleteOutlined/>} type="primary" danger />
                        </Popconfirm>
                    </Tooltip>
                </>
        }
    ];
    
    const nestedColumns = [
        { 
            title: '#', 
            dataIndex: 'userId',
            key: 'userId',
            render: (userId: number) => <span>{userId}</span>
        },
        { 
            title: 'User', 
            dataIndex: 'userId', 
            key: 'userId',
            render: () => <img src={avatar} alt='avatar' className='timeslot-avatar' />
        },
        { 
            title: 'Date', 
            dataIndex: 'pickedUpFrom', 
            key: 'pickedUpFrom',
            render: (date: string) => <span>{(date.split(' '))[0]}</span> 
        },
        { 
            title: 'From', 
            dataIndex: 'pickedUpFrom',
            key: 'pickedUpFrom',
            render: (date: string) => <span>{(date.split(' '))[1]}</span> 
        },
        { 
            title: 'To', 
            dataIndex: 'pickedUpTo',
            key: 'pickedUpTo',
            render: (date: string) => <span>{(date.split(' '))[1]}</span> 
        },
        {
            title: 'Status',
            dataIndex: '',
            render: () => <Tag color="#87d068">UPCOMMING</Tag>
        }
    ];
    
    const expandable = {
        expandedRowRender: (facility: FacilityInterface) => <Table columns={nestedColumns} dataSource={facility.timeslots} pagination={false} />,
    }

    return (
        <>
            <Table columns={columns} dataSource={facilities} expandable={expandable} pagination={false} loading={loading} />

            <div className='facility-pagination'>
                <Pagination showQuickJumper showSizeChanger defaultCurrent={1} total={total} onChange={onFacilityPagination} onShowSizeChange={onPageSizeChange} />
            </div>
        </>
    );
}

export default FacilityTable;