import { rest } from "msw";
import { wait } from "../utils";

export const loads = rest.get(`/carriers/loads`, async (req, res, ctx) => {
  const {
    url: { searchParams },
  } = req;
  const params = Object.fromEntries(searchParams);

  const data = [
    {
      id: "1",
      origin: {
        country: "mx",
        location: "Mexico",
      },
      destination: {
        country: "mx",
        location: "Nuevo Laredo",
      },
      deliveredDate: "13 Feb, 14:25",
      ammount: 1400,
      currency: "mxn",
      status: "Upload documents",
      lineItems: [],
    },

    {
      id: "AT-152302",
      origin: {
        country: "mx",
        location: "Mexico",
      },
      destination: {
        country: "mx",
        location: "Nuevo Laredo",
      },
      deliveredDate: "12 Feb, 08:30",
      ammount: 1380,
      status: "Rejected",
      lineItems: [
        {
          id: "xxx123",
          ammount: 400,
          currency: "mxn",
          type: "additional",
          status: "Rejected",
        },
      ],
    },
    {
      id: "AT-152303",
      origin: {
        country: "mx",
        location: "Mexico",
      },
      destination: {
        country: "mx",
        location: "Nuevo Laredo",
      },
      deliveredDate: "10 Feb, 13:50",
      ammount: 775,
      status: "Pending Approval",
      lineItems: [],
    },
    {
      id: "AT-152304",
      origin: {
        country: "mx",
        location: "Mexico",
      },
      destination: {
        country: "mx",
        location: "Nuevo Laredo",
      },
      deliveredDate: "10 Feb, 13:51",
      ammount: 1775,
      status: "Paid",
      lineItems: [],
    },
  ];

  const pageNumber = Number(params["page[number]"]);
  const pageSize = Number(params["page[size]"]);

  const loads = data.slice(
    pageNumber === 0 ? pageNumber : pageNumber * pageSize,
    pageNumber * pageSize + pageSize
  );

  await wait();

  return res(
    ctx.status(200),
    ctx.json({
      metadata: {
        currentPage: pageNumber,
        totalPages: Math.ceil(data.length / pageSize),
        totalRecords: data.length,
      },
      loads,
    })
  );
});
