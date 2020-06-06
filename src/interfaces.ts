export interface AppRoute {
    id: number
    path: string,
    title: string
    component: React.FC
}

export interface AppMenu {
    id: number 
    title: string 
    icon: React.ReactElement
    route: string
}

export interface FacilityFormProp {
    handleOk(data: FacilityFormValue): void 
}

export interface TimeSlot {
    userId: number 
    pickedUpFrom: string 
    pickedUpTo: string
}

export interface TimeSlot {
    userId: number 
    pickedUpFrom: string 
    pickedUpTo: string
    key: number
}

export interface FacilityInterface {
    facilityId: number 
    name: string 
    type: string 
    openedDate: string 
    blocks: number[]
    timeslots: TimeSlot[]
    key: number
};

export interface FacilityProps {
    facilities: FacilityInterface[]
    total: number
    loading: boolean
    onFacilityPagination(page: number): void
    onPageSizeChange(current: number, size: number): void
    onFacilityEdited(id: number): void
    onFacilityDeleted(id: number, tl: any): void
}

export interface FacilityEditedFormValue {
    facility: FacilityInterface | undefined,
    handleOk(data: FacilityFormValue): void 
}

export interface NestedTableProps {
    data: TimeSlot[]
}

export interface DebounceInterface {
    value: string 
    delay: number
}

export interface FacilityFormValue {
    name: string 
    type: string 
    blocks: number[]
}
