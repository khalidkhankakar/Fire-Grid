export const CATEGORY_FILTER = {
    type: 'category',
    data: [
        {
            Text: 'School',
            value: 'scholl'
        },
        {
            Text: 'Work',
            value: 'work'
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
           Text: 'A hour ago',
            value:'a_hour'
        },
        {
            Text: 'A day ago',
            value: 'a_day'
        },
        {
            Text: '3 days ago',
            value: '3_days'
        },
        {
            Text: 'A week ago',
            value: 'a_week'
        },
        {
            Text: 'A month ago',
            value: 'a_month'
        },
        {
            Text: 'A year ago',
            value: 'a_year'
        },

    ]
}
export const ORDER_FILTER = {
    type: 'order',
    data: [
        {
            Text: 'Ascending',
            value: 'asc'
        },
        {
            Text: 'Descending',
            value: 'desc'
        },

    ]
}



export const backgroundArray = [
    "/assets/img1.jpg",
    "/assets/img2.jpg",
    "/assets/img3.jpg",
];


export const BOARDS_PER_PAGE = 10



export const dummyColumns = [
    {
      title: "Concept",
      items: [
        { title: "Huddle Template - [Presenter(s)] - [Project]", content: "" },
        { title: "Video Call Link", content: "Link: zoom.us/" },
        { title: "Design Prototype Link", content: "Link: www.figma.com/" }
      ]
    },
    {
      title: "Notes",
      items: [
        { title: "General Notes:", content: "--" },
        { title: "--", content: "" }
      ]
    },
    {
      title: "Potential Blockers",
      items: [
        { title: "Blocker", content: "" }
      ]
    },
    {
      title: "Positives",
      items: [
        { title: "👍 Positive [I really liked...]", content: "This card is a template." },
        { title: "Action Items", content: "" },
        { title: "👍 Positive [I really liked...]", content: "" }
      ]
    },
    {
      title: "Negatives",
      items: [
        { title: "👎 Negative [I'm not sure about...]", content: "This card is a template." }
      ]
    }
  ]