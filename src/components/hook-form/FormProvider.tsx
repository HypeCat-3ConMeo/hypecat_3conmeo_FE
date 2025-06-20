/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ReactNode } from "react";
// form
import { FormProvider as Form, type UseFormReturn } from "react-hook-form";

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
};

export default function FormProvider({ children, onSubmit, methods }: Props) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
}
