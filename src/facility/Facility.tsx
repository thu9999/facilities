import React, { useState, useEffect, useCallback } from 'react';
import './Facility.scss';
import { Row, Col, Button, message, Input } from 'antd';
import FacilityTable from '../facility-table/FacilityTable';
import { PlusOutlined } from '@ant-design/icons';
import Debounce from './../Debounce';
import FacilityService from './../services/FacilityService';
import { FacilityFormValue, FacilityInterface } from '../interfaces';
import FacilityForm from '../facility-form/FacilityForm';
import FacilityEditedForm from '../facility-edit-form/FacilityEditedForm';
import Modal from 'antd/lib/modal/Modal';

const { Search } = Input;

const delayTime = 500;

function Facility() {

    // Facility list
    const [facilities, setFacilities] = useState<FacilityInterface[]>([]);

    // A facility item
    const [facility, setFacility] = useState<FacilityInterface>();

    // Total number of facilities
    const [total, setTotal] = useState<number>(23);

    // Facility pagination
    const [page, setPage] = useState(0);

    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Search value
    const [searchValue, setSearchValue] = useState<string>('');

    // Facility form visible
    const [visible, setVisible] = useState<boolean>(false);

    // Facility edited form visible
    const [editedVisible, setEditedVisible] = useState(false);

    // Facility table is loading data
    const [facilityLoading, setFacilityLoading] = useState<boolean>(false);

    // Debounce search value
    const debounceSearchValue = Debounce({value: searchValue, delay: delayTime});

        /**
     * Get list of facilities
     */
    const fetchFacilities  = useCallback(
        async () => {

            // Set facility loading status 
            setFacilityLoading(true);
    
            const result = await FacilityService.getFacilities(page, itemsPerPage, debounceSearchValue);
    
            // Update facility loading status to false
            setFacilityLoading(false);
    
            // Update new list of facilities
            setFacilities(result.data.data);
    
            // Update total number of facilities
            setTotal(result.data.total);
    }, [debounceSearchValue, itemsPerPage, page]);


    useEffect(() => {
        fetchFacilities();
    }, [page, itemsPerPage, debounceSearchValue, fetchFacilities]);

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

    // Handle event on editing a facility having id
    const handleFacilityEdited = (id: number) => {

        // Get facility data
        FacilityService.getFacility(id).then(res => {
            if(res.data.data) {
                setFacility(res.data.data);

                // Open edited facility form
                setEditedVisible(true);
            } else {
                // Display error
                message.error('Oops! Something went wrong.')
            }
          
        })
    }

    // Handle event on edited ok
    const handleFacilityEditedOk = (values: FacilityInterface) => {
        FacilityService.updateFacility(facility?.facilityId, values).then(res => {
            
            // Update facility successfully
            if(res.data.data) {
                // Display successfully message
                message.success('Facility has been updated successfully!', 1);

                // Close the edited form
                setEditedVisible(false);

                // Update new list
                fetchFacilities();

            } else {
                // Display error message
                message.error('Facility has not been updated yet!', 1);
            }
        })
    }

    // Handle event on deleting a facility having id
    // Delete facility and update new list of facility
    const handleFacilityDeleted = (id: number, tl: any) => {
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

                // Reverse timeline 
                tl.reverse();
                
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

            <Modal
                title='NEW FACILITY'
                footer={null}
                closable={true}
                visible={visible}
                onCancel={() => {
                    setVisible(false)
                }}
            >
                <FacilityForm handleOk={handleFacilityCreated} />
            </Modal>

            <Modal
                title='EDIT FACILITY'
                footer={null}
                closable={true}
                visible={editedVisible}
                onCancel={() => {
                    setEditedVisible(false)
                }}
            >
                <FacilityEditedForm facility={facility} handleOk={handleFacilityEditedOk} />
            </Modal>

            <FacilityTable 
                facilities={facilities} 
                total={total} 
                loading={facilityLoading}  
                onFacilityPagination={handlePaginationChange} 
                onPageSizeChange={handlePageSizeChange}
                onFacilityEdited={handleFacilityEdited}
                onFacilityDeleted={handleFacilityDeleted}
            />
        </>
    );
}

export default Facility;