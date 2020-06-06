import React, { useState, useEffect } from 'react';
import './Facility.scss';
import { Row, Col, Button, message, Input } from 'antd';
import FacilityTable from '../facility-table/FacilityTable';
import { PlusOutlined } from '@ant-design/icons';
import Debounce from './../Debounce';
import FacilityService from './../services/FacilityService';
import { FacilityFormValue } from '../interfaces';
import FacilityForm from '../facility-form/FacilityForm';

const { Search } = Input;

const delayTime = 500;

function Facility() {

    // Facility list
    const [facilities, setFacilities] = useState([]);

    // Total number of facilities
    const [total, setTotal] = useState<number>(23);

    // Facility pagination
    const [page, setPage] = useState(0);

    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Search value
    const [searchValue, setSearchValue] = useState<string>('');

    // Facility form visible
    const [visible, setVisible] = useState<boolean>(false);

    // Facility table is loading data
    const [facilityLoading, setFacilityLoading] = useState<boolean>(false);

    // Debounce search value
    const debounceSearchValue = Debounce({value: searchValue, delay: delayTime});

    useEffect(() => {
        fetchFacilities();
    }, [page, itemsPerPage, debounceSearchValue]);

    /**
     * Get list of facilities
     */
    const fetchFacilities  = async () => {

        // Set facility loading status 
        setFacilityLoading(true);

        const result = await FacilityService.getFacilities(page, itemsPerPage, debounceSearchValue);

        // Update facility loading status to false
        setFacilityLoading(false);

        // Update new list of facilities
        setFacilities(result.data.data);

        // Update total number of facilities
        setTotal(result.data.total);
    };

    // Event on pagination change
    const handlePaginationChange = (page: number) => {
        setPage(page - 1);
    }

    // Event on page size changes
    const handlePageSizeChange = (current: number, size: number) => {
        setPage(0);
        setItemsPerPage(size);
    }


    // Event on facility search
    // Reset page to first one
    const handleFacilitySearch = (event: any) => {
        const value = event.target.value;
        setSearchValue(value);
        setPage(0);
    }

    // Handle event on creating a new facility
    const handleFacilityCreated = (data: FacilityFormValue) => {
        FacilityService.createFacility(data).then(res => {

            // Create new facility successfully
            if(res.data.data) {
                // Notify successfully
                message.success('New facility added!', 1);

                // Close the form
                setVisible(false);

                // Update facility list
                fetchFacilities();
            } else {
                 // Notify error
                 message.error('Something went wrong!', 1);
            }
        })
    }

    // Handle event on deleting a facility having id
    // Delete facility and update new list of facility
    const handleFacilityDeleted = (id: number) => {
        FacilityService.deleteFacility(id).then(res => {
            // Delete facility having id successfully
            if(res.data.data) {
                // Display successful message
                message.success('Delete facility successfully!', 1)

                // Update new list of facilities
                fetchFacilities();
            } else {
                /**
                 *  Something went wrong
                 *  Display error message
                 */
                message.error('Oops! Something went wrong!', 1);
            }
        })
    }
    
    return (
        <>
            <Row gutter={[16, 16]}>
                <Col span={8} className='facility-title'>
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => {
                        setVisible(true);
                    }} >New facility</Button>
                </Col>

                <Col span={8}>
                    <Search placeholder="Search for facility" enterButton value={searchValue} onChange={handleFacilitySearch} />
                </Col>
            </Row>

                <p>{visible}</p>

            <FacilityForm visible={visible} handleOk={handleFacilityCreated} handleCancel={() => {
                setVisible(false);
            }} />

            <FacilityTable 
                facilities={facilities} 
                total={total} 
                loading={facilityLoading}  
                onFacilityPagination={handlePaginationChange} 
                onPageSizeChange={handlePageSizeChange}
                onFacilityDeleted={handleFacilityDeleted}
            />
        </>
    );
}

export default Facility;