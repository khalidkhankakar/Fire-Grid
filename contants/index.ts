export const CATEGORY_FILTER = {
    type: 'category',
    data: [
        {
            Text: 'School',
            value: 'scholl'
        },
        {
            Text: 'College',
            value: 'college'
        },
        {
            Text: 'University',
            value: 'university'
        }
    ]
}

export const DATETIME_FILTER = {
    type: 'datatime',
    data: [
        {
            Text: 'A day ago',
            value: 'a_day'
        },
        {
            Text: 'A week ago',
            value: 'a_week'
        },
        {
            Text: 'A month ago',
            value: 'a_month'
        },

    ]
}
export const ORDER_FILTER = {
    type: 'order',
    data: [
        {
            Text: 'All',
            value: 'all'
        },
        {
            Text: 'Ascending',
            value: 'asc'
        },
        {
            Text: 'Descending',
            value: 'decs'
        },

    ]
}