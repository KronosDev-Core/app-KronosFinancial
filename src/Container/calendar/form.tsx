import { useMutation, useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { FC, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

import Input from '@Components/Template/input';
import Loader from '@Components/Template/loader';
import context from '@Context/index';
import { getOneDividende } from '@Local/api/dividende';
import CompanyIcon from '@SVG/Company';
import MoneyIcon from '@SVG/Money';
import ShopIcon from '@SVG/Shop';
import { Dividende } from '@Types/index';
import DayJs from '@Utils/DayJs';
import Button from '@Components/Template/button';
import { createBuy } from '@Local/api/buy';

const schema = z
  .object({
    company: z.string(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    amount: z.number().nonnegative(),
    price: z.number().nonnegative(),
  })
  .required();

const FormContainer: FC = (): JSX.Element => {
  const [calendarDividend, setCalendarDividend] = useAtom(
    context.calendar.dividende,
  );

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    getValues,
    watch,
  } = useForm<{
    company: string;
    date: string;
    amount: number;
    price: number;
  }>({
    resolver: zodResolver(schema),
  });

  const { data, isSuccess, isFetching } = useQuery<Dividende>({
    queryKey: ['Dividende', calendarDividend],
    queryFn: ({ queryKey: [, id] }) => getOneDividende(id as string),
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
    console.log(
      getValues('price'),
      typeof getValues('price'),
      getValues('amount'),
      typeof getValues('amount'),
    );
    if (isSuccess && !isFetching)
      createBuyMutation.mutate({
        date: getValues('date'),
        amount: getValues('amount'),
        price: getValues('price'),
        dividendeId: data.id,
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
                data.dividendePerShare
              }, you will receive a $${
                watch('price')
                  ? String(
                      (
                        (watch('amount') / watch('price')) *
                        data.dividendePerShare *
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
              error={errors.company?.message || ''}
              disabled
              register={register}
            >
              <CompanyIcon className="h-5 w-5 fill-slate-200 m-auto" />
            </Input>
            <Input
              name="date"
              placeholder="Date of purchase"
              error={errors.date?.message || ''}
              register={register}
            >
              <ShopIcon className="h-6 w-6 fill-slate-200 m-auto" />
            </Input>
            <Input
              name="amount"
              placeholder="Purchase amount"
              error={errors.amount?.message || ''}
              register={register}
              type="number"
            >
              <MoneyIcon className="h-6 w-6 fill-slate-200 m-auto" />
            </Input>
            <Input
              name="price"
              placeholder="Price at the time of purchase"
              error={errors.price?.message || ''}
              register={register}
              type="number"
            >
              <MoneyIcon className="h-6 w-6 fill-slate-200 m-auto" />
            </Input>

            <div className="flex w-full h-full justify-end p-2">
              <Button className="w-fit" callback={onSubmit}>
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
};

export default FormContainer;
