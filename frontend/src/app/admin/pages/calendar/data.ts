import { EventInput } from '@fullcalendar/core';

let eventGuid = 0;
export function createEventId() {
    return String(eventGuid++);
}

const category = [
    {
        name: 'Danger',
        value: 'bg-danger'
    },
    {
        name: 'Success',
        value: 'bg-success'
    },
    {
        name: 'Primary',
        value: 'bg-primary'
    },
    {
        name: 'Info',
        value: 'bg-info'
    },
    {
        name: 'Dark',
        value: 'bg-dark'
    },
    {
        name: 'Warning',
        value: 'bg-warning'
    },
];

var date = new Date();
var d = date.getDay();
var m = date.getMonth();
var y = date.getFullYear();
const calendarEvents: EventInput[] = [
    {
        id: createEventId(),
        title: 'Meeting',
        formation: "jaava zero to zero ",
        trainer: "mrwan ",
        company: "f9ihbnsalh",
        start: new Date().setDate(new Date().getDate() + 1),
        end: new Date().setDate(new Date().getDate() + 2),
        className: 'bg-warning text-white',
    },
    // {
    //     id: createEventId(),
    //     title: 'Lunch',
    //     start: new Date().setHours(12, 0, 0),
    //     end: new Date().setHours(new Date().getHours() + 1),
    //     className: 'bg-success text-white',
    // },
    // {
    //     id: createEventId(),
    //     title: 'Birthday - party',
    //     start: new Date().setDate(new Date().getDate() + 8),
    //     className: 'bg-info text-white',
    // },
    // {
    //     id: createEventId(),
    //     title: 'Long Event',
    //     start: new Date().setDate(new Date().getDate() + 7),
    //     end: new Date().setDate(new Date().getDate() + 8),
    //     className: 'bg-primary text-white'
    // }
];

export { category, calendarEvents };
