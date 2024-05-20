import { IPayment, PaymentStatus } from 'src/app/models/payment';

export const PaymentMock: IPayment = {
  id: '3248-523DaW-23FW3-324aDW',
  items: [
    {
      id: '3248-523DaW-23FW3-324aDW',
      name: 'Superworld land in Paris',
      address: '0x85309daw8ADw093240awdawd80842lplg',
      amount: [
        {
          currency: 'USD',
          amount: 1234,
          keyCurrency: true,
        },
        {
          currency: 'ETH',
          amount: 0.9,
          keyCurrency: false,
        },
      ],
    },
  ],
  target: '324DAw-d0234f-FAw9hh-g80dwad-alpk4',
  from: '324DAwd0-234faw-FAw9hh-g80dw-adal-pk4',
  date: new Date(),
  status: PaymentStatus.pending,
  totals: [
    {
      currency: 'USD',
      amount: 1234,
      keyCurrency: true,
    },
    {
      currency: 'ETH',
      amount: 0.9,
      keyCurrency: false,
    },
  ],
};
