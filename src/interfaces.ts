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

export interface ScheduleItem {
    type: 'warning' | 'success' | 'error' | 'processing' | 'default' | undefined
    facility: string 
    userId: number 
    range: [number, number]
}

export interface TimelineProp {
    schedules: ScheduleItem[]
}


export interface TimelineData {
    name: string 
    from: number 
    to: number
}

export interface TimelineOptions {
    margin: Margin
    title: string 
}

export interface Margin {
    top: number 
    right: number 
    bottom: number 
    left: number
}

export interface FacilityItem {
    facilityId: number 
    name: string
}

export interface ScheduleFormProp {
    facilities: FacilityItem[]
    handleOk(value: ScheduleFormValue): void
}

export interface ScheduleFormValue {
    facilityId: number 
    userId: number  
    pickedUpFrom: any
    pickedUpTo: any
}

export interface ScheduleValue {
    facilityId: number 
    userId: number  
    pickedUpFrom: string
    pickedUpTo: string
}