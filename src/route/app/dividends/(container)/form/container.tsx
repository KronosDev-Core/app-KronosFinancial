import { useMutation, useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

import AppStore from '@Store/index';
import { Dividend } from '@Types/index';
import { getOneDividend } from '@Lib/api/dividend';
import DayJs from '@Utils/DayJs';
import { createBuy } from '@Lib/api/buy';
import Loader from '@Components/loader';
import Input from '@Components/input';
import CompanyIcon from '@Assets/icons/Company';
import ShopIcon from '@Assets/icons/Shop';
import MoneyIcon from '@Assets/icons/Money';
import Button from '@Components/button';

const schema = z
  .object({
    company: z.string(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    amount: z.number().nonnegative(),
    price: z.number().nonnegative(),
  })
  .required();
type formData = z.infer<typeof schema>;

export default function FormContainer() {
  const [calendarDividend] = useAtom(AppStore.calendar.dividend);

  const {
    register,
    setValue,
    reset,
    formState: { errors },
    handleSubmit,
    getValues,
    watch,
  } = useForm<formData>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
  });

  const { data, isSuccess, isFetching } = useQuery<Dividend>({
    queryKey: ['Dividend', calendarDividend],
    queryFn: ({ queryKey: [, id] }) => getOneDividend(id as string),
    enabled: !!calendarDividend,
    onError: (error) => console.log(error),
    onSuccess: (data) => {
      setValue('company', data.stock.name);
      setValue('date', DayJs().format('YYYY-MM-DD'));
      setValue('amount', 100);
      setValue('price', data.stock.price);
    },
    refetchOnWindowFocus: false,
  });

  const createBuyMutation = useMutation({
    mutationKey: ['CreateBuy'],
    mutationFn: createBuy,
    onSuccess: () => {},
  });

  const resetForm = () =>
    reset({
      company: data?.stock.name || '',
      date: DayJs().format('YYYY-MM-DD') || '',
      amount: 100,
      price: data?.stock.price || 0,
    });

  const onSubmit = () => {
    if (isSuccess && !isFetching)
      createBuyMutation.mutate({
        date: getValues('date'),
        amount: getValues('amount'),
        price: getValues('price'),
        dividendId: data.id,
      });

      resetForm();
  };

  return (
    <div className="row-span-2 col-span-2 bg-slate-800 rounded-lg grid grid-cols-2 grid-rows-2 p-4 w-full h-full">
      {isFetching && <Loader />}
      {isSuccess && !isFetching && (
        <>
          <div className="col-span-2 row-span-1 grid grid-cols-1 grid-rows-3">
            <p className="text-center text-2xl">Buy {data.stockSymbol} stock</p>
            <p className="row-span-2">
              {`If you purchase $${watch('amount')} of ${
                data.stockSymbol
              } stock, the dividend value per share is $${
                data.dividendPerShare
              }, you will receive a $${
                watch('price')
                  ? String(
                      (
                        (watch('amount') / watch('price')) *
                        data.dividendPerShare *
                        0.7
                      ).toFixed(2),
                    )
                  : '0'
              } dividend (30% tax)${
                DayJs(watch('date')).format('YYYY-MM-DD') === 'Invalid Date'
                  ? '.'
                  : ` on ${DayJs(watch('date')).format('YYYY-MM-DD')}.`
              }`}
            </p>
          </div>

          <div className="col-span-2 row-span-1 grid grid-cols-2 grid-rows-3">
            <Input
              name="company"
              placeholder="Company"
              error={errors.company}
              disabled
              register={register}
            >
              <CompanyIcon className="h-5 w-5 fill-slate-200 m-auto" />
            </Input>
            <Input
              name="date"
              placeholder="Date of purchase"
              error={errors.date}
              register={register}
            >
              <ShopIcon className="h-6 w-6 fill-slate-200 m-auto" />
            </Input>
            <Input
              name="amount"
              placeholder="Purchase amount"
              error={errors.amount}
              register={register}
              type="number"
            >
              <MoneyIcon className="h-6 w-6 fill-slate-200 m-auto" />
            </Input>
            <Input
              name="price"
              placeholder="Price at the time of purchase"
              error={errors.price}
              register={register}
              type="number"
            >
              <MoneyIcon className="h-6 w-6 fill-slate-200 m-auto" />
            </Input>

            <div className="flex w-full h-full justify-end p-2">
              <Button className="w-fit" callback={handleSubmit(onSubmit)}>
                <span className="text-slate-200">Add</span>
              </Button>
            </div>

            <div className="flex w-full h-full justify-start p-2">
              <Button className="w-fit" callback={resetForm}>
                <span className="text-slate-200">Cancel</span>
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
